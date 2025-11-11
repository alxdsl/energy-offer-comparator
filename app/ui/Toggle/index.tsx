'use client'

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Checkbox from "@/app/ui/Checkbox";
import styles from "./styles.module.css";

type ToggleOption = {
  label: string;
  Icon?: LucideIcon,
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Toggle({
  name,
  options,
  children,
  className
}: {
  name: string;
  options: ToggleOption[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={styles['toggle'] + (className ? ` ${className}` : '')}>
      <div className={styles['toggle__label']}>{children}</div>

      <ul className={styles['toggle__options']}>
        {options.map((option, index) => (
          <li key={index}>
            <Checkbox
              id={`${name}_${option.value}`}
              name={name}
              value={option.value}
              unique
              checked={option.checked}
              Icon={option.Icon}
              onChange={option.onChange}
              className={styles['toggle__item']}
            >
              {option.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}
