import { StyleSheet } from 'react-native';
import * as colors from '@util/constants/colors';
import platformShadow from '@util/platformShadow';

const iconSize = 90;

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.BANANA_YELLOW,
  },
  card: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: iconSize,
    width: iconSize,
    borderRadius: iconSize / 2,
    backgroundColor: colors.NAVY_BLUE,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: iconSize * 0.64,
    width: iconSize * 0.8,
  },
  infoContainer: { flexDirection: 'column' },
  infoText: {
    fontFamily: 'open-sans-regular',
    color: colors.NAVY_BLUE,
  },
  timeLimitButton: {
    backgroundColor: colors.NAVY_BLUE,
    color: colors.BANANA_YELLOW,
    width: '47.5%',
    borderWidth: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...platformShadow(5),
  },
  buttonText: {
    fontFamily: 'open-sans-regular',
    fontSize: 13,
    color: colors.BANANA_YELLOW,
  },
  createContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
