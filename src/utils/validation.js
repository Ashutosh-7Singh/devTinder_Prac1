const validator = require("validator");

const validateSignUpData = (req) => {
    
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    return { success: false, message: "Name is required", field: "name" };
  }

  if (!validator.isEmail(email)) {
    return { success: false, message: "Invalid Email", field: "email" };
  }

  if (!validator.isStrongPassword(password)) {
    return {
      success: false,
      message: "password is not Strong",
      field: "password",
    };
  }
  return { success: true };
};

module.exports = validateSignUpData;
