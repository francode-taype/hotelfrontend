import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import roomTypeService from "../../services/roomTypeService";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import ToastMessage from "../../components/Message/ToastMessage";

const RoomTypeUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState({ name: "", description: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Estado para el loading inicial
  const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

  // Cargar los datos del tipo de habitación
  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const data = await roomTypeService.getRoomTypeById(id);
        setRoomType(data);
      } catch (error) {
        console.error("Error al cargar el tipo de habitación:", error);
        setToastMessage({ message: "Error al cargar el tipo de habitación.", type: "error" });
      } finally {
        setIsFetching(false); // Finaliza el loading inicial
      }
    };

    fetchRoomType();
  }, [id]);

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    if (!roomType.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Manejar la actualización del tipo de habitación
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

      await roomTypeService.updateRoomType(id, dataToSend);

      setToastMessage({ message: "Tipo de habitación actualizado correctamente.", type: "success" });
      setTimeout(() => navigate("/admin/habitaciones/tipos"), 2000);
    } catch (error) {
      console.error("Error al actualizar el tipo de habitación:", error);
      setToastMessage({ message: "Error al actualizar el tipo de habitación.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar la cancelación
  const handleCancel = () => {
    navigate("/admin/habitaciones/tipos");
  };

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Actualizar Tipo de Habitación</h2>
      </div>

      {/* Formulario de actualización */}
      <Form
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={handleCancel}
        isFetching={isFetching} // Pasar el estado de carga inicial al Form
      >
        <Input
          label="Nombre"
          name="name"
          value={roomType.name}
          onChange={(e) => setRoomType({ ...roomType, name: e.target.value })}
          required
          error={errors.name} // Mostrar mensaje de error si existe
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

export default RoomTypeUpdatePage;