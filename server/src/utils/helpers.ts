export const fetchDotEnv = (env: string | undefined): string => {
  if (!env) {
    throw new Error("Environment variable not found!");
  }
  return env;
};
