import httpClient from "./httpClient";

const roomService = {
  async getAllRooms({ field = "number", value = "", pageable = {} }) {
    try {
      const { page = 0, size = 10, sort = "number,asc" } = pageable;
      const sortParam = Array.isArray(sort) ? sort.join(",") : sort;

      const response = await httpClient.get(`/api/v1/rooms`, {
        params: {
          field,
          value,
          page,
          size,
          sort: sortParam,
        },
      });

      if (
        response.data.status === 200 &&
        response.data.message === "Todavía no hay registros disponibles."
      ) {
        return { content: [], totalPages: 0, empty: true }; // Respuesta sin registros
      } else if (response.data.content) {
        return response.data; // Respuesta con datos
      } else {
        throw new Error("La respuesta de la API no tiene la estructura esperada.");
      }
    } catch (error) {
      console.error("Error al obtener las habitaciones:", error);
      throw error;
    }
  },

  async getRoomById(roomId) {
    try {
      const response = await httpClient.get(`/api/v1/room/${roomId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la habitación:", error);
      throw error;
    }
  },

  async createRoom(roomData) {
    try {
      const response = await httpClient.post(`/api/v1/room`, roomData);
      return response.data;
    } catch (error) {
      console.error("Error al crear la habitación:", error);
      throw error;
    }
  },

  async updateRoom(roomId, roomData) {
    try {
      const dataToSend = {
        number: roomData.number,
        description: roomData.description,
        dailyPrice: roomData.dailyPrice,
        hourlyPrice: roomData.hourlyPrice,
        status: roomData.status,
        roomTypeId: roomData.roomTypeId,
        roomFloorNumber: roomData.roomFloorNumber,
      };

      const response = await httpClient.put(`/api/v1/room/${roomId}`, dataToSend);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
      throw error;
    }
  },

  async deleteRoom(roomId) {
    try {
      await httpClient.delete(`/api/v1/room/${roomId}`);
    } catch (error) {
      console.error("Error al eliminar la habitación:", error);
      throw error;
    }
  },
};

export default roomService;