const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function monthYear(date: Date) {
  return `${months[date.getUTCMonth()]} ${date.getFullYear()}`
}
