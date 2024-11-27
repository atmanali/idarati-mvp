import styles from "./Label.module.css";


type Props = {
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
    size?: 'small'|'medium'|'large';
} & Omit<React.HTMLAttributes<HTMLLabelElement>, 'className'|'color'>;

export default function({color, size='medium', ...props}: Props) {
    const classNames = [
        styles[color],
        size + "Text"
    ]
        .filter((className) => !!className)
        .join(' ');
    return <label {...props} className={classNames} >{props?.children}</label>
}