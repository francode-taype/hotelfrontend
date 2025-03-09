import React from 'react';

const MainButton = ({ isLoading, label, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn-primary"
    >
      {isLoading ? (loadingText || 'Cargando...') : label}
    </button>
  );
};

export default MainButton;
