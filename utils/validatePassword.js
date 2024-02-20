const validatePasswordFunc = (password, confirmPassword) => {
  let isValid = true;
  if (password !== "" && confirmPassword !== "") {
    if (password !== confirmPassword) {
      alert("password does not match");
      isValid = false;
      // setError("Passwords does not match");
    }
  }
  return isValid;
};

export { validatePasswordFunc };