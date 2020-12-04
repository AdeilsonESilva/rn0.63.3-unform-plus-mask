import React, {useRef, useEffect, useCallback, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import {MaskService, TextInputMaskOptionProp} from 'react-native-masked-text';
import {FormHandles, useField} from '@unform/core';

import {extractTextInputStyles} from './util';
import {Container, TextInput} from './styles';

interface InputProps extends TextInputProps {
  formRef: React.RefObject<FormHandles>;
  name: string;
  label?: string;
  type?: string;
  options?: TextInputMaskOptionProp;
  labelColor?: string;
}

const Input = (props: InputProps) => {
  const {
    name, // required
    label,
    type, // required for masks
    options, // mask optional config
    style,
    onBlur,
    onFocus,
    formRef,
    // labelColor,
    ...otherProps
  } = props;

  const getMaskedValue = useCallback(
    (value) => (type ? MaskService.toMask(type, value, options) : value),
    [options, type],
  );

  const inputRef = useRef<any>(null);

  const getRawValue = useCallback(
    (value: string) =>
      type ? MaskService.toRawValue(type, value, options) : value,
    [options, type],
  );

  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const [fieldValue, setFieldValue] = useState(getMaskedValue(defaultValue));
  const [styledFocus, setStyledFocus] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  const handleChange = useCallback(
    (value: string) => {
      const newValue = getMaskedValue(value);
      const rawValue = getRawValue(value);

      if (inputRef.current) {
        // inputRef.current.value = newValue;
        inputRef.current.value = rawValue;
      }
      setFieldValue(newValue);

      if (error && formRef.current) {
        formRef.current.setFieldError(fieldName, '');
      }
    },
    [error, fieldName, formRef, getMaskedValue, getRawValue],
  );

  useEffect(() => {
    if (name) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        setValue(_, value: string) {
          handleChange(value);
        },
        clearValue(_) {
          handleChange('');
        },
      });
    }
  }, [fieldName, handleChange, name, registerField]);

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setStyledFocus(true);
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  }

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setStyledFocus(false);
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  }

  const {inputStyle, containerStyle} = extractTextInputStyles(style);

  return (
    <Container style={containerStyle}>
      {label && (
        <Text /* labelColor={labelColor}  error={error}*/>{label}</Text>
      )}
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        error={error}
        style={inputStyle}
        styledFocus={styledFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={fieldValue}
        onChangeText={handleChange}
        {...otherProps}
      />
    </Container>
  );
};

export default Input;
