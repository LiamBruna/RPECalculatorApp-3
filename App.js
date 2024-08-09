import React, { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import RPECalculator from './components/RPECalculator'; // Tu aplicación actual
import Timer from './components/Timer'; // El componente del cronómetro

export default function App() {
  const [showComponent, setShowComponent] = useState('');

  return (
    <View style={styles.container}>
      {showComponent === 'RPECalculator' && <RPECalculator setShowComponent={setShowComponent} />}
      {showComponent === 'Timer' && <Timer setShowComponent={setShowComponent}/>}
      {showComponent === '' && (
        <View style={styles.card}>
          <Button title="RPECalculator" onPress={() => setShowComponent('RPECalculator')} color="#2c2a2a" />
        </View>
      )}
      {showComponent === '' && (
        <View style={styles.card}>
          <Button title="Temporizador" onPress={() => setShowComponent('Timer')} color="#2c2a2a" />
        </View>
      )}
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
  card: {
    width: '80%',
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2c2a2a'
  },
});
