import React from "react";
import SecondaryButton from "../Button/SecondaryButton";
import CancelButton from "../Button/CancelButton";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Form = ({ onSubmit, children, isLoading, onCancel, isFetching }) => {
  return (
    <form onSubmit={onSubmit} className="bg-secondary-300 p-4 rounded-lg shadow-lg">
      {/* Mostrar el spinner de carga si isFetching es true */}
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          {children}

          {/* Botones */}
          <div className="flex gap-4 mt-6">
            <SecondaryButton
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </SecondaryButton>

            <CancelButton onClick={onCancel} />
          </div>
        </>
      )}
    </form>
  );
};

export default Form;