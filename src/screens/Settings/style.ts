import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

const style = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    paddingLeft: horizontalScale(12),
  },
  settingsText: {
    marginLeft: horizontalScale(36),
    fontFamily: getFontFamily('Quicksand', '600'),
  },
  section: {
    marginBottom: verticalScale(12),
    marginLeft: horizontalScale(12),
  },
  sectionText: {
    fontFamily: getFontFamily('Quicksand', '100'),
    marginVertical: verticalScale(10),
  },
});

export default style;
