import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import roomTypeService from "../../services/roomTypeService";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import ToastMessage from "../../components/Message/ToastMessage";

const RoomTypeCreatePage = () => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState({ name: "", description: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    if (!roomType.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  // Manejar la creación del tipo de habitación
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        name: roomType.name,
        description: roomType.description,
      };

      await roomTypeService.createRoomType(dataToSend);

      setToastMessage({ message: "Tipo de habitación creado correctamente.", type: "success" });
      setTimeout(() => navigate("/admin/habitaciones/tipos"), 2000);
    } catch (error) {
      console.error("Error al crear el tipo de habitación:", error);
      setToastMessage({ message: "Error al crear el tipo de habitación.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/habitaciones/tipos");
  };

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Crear Tipo de Habitación</h2>
      </div>

      {/* Formulario de creación */}
      <Form onSubmit={handleSubmit} isLoading={isLoading} onCancel={handleCancel}>
        <Input
          label="Nombre"
          name="name"
          value={roomType.name}
          onChange={(e) => setRoomType({ ...roomType, name: e.target.value })}
          required
          error={errors.name} 
        />
        <TextArea
          label="Descripción"
          name="description"
          value={roomType.description}
          onChange={(e) => setRoomType({ ...roomType, description: e.target.value })}
          rows={6}
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

export default RoomTypeCreatePage;