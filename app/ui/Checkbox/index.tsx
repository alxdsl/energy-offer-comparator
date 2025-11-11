'use client'

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import styles from "./styles.module.css";
import { format } from "@/app/utils/formatting";

export default function Checkbox({
  id,
  name,
  value,
  checked,
  unique = false,
  Icon,
  onChange,
  children,
  className
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  unique?: boolean;
  Icon?: LucideIcon,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={styles['checkbox'] + (className ? ` ${className}` : '')} htmlFor={id}>
      {Icon && <Icon className={styles['checkbox__icon']} />}

      {format(children)}

      <input
        type={unique ? 'radio' : 'checkbox'}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles['checkbox__input']}
      />
    </label>
  );
}
