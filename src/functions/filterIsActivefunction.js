export default function FilterIsActive(data) {
  if (data) {
    return data.filter((data) => data.is_active === true);
  } else {
    return [];
  }
}
