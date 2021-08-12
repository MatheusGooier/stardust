const TOKEN_KEY = "jwt";

export const login = () => {
  console.log("localStorage.getItem: true");
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
  console.log("localStorage.getItem: false");
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    console.log("localStorage.getItem: true");
    return true;
  }
  console.log("localStorage.getItem: false");
  return false;
};
