export const getSubstringOccurences = (text: string, substr: string) => {
  const textArray = text.toLowerCase().split(" ");
  return textArray.filter((t) => t.includes(substr)).length;
};
