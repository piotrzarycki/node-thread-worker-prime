const reset = "\x1b[0m";
export const log = {
  green: (text) => console.log("\x1b[32m" + text + reset),
};
