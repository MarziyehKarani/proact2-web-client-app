import { toast } from 'react-toastify';
import toastr from "toastr"
import "toastr/build/toastr.min.css"

export const showSuccessToast = (message) => {
    toast.dismiss();
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export const apiErrorToast = (errorMeassage) => {
    console.log(errorMeassage.response);
    toast.dismiss();
    toastr.options = {
        positionClass: "toast-top-right",
        closeButton: true,
        timeOut: 10000
    }

    var errorDetails = errorMeassage;
    if (errorMeassage.response
        && errorMeassage.response.data) {
        errorDetails = errorMeassage.response.data;
    }

    toastr.error(errorDetails, "Error");
}

export const showErrorToast = (message) => {
    toast.dismiss();
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export const showErrorAlert = (message) => {
    toast.dismiss();
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export const showLoadingToast = () => {
    toast.loading("Waiting...");
};

export const closeToast = () => {
    toast.dismiss();
};