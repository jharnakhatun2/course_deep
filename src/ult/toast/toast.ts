import { toast, type ToastOptions} from "react-toastify";

const commonOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    color: "white",
    fontWeight: "bold",
    zIndex: 100,
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...commonOptions,
    style: {
      ...commonOptions.style,
      backgroundColor: "green", 
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...commonOptions,
    style: {
      ...commonOptions.style,
      backgroundColor: "red", 
    },
  });
};
