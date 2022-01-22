import { parse, isValid } from "date-fns";

const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const URL_REGEX =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

export function isValidTime(time: string): string | true {
  if (TIME_REGEX.test(time)) {
    return true;
  }

  return 'Time should be in format "hh:mm"';
}

export function isValidURL(url: string): string | true {
  if (url.length === 0) {
    return true;
  }

  if (URL_REGEX.test(url)) {
    return true;
  }

  return "Make sure this is a valid URL";
}

export function isValidDate(date: string): string | true {
  const parsed = parse(date, "dd/MM/yyyy", new Date());

  if (!isValid(parsed)) {
    return "Make sure date is in the format DD/MM/YYYY";
  }

  return true;
}

export function isValidDescription(description: any): string | true {
  console.log(description, !description[0]?.content?.length);
  if (!description?.content?.[0]?.content?.length) {
    return "Make sure to add a description";
  }

  return true;
}
