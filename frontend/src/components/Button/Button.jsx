import PropTypes from "prop-types";
import styles from "./Button.module.css";

export function Button({
  onClick,
  href,
  children,
  type = "button",
  disabled = false,
  className,
  variant = "primary",
  icon,
  iconPosition = "right",
}) {
  const buttonClass = [
    styles.button,
    ...variant.split(" ").map((v) => styles[v]),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement = icon ? <span className={styles.icon}>{icon}</span> : null;

  const content =
    iconPosition === "right" ? (
      <>
        {children}
        {iconElement}
      </>
    ) : (
      <>
        {iconElement}
        {children}
      </>
    );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={buttonClass}
        aria-disabled={disabled ? "true" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonClass}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default Button;
