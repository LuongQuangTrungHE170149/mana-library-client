import React from 'react';
import { View, Button } from 'react-native';

const CirculationControls = ({ onBorrow, onReturn }) => {
  return (
    <View>
      <Button title="Borrow" onPress={onBorrow} />
      <Button title="Return" onPress={onReturn} />
    </View>
  );
};

export default CirculationControls;
