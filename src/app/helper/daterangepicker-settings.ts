import { IMyDrpOptions } from "mydaterangepicker";

export function getDaterangepickerSettings() {
  const daterangepickerSettings: IMyDrpOptions = {
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
    showClearBtn: false,
    showApplyBtn: false,
    firstDayOfWeek: "mo",
    sunHighlight: false,
    monthSelector: false,
    yearSelector: false,
    minYear: 1899,
    maxYear: 2099,
    indicateInvalidDateRange: false,
    inline: false,
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
    showSelectDateText: false,
    showClearDateRangeBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 },
  };
  return daterangepickerSettings;
}
