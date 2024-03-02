export function shrinkTheString(str, maxLetters) {
  return str?.length > maxLetters
    ? `${str?.substring(0, maxLetters - 3)}...`
    : str;
}
