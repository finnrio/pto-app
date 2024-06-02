function getDatesBetween(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const datesArray = [];

  startDate.setDate(startDate.getDate() + 1);

  while (startDate < endDate) {
    datesArray.push(startDate.toISOString().slice(0, 10));
    startDate.setDate(startDate.getDate() + 1);
  }
  return datesArray;
}

export default function GetMarkedDates(ptoEvents: any) {
  let markedDates: any = {};
  ptoEvents?.forEach((event: { start_date: string; end_date: string }) => {
    getDatesBetween(event.start_date, event.end_date).forEach((date) => {
      markedDates = {
        ...markedDates,
        [date.toString()]: { color: "#8ad4ff" },
      };
    });
    markedDates = {
      ...markedDates,
      [event.start_date]: { startingDay: true, color: "#8ad4ff" },
      [event.end_date]: { endingDay: true, color: "#8ad4ff" },
    };
  });
  return markedDates;
}
