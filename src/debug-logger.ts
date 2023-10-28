import makeDebug from "debug";

export const debugLogger = {
  summary: makeDebug("resolve-everything:summary"),
  fileContent: makeDebug("resolve-everything:noisy:file-content"),
  ast: makeDebug("resolve-everything:noisy:ast"),
  traverse: makeDebug("resolve-everything:noisy:traverse"),
  args: makeDebug("resolve-everything:noisy:args"),
  returns: makeDebug("resolve-everything:noisy:returns"),
};
