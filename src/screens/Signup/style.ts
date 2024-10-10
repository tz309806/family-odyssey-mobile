import {StyleSheet} from 'react-native';
import {scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
  },
  error: {
    fontFamily: 'Quicksand',
    fontSize: scaleFontSize(16),
    color: 'red',
  },
});
export default style;
