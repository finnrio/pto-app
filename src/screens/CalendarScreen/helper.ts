function MergeEvents(currentEvents: any, newEvents: any) {
  const mergedEvents: any = {};

  Object.keys(currentEvents).forEach((date) => {
    mergedEvents[date] = currentEvents[date];
  });

  Object.keys(newEvents).forEach((date) => {
    if (mergedEvents[date]) {
      mergedEvents[date].dots.push(newEvents[date].dots[0]);
    } else {
      mergedEvents[date] = newEvents[date];
    }
  });

  return mergedEvents;
}

function getDatesBetween(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const datesArray = [];

  while (startDate <= endDate) {
    datesArray.push(startDate.toISOString().slice(0, 10));
    startDate.setDate(startDate.getDate() + 1);
  }
  return datesArray;
}

function GetDottedDatesFromEvents(events: any, key: any) {
  let markedDates: any = {};
  events?.forEach((event: { start_date: string; end_date: string }) => {
    getDatesBetween(event.start_date, event.end_date).forEach((date) => {
      markedDates = {
        ...markedDates,
        [date.toString()]: { dots: [key] },
      };
    });
  });
  return markedDates;
}

export { MergeEvents, GetDottedDatesFromEvents };
