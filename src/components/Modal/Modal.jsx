import React from 'react';

const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`bg-secondary-100 p-6 rounded shadow-lg max-w-lg relative w-full  lg:max-w-3xl ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 text-orange2 border-b border-gray-100 ">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;