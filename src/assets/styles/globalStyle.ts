import {StyleSheet} from 'react-native';
import {getFontFamily} from '../fonts/helper';
import {horizontalScale, scaleFontSize, verticalScale} from './scaling';

const globalStyle = StyleSheet.create({
  header: {
    marginLeft: horizontalScale(27),
    marginRight: horizontalScale(17),
    marginTop: verticalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageIcon: {
    padding: horizontalScale(14),
    borderRadius: horizontalScale(100),
    backgroundColor: '#F9FAFB',
  },
  messageNumberContainer: {
    backgroundColor: '#F35BAC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: horizontalScale(10),
    height: horizontalScale(10),
    borderRadius: horizontalScale(10),
    position: 'absolute',
    right: horizontalScale(10),
    top: verticalScale(10),
  },
  messageNumber: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(6),
    fontFamily: getFontFamily('Inter', '600'),
  },
  pageBackground: {
    backgroundColor: 'white',
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
  marginBottom10: {
    marginBottom: verticalScale(10),
  },
  marginTop24: {
    marginTop: verticalScale(24),
  },
  margin10: {
    margin: horizontalScale(10),
  },
  marginLeft10: {
    marginLeft: horizontalScale(10),
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});

export default globalStyle;
