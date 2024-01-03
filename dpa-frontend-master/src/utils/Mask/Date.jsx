/**
 * Function Mask date
 * @param {string} value
 * @returns
 */
export function maskDate(date, reverse = false) {
  const newDate = new Date(date);
  const day = `${newDate.getUTCDate()}`.padStart(2, "0");
  const month = `${newDate.getUTCMonth() + 1}`.padStart(2, "0");
  const year = newDate.getUTCFullYear();

  if (reverse) return `${year}-${month}-${day}`;

  return `${day}/${month}/${year}`;
}
