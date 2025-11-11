import { ReactNode } from 'react';

export const format = (str: string | ReactNode) => {
  if (typeof str !== 'string') {
    return str;
  }
  const formattedString = str.replace(/_/g, ' ');
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};
