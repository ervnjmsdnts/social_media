const Input = ({ type, className, label }) => {
  return (
    <div className="flex flex-col m-8">
      <span className="text-primary text-2xl font-semibold ml-2">{label}</span>
      <input
        type={type}
        className={`${className || ""} outline-none mt-2 rounded-2xl`}
      />
    </div>
  );
};

export default Input;
