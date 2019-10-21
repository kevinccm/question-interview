export function toBeListString(list) {
  return list.join("和");
}

export function kFormatter(num) {
  try {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
  } catch (e) {
    return 0;
  }
}
