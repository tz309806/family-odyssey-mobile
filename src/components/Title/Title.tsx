import React from 'react';
import {Text} from 'react-native';
import style from './style';

export type Props = {
  title: string;
  type: number;
  numberOfLines?: number | undefined;
  color?: string;
};

const Title = (props: Props) => {
  const styleToApply = () => {
    switch (props.type) {
      case 1:
        return style.title1;
      case 2:
        return style.title2;
      case 3:
        return style.title3;
      default:
        return style.title1;
    }
  };

  return (
    <Text
      style={{...styleToApply(), color: props.color ?? '#38220f'}}
      numberOfLines={props.numberOfLines}>
      {props.title}
    </Text>
  );
};
export default Title;
