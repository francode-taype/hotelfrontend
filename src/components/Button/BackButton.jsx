import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-back"
    >
      Retroceder
    </button>
  );
};

export default BackButton;
