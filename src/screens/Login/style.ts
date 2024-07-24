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
});

export default style;
