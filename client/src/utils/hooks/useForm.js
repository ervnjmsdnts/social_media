import { useEffect, useState } from "react";

export const useForm = (callback, initialState = {}, error) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
    if (!error) {
      setValues(initialState);
    }
  };

  useEffect(() => {
    if (error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    }
  }, [error]);

  return {
    onChange,
    onSubmit,
    values,
    errors,
  };
};
