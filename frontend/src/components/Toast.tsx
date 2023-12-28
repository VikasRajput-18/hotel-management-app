import { useEffect } from "react";
import { ToastMessage } from "../contexts/AppContext";

type ToastMessageProps = ToastMessage & {
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md success text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md error text-white max-w-md";

  return (
    <div className={styles}>
      <div className={`flex items-center justify-center`}>
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
