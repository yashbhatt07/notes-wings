import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastMessages() {
  return <ToastContainer style={{ marginTop: "45px" }} />;
}

export const showToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    theme: "light",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    theme: "light",
  });
};

export const signUpSuccessMessage = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    theme: "light",
  });
};

export const successMessage = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    theme: "light",
  });
};

export default ToastMessages;
