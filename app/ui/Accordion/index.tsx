'use client'

import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function Accordion({ title, children, className }: { title: string; children: ReactNode; className?: string; }) {
  return (
    <details open className={styles.accordion + (className ? ` ${className}` : '')}>
      <summary className={styles['accordion__title']}>{title}</summary>

      <div className={styles['accordion__content']}>
        {children}
      </div>
    </details>
  )
}
