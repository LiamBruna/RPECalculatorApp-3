import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [rpe, setRpe] = useState('');
  const [e1rm, setE1rm] = useState('');
  const [repsWant, setRepsWant] = useState('');
  const [rpeWant, setRpeWant] = useState('');
  const [weightWant, setWeightWant] = useState('');

  useEffect(() => {
    const result = calcularE1rm(weight, reps, rpe);
    if (result) {
      setE1rm(result.e1rm.toString());
      
    }
  }, [weight, reps, rpe]);

  useEffect(() => {
    const result = pesoObjetivo(e1rm, repsWant, rpeWant);
    if (result) {
      setWeightWant(result.pesoObjetivo.toString());
    }
  }, [e1rm, repsWant, rpeWant])  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Top Set</Text>
        <Text style={styles.subtitle}>Weight</Text>
        <TextInput style={styles.input} value={weight} onChangeText={setWeight} />
        <Text style={styles.subtitle}>REPS</Text>
        <TextInput style={styles.input} value={reps} onChangeText={setReps} />
        <Text style={styles.subtitle}>RPE</Text>
        <TextInput style={styles.input} value={rpe} onChangeText={setRpe} />
        <Text style={styles.subtitle}>E1RM</Text>
        <TextInput style={styles.e1rm} value={e1rm} onChangeText={setE1rm} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Back Off</Text>
        <Text style={styles.subtitle}>REPS</Text>
        <TextInput style={styles.input} value={repsWant} onChangeText={setRepsWant} />
        <Text style={styles.subtitle}>RPE</Text>
        <TextInput style={styles.input} value={rpeWant} onChangeText={setRpeWant} />
        <Text style={styles.subtitle}>PESO</Text>
        <TextInput style={styles.backoff} value={weightWant} onChangeText={setWeightWant} />
      </View>
    </View>
  );
}

function calcularPorcentajeEsfuerzo(reps, rpe) {
  if (rpe > 10) rpe = 10.0;
  if (reps < 1 || rpe < 4) return 0.0;
  if (reps === 1 && rpe === 10.0) return 100.0;
  const esfuerzo = (10.0 - rpe) + (reps - 1);
  if (esfuerzo >= 16) return 0.0;
  const puntoInterseccion = 2.92;
  if (esfuerzo <= puntoInterseccion) {
    const coeficienteCuadratico = 0.347619;
    const coeficienteLineal = -4.60714;
    const terminoIndependiente = 99.9667;
    return coeficienteCuadratico * esfuerzo ** 2 + coeficienteLineal * esfuerzo + terminoIndependiente;
  } else {
    const pendiente = -2.64249;
    const ordenadaOrigen = 97.0955;
    return pendiente * esfuerzo + ordenadaOrigen;
  }
}

function calcularE1rm(pesoActual, repsActual, rpeActual) {
  const porcentajeEsfuerzoActual = calcularPorcentajeEsfuerzo(repsActual, rpeActual);
  if (porcentajeEsfuerzoActual <= 0) return null;
  const e1rm = Math.round((pesoActual / porcentajeEsfuerzoActual * 100) * 10) / 10;
  if (e1rm <= 0) return null;
  else return { e1rm };
}

function pesoObjetivo(e1rm, repsObjetivo, rpeObjetivo) {
  const porcentajeEsfuerzoObjetivo = calcularPorcentajeEsfuerzo(repsObjetivo, rpeObjetivo);
  if (porcentajeEsfuerzoObjetivo <= 0) return null;
  const pesoObjetivo = Math.round((e1rm / 100 * porcentajeEsfuerzoObjetivo) * 10) / 10;
  return { pesoObjetivo };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  card: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'darkgrey'
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    color: 'white'
  },
  e1rm: {
    fontSize: 18,
    color: 'white'
  },
  backoff: {
    fontSize: 18,
    color: 'white'
  }
});
