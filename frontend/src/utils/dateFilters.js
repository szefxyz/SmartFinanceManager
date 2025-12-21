export function getStartDate(timeframe) {
  const now = new Date();
  const start = new Date(now);

  switch (timeframe) {
    case "Day":
      start.setDate(now.getDate() - 1);
      break;

    case "Week":
      start.setDate(now.getDate() - 7);
      break;

    case "Month":
      start.setMonth(now.getMonth() - 1);
      break;

    case "Year":
      start.setFullYear(now.getFullYear() - 1);
      break;

    default:
      return null;
  }

  return start;
}
