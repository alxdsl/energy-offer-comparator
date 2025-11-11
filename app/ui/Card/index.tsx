'use client'

import { ExternalLink, Info, LucideIcon } from 'lucide-react'
import styles from './styles.module.css'

export default function Card({
  title,
  subtitle,
  description,
  additionalData,
  price,
  priceTooltip,
  link,
  className,
}: {
  title: string
  subtitle: string
  description: string
  additionalData: { label: string; value: string; Icon: LucideIcon }[]
  price: string
  priceTooltip?: string
  link: { label: string; url: string }
  className?: string
}) {
  return (
    <article className={styles.card + (className ? ` ${className}` : '')}>
      <h4 className={styles['card__subtitle']}>{subtitle}</h4>
      <h3 className={styles['card__title']}>{title}</h3>
      <p className={styles['card__description']}>{description}</p>
      <ul className={styles['card__more']}>
        {additionalData.map((data) => (
          <li key={data.label}>
            <data.Icon /> {data.label}: {data.value}
          </li>
        ))}
      </ul>
      <footer className={styles['card__footer']}>
        <div className={styles['card__price']}>
          <div className={styles['card__priceTooltip']}>
            {priceTooltip}
          </div>
          <output>{price}</output>

          <Info className={styles['card__icon']} />
        </div>
        <a
          href={link.url}
          className={styles['card__link']}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}

          <ExternalLink className={styles['card__icon']} />
        </a>
      </footer>
    </article>
  )
}
