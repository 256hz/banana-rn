# Project Structure Introduction & Contribution Guide

## Structure Overview

```shell
├── App.styles.ts	(* contains global styles *)
├── App.tsx 	(* entry point of project *)
├── README.md
├── app.json  (* contains settings for project (e.g. 'donor'/'client' variants) *)
├── assets  (* contains images and fonts used in application *)
│   ├── documents
│   ├── fonts
│   ├── icon.png
│   ├── icons
│   ├── images
│   └── splash.png
├── babel.config.js	(*babel config file, you may find mapping setting of different modules there (e.g. ./src/elements maps to @elements)*)
├── declarations.d.ts
├── metro.config.js
├── package-lock.json
├── package.json
├── src
│   ├── elements	(* @element as alias, contains basic components like button, icon, and navbar *)
│   ├── library	(* @library as alias, contains reusable compositions of elements *)
│   ├── routes	(* contains router logic, check (https://reactnavigation.org/docs/4.x/getting-started) for documentations of react-navigation *)
│   ├── screens	(* contains all the application's screens*)
│   ├── state	(* global store/state files related to communication, data processing etc. *)
│   └── util	(* utililty functions (e.g. requesting user permissions) and constants (e.g. color scheme) not specific to any component *)
└── tsconfig.json
```

## Common Development Guidance

### How to switch to client side

In `app.json` under root directory, you could see setting below:

```json
"extra": {
			"variant": "donor"
		}
```

Change it to

```json
"extra": {
			"variant": "client"
		}
```

to visit client side.

### How to build a component

#### Basic structure of a component

We would use an example of `Title` as example:

A component should have 3 files. In example of `Title`, a directory called `Title` should be placed under `src->elements` and has structure as below:

```shell
Title
├── Title.styles.ts
├── Title.tsx
└── index.ts
```

- Index.ts (export the component)

  ```tsx
  import Title from './Title';

  export { Title };
  ```

- Title.styles.ts (contains style rules for the component)

  ```tsx
  import { StyleSheet } from 'react-native';
  import * as colors from '@util/colors';

  export default StyleSheet.create({
  	text: {
  		fontFamily: 'open-sans-bold',
  		fontSize: 38,
  		lineHeight: 50,
  		color: colors.NAVY_BLUE,
  	},
  });
  ```

- Title.tsx (contains functional React component)

  ```tsx
  import React from 'react';
  import { View, Text } from 'react-native';
  import styles from './Title.styles';

  export default ({ text }: { text: string }) => (
  	<View>
  		<Text style={styles.text}>{text.toUpperCase()}</Text>
  	</View>
  );
  ```

  Note that for more complicated component that needs to receive multiple properties, we need to define an interface of the parameter and use it when initializing the functional component. Below is an example of `ClaimingProgressBar` which presents the claim statuses of a donation.

  ```tsx
  import React from 'react';
  import { StyleProp, Text, TextStyle, View } from 'react-native';
  import styles from './ClaimingProgressBar.styles';

  // DEFINE INTERFACE HERE

  interface ClaimingProgressBarProps {
  	/** Width for ClaimingProgressBar. */
  	width?: number | string;

  	/** Number of donations has been picked up. */
  	pickedUp: number;

  	/** Number of donations has been reserved. */
  	reserved: number;

  	/** Number of donations remaining. */
  	left: number;

  	/** Style of ClaimingProgressBar. */
  	style?: StyleProp<TextStyle>;
  }

  /**
   * Data visualization that shows the total number of picked-up, reserved, and available
   * servings within a single donation.
   */
  export default ({ width = '100%', pickedUp, reserved, left, style }: ClaimingProgressBarProps) => {
  	const num2Str = (num, places) => String(num).padStart(places, '0');
  	const total = pickedUp + reserved + left;
  	return <View style={[styles.claimProgressBar, { width }, style]}>/*implementation logic*/</View>;
  };
  ```

**_It's recommended to build a skeleton of a component and add that component to `index.ts` under `elements`, so you can more easily use it within screens to test and debug it._**

#### Add component to element module and use it

After you set up the skeleton of you component, export your component in `index.ts` under `elements`.

```tsx
export { FormTextInput } from './FormTextInput';
export { Header } from './Header';
export { Icon } from './Icon';
export { InputLabel } from './FormTextInput/InputLabel';
export { Button } from './Button';
export { TextButton } from './Button/TextButton';
export { LinkButton } from './LinkButton';
export { SpacerInline } from './SpacerInline';
export { Paragraph } from './Paragraph';
export { Modal } from './Modal';
export { TheAlertModal } from './TheAlertModal';
// add export clause
export { Title } from './Title';
```

After that, you could use your component in screen, as the code below:

```tsx
import React, { useState } from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { View, Alert, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useGlobal from '@state';
import { Title } from '@elements';

export default () => {
	const { navigate } = useNavigation();
	const [state, actions] =  useGlobal() as UseGlobalType;
	const { userIdentity } = state;
	return (
		<View style={styles.outerContainer}>
			<SpacerInline height={140} />
			<Title text={`I am a ${userIdentity}.`} />
		</View>
	);
};
```

### How to Create a PR and Use PR Templates

Before submitting a PR, make sure that your changes come from a branch other than your master.

One option is to first create a [Draft Pull Request](9https://github.blog/2019-02-14-introducing-draft-pull-requests/). If you'd like to share your work process and gather more feedback during your progress, this is a great option. Otherwise, feel free to submit a Pull Request when you know your changes are ready for review.

[Pull request templates](https://github.com/FoodIsLifeBGP/banana-rn/tree/master/.github/PULL_REQUEST_TEMPLATE) are available within the `.github` directory. You can create your PR using the available templates and can remove any sections if they do not apply to your PR topic.
