export const updatePropertyState = (
  setState: (v: any) => void,
  property: string,
  value: any
) => {
  setState((prev) => ({ ...prev, [property]: value }));
};
