const Section = ({ children, className }) => {
  return (
    <section
      className={`${
        className || ""
      } h-auto p-8 bg-secondary w-full m-2 md:rounded-xl`}>
      {children}
    </section>
  );
};

export default Section;
