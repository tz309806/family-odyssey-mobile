import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './style';

interface Props {
  title: string;
  isDisabled: boolean;
  onPress: () => void;
}

const Button = (props: Props) => {
  return (
    <Pressable
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={[style.button, props.isDisabled && style.disabled]}>
      <Text style={style.title}>{props.title}</Text>
    </Pressable>
  );
};
export default Button;
