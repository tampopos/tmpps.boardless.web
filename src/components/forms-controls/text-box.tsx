import { getInjectClasses } from '../../common/styles/styles-helper';
import * as React from 'react';
import { Colors } from '../../common/styles/theme';
import { TextField, createStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/di/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
  },
});
interface TextBoxProps {
  maxLength?: number;
  themeColor?: keyof Colors;
}
export const TextBox = decorate(styles)<TextBoxProps & TextFieldProps>(
  props => {
    const { themeColor, onChange, maxLength } = props;
    const classes = getInjectClasses(props);
    const { root } = classes;
    const pProps = resolve('componentHelper').createPropagationProps(
      props,
      'themeColor',
      'maxLength',
    );
    return (
      <ThemeColorScope themeColor={themeColor}>
        <TextField
          {...pProps}
          className={root}
          onChange={e =>
            onChange
              ? maxLength
                ? e.target.value.length <= maxLength && onChange(e)
                : onChange(e)
              : null
          }
          color={themeColor ? 'primary' : 'default'}
        />
      </ThemeColorScope>
    );
  },
);
TextBox.defaultProps = { type: 'text' };
export const OutlinedTextBox: React.SFC<
  TextBoxProps & TextFieldProps
> = props => <TextBox {...props} variant="outlined" />;
