import {StyleSheet} from 'react-native';
import {COLOR} from '../constants/Enum';

const style = StyleSheet.create({
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    top: -10,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 20,
    borderColor: 'white',
  },
});
export default style;
