const Input = ({ type, className, label, placeholder, textBig, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <span className="text-primary text-2xl font-semibold ml-2 mb-2">
          {label}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${className || ""} ${
          textBig && "text-lg"
        } outline-none rounded-2xl p-2 text-base focus:outline-primary transition-all duration-150`}
        {...props}
      />
    </div>
  );
};

export default Input;
