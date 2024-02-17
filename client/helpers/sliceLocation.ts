export default function sliceStringToPairs(text: string) {
  if (text.length % 2 !== 0) {
    throw new Error("String length must be divisible by 2");
  }

  return Array.from({ length: text.length / 2 }, (_, i) =>
    text.slice(i * 2, i * 2 + 2),
  );
}
