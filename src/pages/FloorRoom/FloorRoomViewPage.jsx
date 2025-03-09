import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import floorRoomService from "../../services/floorRoomSerive";
import Input from "../../components/Form/Input";
import ToastMessage from "../../components/Message/ToastMessage";

const FloorRoomViewPage = () => {
  const { id } = useParams();
  const [floorRoom, setFloorRoom] = useState({ number: "" });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener los datos del piso de habitación
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
        setIsLoading(false);
      }
    };

    fetchFloorRoom();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">
          Detalles del Piso de Habitación
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
            label="Número de Piso"
            name="number"
            value={floorRoom.number}
            placeholder="Número del piso de habitación"
            disabled
          />
          {/* Botón de regresar */}
          <div className="flex justify-center mt-6">
            <Link to="/admin/habitaciones/pisos" className="btn-back">
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

export default FloorRoomViewPage;