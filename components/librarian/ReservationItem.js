import React from 'react';
import { View, Text } from 'react-native';

const ReservationItem = ({ reservation }) => {
  return (
    <View>
      <Text>{reservation.bookTitle} reserved by {reservation.memberName}</Text>
      <Text>Reservation Date: {reservation.date}</Text>
    </View>
  );
};

export default ReservationItem;
