export interface IModal extends IToast {
  title: string;
}

export interface IToast {
  isOpen: boolean;
  message: string;
  status: "error" | "success" | "info";
}
