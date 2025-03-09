import React from 'react';

const CancelButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-cancel w-full"
    >
      Cancelar
    </button>
  );
};

export default CancelButton;