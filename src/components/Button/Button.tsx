import classNames from "classnames/bind"
  
// styles
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps {
    label: string,
    wrapperClass?: string,
    rest?: ButtonProps
}


const Button = ({label, wrapperClass, ...rest}: ButtonProps) => {
    return (
        <button className={cx("button-root", wrapperClass)} {...rest}>{label}</button>
    )
}

export default Button;
