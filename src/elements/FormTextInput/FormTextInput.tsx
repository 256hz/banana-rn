/* eslint-disable react/jsx-props-no-spreading */

import React, {
  Ref, RefObject, forwardRef, useState,
} from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  Platform,
} from 'react-native';
import { LIGHT_BLUE } from '@util/constants/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AsYouType } from 'libphonenumber-js';
import { Icon, InputLabel } from '../index';
import styles from './FormTextInput.styles';
import { DropdownInput } from './DropdownInput';

interface BasicTextInputProps extends TextInputProps {
  /** User-submitted value. */
  value: TextInputProps['value'];

  /** Callback used with every keystroke within the input. */
  setValue: TextInputProps['onChangeText'];

  /** Styling to override default input styling. */
  inputStyle?: StyleProp<TextStyle>;

  /** Reference to the text input for programmatic manipulation. */
  forwardedRef?: Ref<TextInput>;
}

interface FormTextInputProps extends BasicTextInputProps {
  /** Type text input. */
  type?: 'default' | 'password' | 'phoneNumber' | 'dropdown';

  /** Label for the input. */
  label: string;

  /** Whether or not there is an error associated with the given input value. */
  error?: boolean;

  /** User-facing message associated with an error. */
  errorMessage?: Array<string>;

  /** Dropdown data for dropdownList */
  dropdownData?: Array<string>;
}

/**
 * Most basic text input that is used across application.
 */
function BasicTextInput({
  style,
  value,
  setValue,
  inputStyle,
  forwardedRef,
  editable = true,
  ...props
}: BasicTextInputProps) {
  return (
    <TextInput
      ref={forwardedRef}
      value={value}
      onChangeText={setValue}
      style={[
        styles.input,
        style,
        inputStyle, // Prop passed to this component to ensure it can override default styling.
        !editable && styles.disabled,
      ]}
      editable={editable}
      placeholderTextColor={LIGHT_BLUE}
      {...props}
    />
  );
}

/**
 * Input for a password with input visibility that can be toggled.
 * Properties are 'transparent' and all are passed to the BasicTextInput.
 */
function PasswordInput(props: BasicTextInputProps) {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);

  return (
    <View>
      <BasicTextInput
        {...props}
        secureTextEntry={!isPasswordVisible}
        autoCorrect={false}
        textContentType="password"
      />

      <View style={styles.passwordVisibilityIcon}>
        <TouchableWithoutFeedback
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <View style={styles.passwordIconContainer}>
            <Icon
              name={isPasswordVisible ? 'eyeOn' : 'eyeOff'}
              size={24}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

function PhoneNumberInput(props: BasicTextInputProps) {
  return (
    <View>
      <BasicTextInput
        {...props}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={14}
      />
    </View>
  );
}

/* NOTE: styling/looks **not** important-- this replaces/fixes broken web-variant dropdowns */
function WebDropdownInput({
  dropdownData,
  value,
  setValue,
}: Pick<FormTextInputProps, 'dropdownData' | 'value' | 'setValue' | 'style'>) {
  return (
    <select
      value={value}
      onChange={e => (setValue ? setValue(e.target.value) : null)}
      style={{ height: '40px', fontSize: '16px', backgroundColor: 'white' }}
    >
      {dropdownData?.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

/**
 * Input component for a form that includes a standardized label and text input.
 * Can render a field with an optional visible password if 'type' password is given.
 */
function FormTextInput(
  {
    type = 'default',
    label,
    value,
    setValue,
    error = false,
    errorMessage,
    style,
    inputStyle,
    dropdownData,
    ...props
  }: FormTextInputProps,
  ref: Ref<TextInput>,
) {
  const parseDigits = string => (string.match(/\d+/g) || []).join('');
  const numberFormat = (str: string | undefined) => {
    const digits = parseDigits(str);
    return new AsYouType('US').input(digits);
  };

  let tempInput;
  let passedValue;
  if (type === 'password') {
    tempInput = PasswordInput;
    passedValue = value;
  } else if (type === 'dropdown') {
    tempInput = Platform.OS === 'web' ? WebDropdownInput : DropdownInput;
    passedValue = value;
  } else if (type === 'phoneNumber') {
    /* TODO: clean this mess up (and honestly this whole file could use a refactor) */
    tempInput = PhoneNumberInput;
    /* To solve state infinite loop */
    const tempValue = numberFormat(value);
    if (value && tempValue === `${value.trim()})`) {
      passedValue = tempValue.substr(0, 4);
    } else {
      passedValue = tempValue;
    }
  } else {
    tempInput = BasicTextInput;
    passedValue = value;
  }
  const Input = tempInput;

  return (
    <View style={style}>
      <InputLabel text={label} />

      <View>
        <Input
          style={error && styles.inputError}
          forwardedRef={ref}
          value={passedValue}
          setValue={setValue}
          inputStyle={inputStyle}
          dropdownData={dropdownData || []}
          {...props}
        />

        {error && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorMessageText}>
              {errorMessage && errorMessage.length
                ? errorMessage[0]
                : ''}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Allows the Higher-Order-Component (FormTextInput) to pass references to the native TextInput.
 */
export default forwardRef<
TextInput,
FormTextInputProps & { ref?: RefObject<TextInput> }
>(FormTextInput);
