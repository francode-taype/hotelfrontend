import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import floorRoomService from "../../services/floorRoomSerive";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import ToastMessage from "../../components/Message/ToastMessage";

const FloorRoomCreatePage = () => {
  const navigate = useNavigate();
  const [floorRoom, setFloorRoom] = useState({ number: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar que el número no esté vacío
    if (!floorRoom.number.trim()) {
      newErrors.number = "El número de piso es obligatorio.";
    }
    // Validar que el número sea solo dígitos
    else if (!/^\d+$/.test(floorRoom.number)) {
      newErrors.number = "El número de piso debe contener solo dígitos.";
    }
    // Validar que el número no sea negativo
    else if (parseInt(floorRoom.number) < 0) {
      newErrors.number = "El número de piso no puede ser negativo.";
    }
    // Validar que el número no tenga más de 4 cifras
    else if (floorRoom.number.length > 4) {
      newErrors.number = "El número de piso no puede tener más de 4 cifras.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Manejar la creación del piso de habitación
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        number: parseInt(floorRoom.number), // Convertir a número
      };

      await floorRoomService.createFloorRoom(dataToSend);

      setToastMessage({
        message: "Piso de habitación creado correctamente.",
        type: "success",
      });
      setTimeout(() => navigate("/admin/habitaciones/pisos"), 2000);
    } catch (error) {
      console.error("Error al crear el piso de habitación:", error);
      setToastMessage({
        message: "Error al crear el piso de habitación.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar la cancelación
  const handleCancel = () => {
    navigate("/admin/habitaciones/pisos");
  };

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Crear Piso de Habitación</h2>
      </div>

      {/* Formulario de creación */}
      <Form onSubmit={handleSubmit} isLoading={isLoading} onCancel={handleCancel}>
        <Input
          label="Número de Piso"
          name="number"
          value={floorRoom.number}
          onChange={(e) => setFloorRoom({ ...floorRoom, number: e.target.value })}
          required
          error={errors.number} // Mostrar mensaje de error si existe
        />
      </Form>

      {/* Mostrar mensaje de éxito o error */}
      {toastMessage && (
        <ToastMessage
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default FloorRoomCreatePage;