const Icon = ({ icon, className }) => {
  return (
    <div
      className={`${
        className || ""
      } bg-primary mx-2 p-1 cursor-pointer rounded-md`}>
      {icon}
    </div>
  );
};

export default Icon;
