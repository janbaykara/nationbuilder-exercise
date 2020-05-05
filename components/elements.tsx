import * as React from "react";
import { merge } from 'lodash';

export const Button: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ style = {}, color, ...props }) => (
  <button style={merge({
    margin: '10px 0',
    fontSize: 'inherit',
    padding: 10,
    border: 'none',
    background: props.disabled ? 'grey' : color || 'blue',
    color: 'white',
    fontWeight: 'bold',
    cursor: props.disabled ? 'none' : 'pointer',
    borderRadius: 4
  }, style)} {...props} />
)