import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Vibration } from 'react-native';
import { Audio } from 'expo-av';

export default function Timer({ setShowComponent }) {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [hasReset, setHasReset] = useState(false);


  async function playSoundAndVibrate() {
    let sound = soundObject;
    if (soundObject === null) {
      sound = new Audio.Sound();
      setSoundObject(sound);
    }
    try {
      await sound.loadAsync(require('../assets/alarm.mp3'));
      await sound.playAsync();
    } catch (error) {
      // An error occurred!
    }
    Vibration.vibrate(500);
  }
  
  async function stopSoundAndVibrate() {
    if (soundObject !== null) {
      await soundObject.stopAsync();
    }
    Vibration.cancel();
  }  

  function toggle() {
    if (!isActive) {
      if (countdown === 0) {
        setCountdown(parseInt(minutes) * 60 + parseInt(seconds));
      }
      setHasReset(false);
    }
    setIsActive(!isActive);
    setHasStarted(true);
  }  

  function reset() {
    setMinutes('00');
    setSeconds('00');
    setCountdown(0);
    setIsActive(false);
    setHasReset(true);
  }  

  useEffect(() => {
    let interval = null;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    } else if (!isActive && countdown !== 0) {
      clearInterval(interval);
    } else if (countdown === 0 && hasStarted && !hasReset) {
      playSoundAndVibrate();
    }
    return () => clearInterval(interval);
  }, [isActive, countdown, hasStarted, hasReset]);
  
  
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
      <View style={[styles.card, styles.textcard]}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggle} color="#2c2a2a"/>
      </View>
      <View style={styles.card}>
        <Button title="Reset" onPress={() => {reset(); stopSoundAndVibrate();}} color="#2c2a2a"/>
      </View>
      <View style={styles.cardvolver} >
      <Button title="Volver al inicio" onPress={() => {stopSoundAndVibrate(); setShowComponent('');}} color="#2c2a2a"/>
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
    fontWeight: 'bold',
    width: '80%'
  },
  text: {
    fontSize: 50,
    padding: 5,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  card: {
    height: '8%',
    width: '60%',
    borderWidth: 3,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#2c2a2a',
    fontWeight: 'bold'
  },
  cardvolver: {
    height: '8.5%',
    width: '60%',
    borderWidth: 3,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#2c2a2a',
    fontWeight: 'bold'
  },
});
