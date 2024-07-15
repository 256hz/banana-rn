import React from 'react';
import { TextInputProps, View, Text } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Icon } from '@elements/Icon';
import * as colors from '@util/colors';
import defaultStyle from './DropdownInput.styles';

interface DropdownInputProps extends TextInputProps {
	value: TextInputProps['value'];
	setValue: TextInputProps['onChangeText'];
	dropdownData?: Array<string>;
	placeholder?: string;
}

function DropdownInput(props: DropdownInputProps) {
	const { value, setValue, dropdownData, placeholder } = props;

	const formattedData: Item[] = dropdownData?.map(item => ({ label: item, value: item })) || [];

	const placeholderObj = placeholder ? { label: placeholder, value: null, color: colors.NAVY_BLUE } : {};

	return (
		<RNPickerSelect
			style={{
				...defaultStyle,
				iconContainer: {
					top: 13,
					right: 2,
				},
				placeholder: {
					color: colors.NAVY_BLUE,
					fontSize: 16,
				},
			}}
			placeholder={placeholderObj}
			value={value}
			onValueChange={v => {
				if (v !== null && setValue) {
					setValue(v.toString());
				}
			}}
			items={formattedData}
			// Icon={<Icon color={colors.NAVY_BLUE} name="dropdown" size={18} />}
		/>
	);
}

export default DropdownInput;
