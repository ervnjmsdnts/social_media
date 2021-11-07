const Error = ({ errors }) =>
  Object.keys(errors).length > 0 && (
    <div className="">
      <ul>
        {Object.values(errors).map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );

export default Error;
