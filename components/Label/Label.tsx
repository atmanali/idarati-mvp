import styles from "./Label.module.css";


type Props = {
    color?: 'success' | 'error' | 'warning' | 'neutral' | 'info';
} & Omit<React.HTMLAttributes<HTMLLabelElement>, 'className'|'color'>;

export default function({color, ...props}: Props) {
    const classNames = [
        styles[color]
    ]
        .filter((className) => !!className)
        .join(' ');
    return <label {...props} className={classNames} >{props?.children}</label>
}