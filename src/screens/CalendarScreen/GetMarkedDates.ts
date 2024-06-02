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

function getColor(status: string) {
  if (status === "Approved") {
    return "#7ffa96";
  }
  if (status === "Pending") {
    return "#8ad4ff";
  }
  return "#ff8a8a";
}

export default function GetMarkedDates(ptoEvents: any) {
  let markedDates: any = {};
  ptoEvents?.forEach(
    (event: { start_date: string; end_date: string; status: string }) => {
      // set color based on status
      const color = getColor(event.status);

      // single day event
      if (event.start_date === event.end_date) {
        markedDates = {
          ...markedDates,
          [event.start_date]: { startingDay: true, endingDay: true, color },
        };
      } else {
        // dates between start and end
        getDatesBetween(event.start_date, event.end_date).forEach((date) => {
          markedDates = {
            ...markedDates,
            [date.toString()]: { color },
          };
        });

        // start and end dates
        markedDates = {
          ...markedDates,
          [event.start_date]: { startingDay: true, color },
          [event.end_date]: { endingDay: true, color },
        };
      }
    },
  );
  return markedDates;
}
