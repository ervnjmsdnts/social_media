const Icon = ({ icon, className, label }) => {
  return (
    <div className="flex items-center hover:bg-white p-1 mr-2 cursor-pointer rounded-md">
      <div className={`${className || ""} mx-2 p-1 rounded-md`}>{icon}</div>
      <span className="text-primary">{label}</span>
    </div>
  );
};

export default Icon;
