const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`${
        className || ""
      } flex items-center justify-center p-1 rounded-3xl`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
