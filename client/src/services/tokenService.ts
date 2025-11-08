let accessToken: string | null = null;

export const tokenService = {
  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  },
  getAccessToken: () => {
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    return accessToken;
  },
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  clear: () => {
    accessToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
