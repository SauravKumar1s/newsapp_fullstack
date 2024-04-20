
export const checkIfUserIsAuthenticated = (): boolean => {
    // For the sake of an example, simulate authentication using local storage
    return !!localStorage.getItem('saurav token'); // Returns true if there's an access token
  };