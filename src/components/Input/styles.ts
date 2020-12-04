import styled from 'styled-components/native';
import {TextInput as BaseTextInput, TextInputProps} from 'react-native';

interface TextInputCustomProps {
  editable?: boolean;
  error?: string;
  styledFocus: boolean;
  height?: number;
}

export const Container = styled.View``;

export const TextInput = styled(BaseTextInput).attrs<TextInputProps>({
  placeholderTextColor: '#999',
})`
  ${({editable = true, error, styledFocus, height}: TextInputCustomProps) => `
    border: solid 1px #ccc;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    height: ${height || 50}px;
    color: ${error ? 'red' : 'blue'};
    ${error ? 'border-color: red;' : ''}
    background-color: ${editable ? '#fff;' : '#eee'};
    ${styledFocus ? 'border-color: #FEAF7F;' : ''}
  `}
`;
