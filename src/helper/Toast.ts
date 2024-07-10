// utils/toast.ts
import toast from "react-hot-toast";

type ToastOptions = {
    message: string;
    type: 'success' | 'error';
    durationTime: number;
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export const showToast = ({ message, type, durationTime, position }: ToastOptions) => {
    const options = {
        duration: durationTime,
        position,
        style: {
            color: "#000",
            background: "#fff", // Green for success, white for error
            border: `1px solid ${type === 'success' ? "#0f0" : "#f00"}`, // Green for success, white for error
        },
        iconTheme: {
            primary: "#fff",
            secondary: type === 'success' ? "#0f0" : "#f00", // Green icon for success, red for error
        }
    };

    if (type === 'success') {
        toast.success(message, options);
    } else {
        toast.error(message, options);
    }
};