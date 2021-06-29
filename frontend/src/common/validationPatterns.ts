export const emailValidationPattern = {
  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: "Entered value does not match email format",
};

export const otpCodeValiation = {
  value: /^[0-9]{7}$/,
  message: "OTP code has invalid format",
};
