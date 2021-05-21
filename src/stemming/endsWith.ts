/**
 * Returns true if the character array ends with the suffix.
 *
 * @param s input string
 * @param len input string length
 * @param suffix suffix string to test
 * @return true if <code>s</code> ends with <code>suffix</code>
 */
export const endsWith = (s: string[], len: number, suffix: string): boolean => {
  let suffixLen = suffix.length;
  if (suffixLen > len) return false;
  for (let i = suffixLen - 1; i >= 0; i--) {
    if (s[len - (suffixLen - i)] != suffix[i]) {
      return false;
    }
  }
  return true;
};
