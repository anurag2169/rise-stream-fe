export const getUserDataFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const setUserDataToLocalStorage = (userData: any) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
};
