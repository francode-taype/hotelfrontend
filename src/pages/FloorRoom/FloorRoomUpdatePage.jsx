import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import floorRoomService from "../../services/floorRoomSerive";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import ToastMessage from "../../components/Message/ToastMessage";

const FloorRoomUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [floorRoom, setFloorRoom] = useState({ number: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Estado para el loading inicial
  const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

  // Cargar los datos del piso de habitación
  useEffect(() => {
    const fetchFloorRoom = async () => {
      try {
        const data = await floorRoomService.getFloorRoomById(id);
        setFloorRoom({ number: data.number.toString() }); // Convertir a string para el input
      } catch (error) {
        console.error("Error al cargar el piso de habitación:", error);
        setToastMessage({
          message: "Error al cargar el piso de habitación.",
          type: "error",
        });
      } finally {
        setIsFetching(false); // Finaliza el loading inicial
      }
    };

    fetchFloorRoom();
  }, [id]);

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

  // Manejar la actualización del piso de habitación
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

      await floorRoomService.updateFloorRoom(id, dataToSend);

      setToastMessage({
        message: "Piso de habitación actualizado correctamente.",
        type: "success",
      });
      setTimeout(() => navigate("/admin/habitaciones/pisos"), 2000);
    } catch (error) {
      console.error("Error al actualizar el piso de habitación:", error);
      setToastMessage({
        message: "Error al actualizar el piso de habitación.",
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
        <h2 className="text-xl font-semibold text-primary-500">Actualizar Piso de Habitación</h2>
      </div>

      {/* Formulario de actualización */}
      <Form
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={handleCancel}
        isFetching={isFetching} // Pasar el estado de carga inicial al Form
      >
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

export default FloorRoomUpdatePage;