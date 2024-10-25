export const calculateXPositionOfName = (name: string) => {
  const minLength = 30;
  const maxLength = 70;

  const minX = 350;
  const maxX = 550;

  if (name.length <= minLength) return minX;
  if (name.length >= maxLength) return maxLength;

  const scale = (name.length - minLength) / (maxLength - minLength);
  return minX + scale * (maxX - minX);
};
