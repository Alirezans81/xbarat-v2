export default function DirectionSetter(font) {
  if (font === "Ar" || font === "Fa" || font === "Af") {
    return "rtl";
  } else {
    return "ltr";
  }
}
