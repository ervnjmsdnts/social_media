const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`${
        className || ""
      } flex items-center justify-center p-1 rounded-xl hover:rounded-3xl transition-all duration-150 ease-linear`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
