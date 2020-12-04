import {StyleProp, TextStyle} from 'react-native';

interface ReturnedStyle {
  containerStyle: {[key: string]: string};
  inputStyle: {[key: string]: string};
}

function appendStyle(refStyle: ReturnedStyle, prop: string, value: any) {
  const propPrefix = prop.replace(/^(margin)(.*)$/, '$1');
  switch (propPrefix) {
    case 'width':
    case 'minWidth':
    case 'flex':
      refStyle.containerStyle[prop] = value;
      refStyle.inputStyle[prop] = value;
      break;
    case 'margin':
      refStyle.containerStyle[prop] = value;
      break;
    case 'height':
      refStyle.inputStyle[prop] = value;
      break;
    default:
      refStyle.inputStyle[prop] = value;
      break;
  }
}

export function extractTextInputStyles(style: StyleProp<TextStyle>) {
  const returnedStyle = {
    containerStyle: {},
    inputStyle: {},
  };

  if (style) {
    if (Array.isArray(style)) {
      style.forEach((styles) => {
        if (!styles) {
          return;
        }

        Object.entries(styles).forEach(([prop, value]) => {
          appendStyle(returnedStyle, prop, value);
        });
      });
    } else {
      Object.entries(style).forEach(([prop, value]) => {
        appendStyle(returnedStyle, prop, value);
      });
    }
  }

  return returnedStyle;
}
