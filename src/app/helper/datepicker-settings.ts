import { IMyDpOptions } from "mydatepicker";

export function getDatepickerSettings() {
  const datepickerSettings: IMyDpOptions = {
    dateFormat: "dd.mm.yyyy",
    dayLabels: {
      su: "So",
      mo: "Mo",
      tu: "Di",
      we: "Mi",
      th: "Do",
      fr: "Fr",
      sa: "Sa",
    },
    monthLabels: {
      1: "Jan",
      2: "Feb",
      3: "Mär",
      4: "Apr",
      5: "Mai",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Okt",
      11: "Nov",
      12: "Dez",
    },
    showTodayBtn: false,
    showClearDateBtn: false,
    firstDayOfWeek: "mo",
    sunHighlight: false,
    satHighlight: false,
    monthSelector: false,
    yearSelector: false,
    minYear: 1899,
    maxYear: 2099,
    indicateInvalidDate: false,
    inline: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    showInputField: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 },
  };
  return datepickerSettings;
}
