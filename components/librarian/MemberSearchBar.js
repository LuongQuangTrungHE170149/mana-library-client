import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

const MemberSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search Members"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
      />
    </View>
  );
};

export default MemberSearchBar;
