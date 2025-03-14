export const setAuthToken = (authToken: string) => {
  return localStorage.setItem('authToken', authToken);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken') ? localStorage.getItem('auToken') : undefined;
};

export const clearStorage = () => {
  localStorage.clear();
};
