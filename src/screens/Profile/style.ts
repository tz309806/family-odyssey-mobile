import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

const style = StyleSheet.create({
  profileImage: {
    width: horizontalScale(110),
    height: horizontalScale(100),
  },
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(25),
  },
  profileImageContent: {
    borderWidth: 1,
    padding: horizontalScale(10),
    borderColor: 'purple',
    borderRadius: horizontalScale(110),
  },
  userName: {
    marginTop: verticalScale(20),
    textAlign: 'center',
    fontFamily: getFontFamily('Quicksand', '600'),
    fontSize: scaleFontSize(20),
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
});

export default style;
