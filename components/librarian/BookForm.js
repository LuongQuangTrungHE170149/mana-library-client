import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, author, isbn });
    setTitle('');
    setAuthor('');
    setIsbn('');
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Author" value={author} onChangeText={setAuthor} />
      <TextInput placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default BookForm;
