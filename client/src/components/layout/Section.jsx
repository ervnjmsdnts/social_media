const Section = ({ children, className }) => {
  return (
    <div
      className={`${
        className || ""
      } h-auto p-8 bg-secondary w-full m-2 rounded-xl`}>
      {children}
    </div>
  );
};

export default Section;
