import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, Image } from 'react-native';

const App = () => {
  const [prod, setProd] = useState(null);
  const [load, setLoad] = useState(true);
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const obtenerPokemonAleatorio = async () => {
      const randomId = Math.floor(Math.random() * 898) + 1; // 898 es el número total de Pokémon en la API
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const obj = await res.json();
        setProd(obj);

        const resDescripcion = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
        const objDescripcion = await resDescripcion.json();
        const descripcionEncontrada = objDescripcion.flavor_text_entries.find(entry => entry.language.name === 'es');
        setDescripcion(descripcionEncontrada.flavor_text);
        
        setLoad(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Ocurrió un error');
        setLoad(false);
      }
    };

    obtenerPokemonAleatorio();
  }, []);

  const screenL = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nombre: {prod.name}</Text>
        <Text style={styles.price}>Altura: {prod.height}</Text>
        <Text style={styles.price}>Peso: {prod.weight}</Text>
        <Text style={styles.price}>Tipo: {prod.types.map(type => type.type.name).join(', ')}</Text>
        <Text style={styles.description}>Descripcion: {descripcion}</Text>
        <Image source={{ uri: prod.sprites.front_default }} style={styles.image} />
      </View>
    );
  };

  const screenU = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Cargando Datos...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {load ? screenU() : screenL()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5B8FD',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Helvetica',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Helvetica',
  },
});

export default App;
