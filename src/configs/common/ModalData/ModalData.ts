import { type OpenConfirmModal } from "node_modules/@mantine/modals/lib/context";

export const ConfirmDeleteModalData: OpenConfirmModal = {
  title: "Confirm Delete",
  children: "Are you sure you want to delete ?",
  labels: {
    confirm: "Delete",
    cancel: "Cancel",
  },
  confirmProps: {
    color: "red",
  },
};

export const BaseModalData: OpenConfirmModal = {
  labels: {
    confirm: "Confirm",
    cancel: "Cancel",
  },
};
