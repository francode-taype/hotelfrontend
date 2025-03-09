import React, { useEffect, useState } from "react";

const ToastMessage = ({
  message,
  type = "success",
  duration = 2500,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  // Define el color según el tipo de mensaje
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "successdelete"
      ? "bg-red-400"
      : type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg`}
    >
      {message}
    </div>
  );
};

export default ToastMessage;
