const Error = ({ errors }) =>
  Object.keys(errors).length > 0 && (
    <div className="bg-red-200 border-2 border-red-400 mt-4 p-4 md:w-[400px]">
      <ul className="text-red-600 list-disc flex flex-col justify-center ml-8">
        {Object.values(errors).map((error) => (
          <li className="w-64 md:w-auto" key={error}>
            {error}
          </li>
        ))}
      </ul>
    </div>
  );

export default Error;
