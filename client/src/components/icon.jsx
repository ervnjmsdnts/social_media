const Icon = ({ icon, className, label, ...props }) => {
  return (
    <button
      className="hover:bg-white mr-2 rounded-md transition-all duration-150"
      {...props}>
      <div className="mx-2 flex items-center">
        <div className={`${className || ""}mr-2 p-1 rounded-md`}>{icon}</div>
        <span className="text-primary ">{label}</span>
      </div>
    </button>
  );
};

export default Icon;
