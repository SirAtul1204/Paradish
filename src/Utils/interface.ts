export interface IModal {
  isOpen: boolean;
  title: string;
  message: string;
  status: "error" | "success" | "info";
}
