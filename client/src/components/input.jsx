const Input = ({ type, className, label, placeholder }) => {
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
        className={`${className || ""} outline-none rounded-2xl p-2`}
      />
    </div>
  );
};

export default Input;
