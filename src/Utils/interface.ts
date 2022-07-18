export interface IModal {
  isOpen: boolean;
  title: string;
  message: string;
  status: EStatus;
}

export enum EStatus {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

export enum EColor {
  BLACK = "black",
  WHITE = "white",
}

export type TStyle = EStatus | EColor;
