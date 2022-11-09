export const addForcast = (forcast: string): void => {
  localStorage.setItem("my_forcasts", forcast);
};

export const getForcasts = (): string => {
  return localStorage.getItem("my_forcasts") || "";
};
