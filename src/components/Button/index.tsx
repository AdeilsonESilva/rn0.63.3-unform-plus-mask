import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {ButtonTouchableOpacity, LabelText} from './styles';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
}

const Button = ({label, ...rest}: ButtonProps) => {
  return (
    <ButtonTouchableOpacity {...rest}>
      <LabelText>{label}</LabelText>
    </ButtonTouchableOpacity>
  );
};

export default Button;
