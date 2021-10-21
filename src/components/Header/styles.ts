import { Roboto_400Regular_Italic } from '@expo-google-fonts/roboto';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  logoutText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    borderColor: COLORS.YELLOW,
    borderWidth: 1,
    padding: 4,
    borderRadius: 8,
    backgroundColor: COLORS.PINK,
    marginRight: 20,
  },

});