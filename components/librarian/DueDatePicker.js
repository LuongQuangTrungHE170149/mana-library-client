
import React from 'react';
import { View, DatePickerIOS } from 'react-native';

const DueDatePicker = ({ date, setDate }) => {
  return (
    <View>
      <DatePickerIOS date={date} onDateChange={setDate} />
    </View>
  );
};

export default DueDatePicker;