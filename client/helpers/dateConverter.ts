type ServerTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export function dateConverter(serverTimestamp: ServerTimestamp): Date | null {
  if (!serverTimestamp) {
    return null;
  }

  const milliseconds = serverTimestamp.seconds * 1000;

  return new Date(milliseconds);
}

export function formatDate(date: Date | null): string | null {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
