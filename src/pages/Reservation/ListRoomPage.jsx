import React, { useState, useEffect } from 'react';
import roomService from '../../services/roomService';
import floorRoomService from '../../services/floorRoomSerive';
import WebSocketService from '../../services/WebSocketService';
import RoomCard from '../../components/Card/RoomCard';
import MainButton from '../../components/Button/MainButton';

const ListRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState(null);

  useEffect(() => {
    // Obtener pisos y habitaciones al cargar el componente
    const fetchRoomsAndFloors = async () => {
      try {
        // Obtener los pisos
        const floorData = await floorRoomService.getAllFloorRooms({
          field: "",  // Filtro de ejemplo
          value: "",  // Valor para filtrar
          pageable: { page: 0, size: 10, sort: "number,asc" }
        });
        setFloors(floorData.content);  // Asignar los pisos obtenidos
        
        // Seleccionar el primer piso por defecto
        const firstFloor = floorData.content[0];
        setSelectedFloor(firstFloor);

        // Obtener las habitaciones del primer piso por defecto
        const roomData = await roomService.getAllRooms({
          field: "",  // Filtro de ejemplo
          value: "",  // Valor para filtrar
          pageable: { page: 0, size: 10, sort: "number,asc" }
        });
        setRooms(roomData.content.filter(room => room.roomFloorNumber === firstFloor.number));
        setLoading(false);  // Cambiar el estado de carga
      } catch (error) {
        console.error("Error al obtener habitaciones y pisos:", error);
        setLoading(false);
      }
    };

    fetchRoomsAndFloors();

    // Conectar al WebSocket
    if (!WebSocketService.client.active) {
      WebSocketService.client.activate();
    }

    // Suscripción al WebSocket
    WebSocketService.client.onConnect = () => {
      console.log('Conectado a WebSocket para recibir actualizaciones');
      WebSocketService.client.subscribe('/topic/rooms', (message) => {
        const room = JSON.parse(message.body);
        console.log('Habitación recibida por WebSocket:', room);

        // Actualizar habitaciones con WebSocket
        setRooms((prevRooms) => {
          const index = prevRooms.findIndex(r => r.id === room.id);
          if (index === -1) {
            return [...prevRooms, room];  // Agregar nueva habitación si no existe
          } else {
            const updatedRooms = [...prevRooms];
            updatedRooms[index] = room;  // Actualizar habitación existente
            return updatedRooms;
          }
        });
      });
    };

    return () => {
      WebSocketService.deactivate();
    };
  }, []);

  const handleFloorSelect = async (floor) => {
    setSelectedFloor(floor);  // Cambiar el piso seleccionado
    setLoading(true);  // Mostrar "Cargando..." mientras se cargan las habitaciones

    try {
      // Obtener las habitaciones del piso seleccionado
      const roomData = await roomService.getAllRooms({
        field: "",  // Filtro de ejemplo
        value: "",  // Valor para filtrar
        pageable: { page: 0, size: 10, sort: "number,asc" }
      });
      setRooms(roomData.content.filter(room => room.roomFloorNumber === floor.number));
    } catch (error) {
      console.error("Error al obtener habitaciones del piso:", error);
    }

    setLoading(false);  // Detener el "Cargando..."
  };

  if (loading) {
    return <div className="text-center text-lg">Cargando habitaciones...</div>;
  }

  return (
    <div className="p-4">

      {/* Botones para seleccionar piso */}
      <div className="flex items-center gap-4 bg-secondary-300 rounded-lg px-4 py-2 border-b-2 border-secondary-700">
        {floors.map((floor) => (
          <button
            key={floor.id}
            onClick={() => handleFloorSelect(floor)}
            className={`px-4 py-2 rounded-lg 
              ${selectedFloor?.id === floor.id ? 'btn-secondary' : 'btn-primary'}`}
          >
            Piso {floor.number}
          </button>
        ))}
      </div>

      {/* Mostrar habitaciones del piso seleccionado */}
      <div className='bg-secondary-300 p-4 mt-4 rounded-lg'>
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p>No hay habitaciones disponibles en este piso.</p>
        )}
      </div>
    </div>
  );
};

export default ListRoomPage;
