export const registerValidator = (
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;

  if (firstName.trim() === "") {
    errors.firstName = "First Name must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last Name must not be empty";
  }

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    if (!email.match(emailRegEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not empty";
  } else if (!password.match(passwordRegEx)) {
    errors.password =
      "Password needs to have one letter, one number and minimum of eight characters";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const loginValidator = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const postValidator = ({ body }) => {
  const errors = {};

  if (body.trim() === "") {
    errors.body = "Body of post must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
