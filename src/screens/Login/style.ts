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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  googleButton: {
    width: 192,
    height: 48,
    marginBottom: 20,
  },
  signupText: {
    color: 'blue',
    marginTop: 20,
  },
});

export default style;
