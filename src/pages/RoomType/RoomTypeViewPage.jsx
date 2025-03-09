import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import roomTypeService from "../../services/roomTypeService";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import ToastMessage from "../../components/Message/ToastMessage";

const RoomTypePage = () => {
  const { id } = useParams();
  const [roomType, setRoomType] = useState({ name: "", description: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener los datos del tipo de habitación
  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const data = await roomTypeService.getRoomTypeById(id);
        setRoomType(data);
      } catch (error) {
        console.error("Error al cargar el tipo de habitación:", error);
        setToastMessage({
          message: "Error al cargar el tipo de habitación.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomType();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">
          Detalles del Tipo de Habitación
        </h2>
      </div>

      {/* Mostrar un mensaje de carga mientras se obtienen los datos */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : (
        <div className="bg-secondary-300 p-4 rounded-lg">
          <Input
            label="Nombre"
            name="name"
            value={roomType.name}
            placeholder="Nombre del tipo de habitación"
            disabled
          />
          <TextArea
            label="Descripción"
            name="description"
            value={roomType.description}
            placeholder="Descripción del tipo de habitación"
            disabled
          />
          {/* Botón de regresar */}
          <div className="flex justify-center mt-6">
            <Link to="/admin/habitaciones/tipos" className="btn-back">
              Regresar
            </Link>
          </div>
        </div>
      )}

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

export default RoomTypePage;
