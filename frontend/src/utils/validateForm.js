export const validateFullName = (fullName) => {
  if (fullName.length < 8)
    return "Full name must have a minimum of 8 characters";
  else if (fullName.length > 30)
    return "Full name must have a maximum of 30 characters";
  return "";
};
export const validatePhone = (phone) => {
  if (phone.charAt(0) === "0")
    if (phone.length !== 10 && phone.length !== 11)
      return "Phone number must have 10 to 11 characters";
  return "";
};

export const validateAddress = (address) => {
  if (address.length < 10)
    return "The address must have a minimum of 10 characters";
  return "";
};

export const validatePassword = (passowrd) => {
  if (passowrd.length < 8)
    return "Password must have a minimum of 8 characters";
  return "";
};
