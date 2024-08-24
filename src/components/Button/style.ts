import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import {COLOR} from '../../constants/Enum';

const style = StyleSheet.create({
  button: {
    backgroundColor: COLOR.PRIMARY,
    height: verticalScale(40),
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: getFontFamily('Quicksand', '100'),
    fontSize: scaleFontSize(20),
    lineHeight: scaleFontSize(20),
    color: COLOR.SECONDARY,
    textAlign: 'center',
  },
});

export default style;
