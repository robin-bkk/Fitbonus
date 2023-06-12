import Insurance from "src/app/apiomat/frontend/insurancedatabase/Insurance";
import QuestionOption from "../apiomat/frontend/formtool/QuestionOption";
import CustomerFormResponse from "../apiomat/frontend/formtool/CustomerFormResponse";
import { GlobalService } from "../services/global/global.service";
import { saveAs } from "file-saver";

export async function fetchInsurances(): Promise<string[]> {
  // const query: string = 'active=="1" order by name';
  const query: string = 'processContext =="eFormulare" order by name';
  const insurances: Insurance[] = await Insurance.getInsurances(query);
  return insurances
    .map((insurance) => insurance.name)
    .sort((a: string, b: string) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
}

export function parse(jsonObject: any): any {
  return JSON.parse(JSON.stringify(jsonObject));
}

export function sortOptions(options: QuestionOption[]): QuestionOption[] {
  function getSortedData(data: any, prop: string, asc?: boolean) {
    return data.sort((a: any, b: any) => {
      return (a[prop] < b[prop] ? -1 : 1) * (asc ? 1 : -1);
    });
  }
  options.length === 2 && optionsHavePattern(options, ["Ja", "Nein"])
    ? options.sort((a: QuestionOption, b: QuestionOption) =>
        a.name.localeCompare(b.name)
      )
    : (options = getSortedData(options, "prio", true));
  return options;
}

export function optionsHavePattern(
  options: QuestionOption[],
  pattern: string[]
): boolean {
  if (pattern.length !== options.length) {
    return false;
  }
  let p: string,
    bool = true;
  for (p of pattern) {
    if (options.some((o) => o.name.includes(p))) {
      bool = true;
      continue;
    } else {
      bool = false;
      break;
    }
  }
  return bool;
}

export async function downloadConfirmationFile(object: CustomerFormResponse) {
  try {
    GlobalService.spinner(true, "<h2>Dokument wird heruntergeladen...</h2>");
    const date = new Date(GlobalService.response.lastModifiedAt);
    const buffer: ArrayBuffer = await object.loadConfirmationFile();
    const blob = new Blob([buffer], { type: "application/pdf" });
    const base64 = await blobToBase64(blob);
    const fileName = `Sendebestätigung_${GlobalService.response.form.name.replace(
      /\ /g,
      "_"
    )}_${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}_${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }_${date.getFullYear()}.pdf`;

    // if android (custom method injected)
    const smingoCustom = window["SmingoCustom"];
    if (smingoCustom && smingoCustom.processDataURL) {
      // define callback for android
      window["processDataURLCompleted"] = () => {
        GlobalService.spinner(false);
        window["processDataURLCompleted"] = null;
      };
      smingoCustom.processDataURL(base64, fileName);
      return;
    }

    saveAs(blob, fileName);
    GlobalService.spinner(false);
    GlobalService.trackUserClick("download_confirmation");
  } catch (error) {
    throw { code: 507 };
  }
}

export async function blobToBase64(blob: Blob) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function stringToDate(
  date: string,
  dateFormat: string,
  dateDelimiter: string,
  time?: string,
  timeFormat?: string,
  timeDelimiter?: string
) {
  const dateItems = date.split(dateDelimiter);
  const dateFormatItems = dateFormat.toLowerCase().split(dateDelimiter);
  const monthIndex = dateFormatItems.indexOf("mm");
  const dayIndex = dateFormatItems.indexOf("dd");
  const yearIndex = dateFormatItems.indexOf("yyyy");
  if (time && timeFormat && timeDelimiter) {
    const timeItems = time.split(timeDelimiter);
    const timeFormatItems = timeFormat.toLowerCase().split(timeDelimiter);
    const hourIndex = timeFormatItems.indexOf("hh");
    const minuteIndex = timeFormatItems.indexOf("mm");
    const secondIndex = timeFormatItems.indexOf("ss");
    return new Date(
      parseInt(dateItems[yearIndex], null),
      parseInt(dateItems[monthIndex], null) - 1,
      parseInt(dateItems[dayIndex], null),
      parseInt(timeItems[hourIndex], null),
      parseInt(timeItems[minuteIndex], null),
      parseInt(timeItems[secondIndex], null)
    );
  } else {
    return new Date(
      parseInt(dateItems[yearIndex], null),
      parseInt(dateItems[monthIndex], null) - 1,
      parseInt(dateItems[dayIndex], null)
    );
  }
}

// replace errors in JSON stringify to get whole object stringified
export function replaceErrors(key: string, value: any) {
  if (value instanceof Error) {
    const error = {};
    Object.getOwnPropertyNames(value).forEach(
      (index) => (error[index] = value[index])
    );
    return error;
  }
  return value;
}

export function changePasswordVisibility(input: HTMLInputElement) {
  return input.type === "password" ? "text" : "password";
}

export function transformAnswer(answer: string) {
  try {
    const formattedAnswer = answer.replace(/\\/g, "");
    const jsonAnswer = JSON.parse(formattedAnswer);
    let finalString = "";
    switch (jsonAnswer.type) {
      case "timerangedaily":
        const { values } = jsonAnswer;
        for (const element of values) {
          const day = element.day;
          let from = element.from;
          let to = element.to;
          if (from === undefined) {
            from = "   ";
          }
          if (to === undefined) {
            to = "   ";
          }
          const string = day + ": " + from + " - " + to + " Uhr, " + "\n";
          const tempString = finalString.concat(string);
          finalString = tempString;
        }
        return finalString;

      default:
        return answer;
    }
  } catch (error) {
    return answer;
  }
}
