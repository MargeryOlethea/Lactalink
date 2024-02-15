import { Text } from "react-native";

export default function Logo({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Text
      style={{
        fontWeight: "800",
        fontSize: size ? size : 20,
        color: color ? color : "#8CB9BD",
      }}
    >
      LactaLink
    </Text>
  );
}
