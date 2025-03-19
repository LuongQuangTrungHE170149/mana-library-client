import React from 'react';
import { View, Text, FlatList } from 'react-native';

const BookInventoryTable = ({ books, onEdit, onDelete }) => {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title} by {item.author}</Text>
          <Button title="Edit" onPress={() => onEdit(item.id)} />
          <Button title="Delete" onPress={() => onDelete(item.id)} />
        </View>
      )}
    />
  );
};

export default BookInventoryTable;
