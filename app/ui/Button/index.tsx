import styles from './styles.module.css';

export default function Button(
  {
    type = 'button',
    children,
    ariaLabel,
    className,
    onClick
  }:
  {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    ariaLabel?: string;
    className?: string;
    onClick: () => void;
  }
) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={styles.button + (className ? ` ${className}` : '')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
