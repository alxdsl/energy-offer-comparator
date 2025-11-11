import { ReactNode } from 'react';

export const format = (string_: string | ReactNode) => {
  if (typeof string_ !== 'string') {
    return string_;
  }
  const formattedString = string_.replaceAll('_', ' ');
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};
