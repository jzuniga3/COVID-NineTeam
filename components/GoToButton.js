import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Text style={props.style}>{props}</Text>
    </TouchableOpacity>
  );
}