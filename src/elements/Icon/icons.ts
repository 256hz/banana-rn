import {
  DeprecatedIconName,
  IconImport,
  IconName,
} from './Icon.types';

const ArrowDown: IconImport = require('@assets/icons/ICON_ARROW-DOWN.svg');
const ArrowUp: IconImport = require('@assets/icons/ICON_ARROW-UP.svg');
const Back: IconImport = require('@assets/icons/ICON_BACK.svg');
const Bell: IconImport = require('@assets/icons/ICON_BELL.svg');
const BellOn: IconImport = require('@assets/icons/ICON_BELL-ON.svg');
const Bike: IconImport = require('@assets/icons/ICON_BIKE.svg');
const BananaMarker: IconImport = require('@assets/icons/ICON_BANANA_MARKER.svg');
const Camera: IconImport = require('@assets/icons/ICON_CAMERA.svg');
const CheckboxOff: IconImport = require('@assets/icons/ICON_CHECKBOX-OFF.svg');
const CheckboxOn: IconImport = require('@assets/icons/ICON_CHECKBOX-ON.svg');
const Claims: IconImport = require('@assets/icons/ICON_CLAIMS.svg');
const Close: IconImport = require('@assets/icons/ICON_CLOSE.svg');
const Condense: IconImport = require('@assets/icons/ICON_CONDENSE.svg');
const Distance: IconImport = require('@assets/icons/ICON_DISTANCE.svg');
const Donations: IconImport = require('@assets/icons/ICON_DONATIONS.svg');
const Dropdown: IconImport = require('@assets/icons/ICON_DROPDOWN.svg');
const Email: IconImport = require('@assets/icons/ICON_EMAIL.svg');
const Expand: IconImport = require('@assets/icons/ICON_EXPAND.svg');
const EyeOff: IconImport = require('@assets/icons/ICON_EYE-OFF.svg');
const EyeOn: IconImport = require('@assets/icons/ICON_EYE-ON.svg');
const Facebook: IconImport = require('@assets/icons/ICON_FACEBOOK.svg');
const Help: IconImport = require('@assets/icons/ICON_HELP.svg');
const Location: IconImport = require('@assets/icons/ICON_LOCATION.svg');
const Logout: IconImport = require('@assets/icons/ICON_LOGOUT.svg');
const Menu: IconImport = require('@assets/icons/ICON_MENU.svg');
const MenuOn: IconImport = require('@assets/icons/ICON_MENU-ON.svg');
const More: IconImport = require('@assets/icons/ICON_MORE.svg');
const QrCode: IconImport = require('@assets/icons/ICON_QR-CODE.svg');
const Settings: IconImport = require('@assets/icons/ICON_SETTINGS.svg');
const Smile: IconImport = require('@assets/icons/ICON_SMILE.svg');
const Time: IconImport = require('@assets/icons/ICON_TIME.svg');
const Transit: IconImport = require('@assets/icons/ICON_TRANSIT.svg');
const User: IconImport = require('@assets/icons/ICON_USER.svg');
const Vector: IconImport = require('@assets/icons/ICON_VECTOR.svg');
const Walk: IconImport = require('@assets/icons/ICON_WALK.svg');
const Website: IconImport = require('@assets/icons/ICON_WEBSITE.svg');
const Plus: IconImport = require('@assets/icons/ICON_PLUS.svg');

export const deprecatedIconMap: Record<DeprecatedIconName, IconName> = {
  'chevron-down': 'expand',
  'chevron-left': 'back',
  image: 'camera',
  lock: 'eyeOff',
  unlock: 'eyeOn',
};

export const iconImports: Record<IconName, IconImport> = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  back: Back,
  bell: Bell,
  bellOn: BellOn,
  bananaMarker: BananaMarker,
  bike: Bike,
  camera: Camera,
  checkboxOff: CheckboxOff,
  checkboxOn: CheckboxOn,
  claims: Claims,
  close: Close,
  condense: Condense,
  distance: Distance,
  donations: Donations,
  dropdown: Dropdown,
  email: Email,
  expand: Expand,
  eyeOff: EyeOff,
  eyeOn: EyeOn,
  facebook: Facebook,
  help: Help,
  location: Location,
  logout: Logout,
  menu: Menu,
  menuOn: MenuOn,
  more: More,
  qrCode: QrCode,
  settings: Settings,
  smile: Smile,
  time: Time,
  transit: Transit,
  user: User,
  vector: Vector,
  walk: Walk,
  website: Website,
  plus: Plus,
};
