export function convertDate(date: string | number) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return `${day}.${month}.${year}`;
}

export function getCurrentMonth() {
  return new Date().getMonth() + 1
}

export function convertToMonth(date: number) {
  return new Date(date).getMonth() + 1
}

export function isCurrentMonth(date: number) {
  const currentMonth = new Date().getMonth() + 1
  return new Date(date).getMonth() + 1 === currentMonth;
}