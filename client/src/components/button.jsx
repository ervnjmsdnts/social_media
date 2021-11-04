const Button = ({ children, className, onClick }) => {
  return (
    <button className={`${className || ""} button`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
