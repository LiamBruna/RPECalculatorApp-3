import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

export default function Timer({ setShowComponent }) {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  function toggle() {
    if (!isActive) {
      if (countdown === 0) {
        setCountdown(parseInt(minutes) * 60 + parseInt(seconds));
      }
    }
    setIsActive(!isActive);
  }

  function reset() {
    setMinutes('00');
    setSeconds('00');
    setCountdown(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else if (!isActive && countdown !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, countdown]);

  function handleFocus(setValue) {
    return () => {
      setValue(value => value.replace(/^0+/, ''));
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Math.floor(countdown / 60)}m {countdown % 60}s</Text>
      <TextInput
        style={styles.input}
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="numeric"
        placeholder="Minutos"
        onFocus={handleFocus(setMinutes)}
      />
      <TextInput
        style={styles.input}
        value={seconds}
        onChangeText={setSeconds}
        keyboardType="numeric"
        placeholder="Segundos"
        onFocus={handleFocus(setSeconds)}
      />
      <View style={styles.card}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggle} color="#2c2a2a"/>
      </View>
      <View style={styles.card}>
        <Button title="Reset" onPress={reset} color="#2c2a2a"/>
      </View>
      <View style={styles.card}>
        <Button title="Volver al inicio" onPress={() => setShowComponent('')} color="#2c2a2a"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#361111'
  },
  input: {
    fontSize: 25,
    borderWidth: 3,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 50,
    padding: 5,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  card: {
    height: '11%',
    width: '60%',
    borderWidth: 3,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#2c2a2a',
    fontWeight: 'bold'
  },
});
