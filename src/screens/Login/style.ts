import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    justifyContent: 'center',
  },
  registrationButton: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  error: {
    fontFamily: 'Quicksand',
    fontSize: scaleFontSize(16),
    color: 'red',
  },
  input: {
    width: '100%',
    height: verticalScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: verticalScale(12),
  },
  googleButton: {
    width: 192,
    height: 48,
    marginBottom: 20,
  },
  signUpButton: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
});

export default style;
