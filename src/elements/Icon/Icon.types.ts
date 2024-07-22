import { ImageURISource } from 'react-native';
import { SvgProps } from 'react-native-svg';

/**
 * SVG imports depend on the OS.
 *
 * If the OS is web, the imports will be image URI
 * sources (e.g. data blob, asset path, etc).
 *
 * If the OS is Android or iOS, the imports will be native-compliant,
 * dynamic react components.
 */
export type IconImport = ImageURISource & {
	default: React.FC<SvgProps>;
};

export type DeprecatedIconName = 'chevron-down' | 'chevron-left' | 'image' | 'lock' | 'unlock';

export type IconName =
	| 'arrowDown'
	| 'arrowUp'
	| 'back'
	| 'bananaMarker'
	| 'bell'
	| 'bellOn'
	| 'bike'
	| 'camera'
	| 'checkboxOff'
	| 'checkboxOn'
	| 'claims'
	| 'close'
	| 'condense'
	| 'distance'
	| 'donations'
	| 'dropdown'
	| 'email'
	| 'expand'
	| 'eyeOff'
	| 'eyeOn'
	| 'facebook'
	| 'help'
	| 'location'
	| 'logout'
	| 'menu'
	| 'menuOn'
	| 'more'
	| 'qrCode'
	| 'settings'
	| 'smile'
	| 'time'
	| 'transit'
	| 'user'
	| 'vector'
	| 'walk'
	| 'website';
