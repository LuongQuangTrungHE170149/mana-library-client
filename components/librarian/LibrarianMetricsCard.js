import React from 'react';
import { View, Text } from 'react-native';

const LibrarianMetricsCard = ({ metrics }) => {
  return (
    <View>
      <Text>Total Books Borrowed: {metrics.totalBorrowed}</Text>
      <Text>Total Books Returned: {metrics.totalReturned}</Text>
      <Text>Overdue Books: {metrics.overdue}</Text>
    </View>
  );
};

export default LibrarianMetricsCard;
