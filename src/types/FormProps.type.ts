export interface FormProps<T> {
  type: "create" | "edit";
  onFinish?: (data: T) => void;
  data?: T;
}
