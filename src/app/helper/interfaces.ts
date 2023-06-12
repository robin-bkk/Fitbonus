export interface ErrorMessage {
  code: number;
  message?: string;
  task?: Function;
  status: string;
  button?: {
    label: string;
    onclick: Function;
  };
}

export interface InputSetting {
  name: string;
  placeholder?: string;
  type?: string;
  rule?: string;
  valid: boolean;
  value: string;
  error?: string;
  compare?: InputSetting;
}

export enum CountlyConsentGroups {
  USER = "user",
  ACTIVITY = "activity",
  INTERACTION = "interaction",
  CRASHES = "crashes",
  RATING = "rating",
}
