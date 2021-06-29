export const formatDatetime = (dt: string | undefined) => {
  if (!dt) return;

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(dt));
};
