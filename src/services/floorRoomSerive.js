import httpClient from "./httpClient";

const floorRoomService = {
  async getAllFloorRooms({ field = "number", value = "", pageable = {} }) {
    try {
      const { page = 0, size = 10, sort = "number,asc" } = pageable;
      const sortParam = Array.isArray(sort) ? sort.join(",") : sort;

      const response = await httpClient.get(`/api/v1/floor-rooms`, {
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
        throw new Error(
          "La respuesta de la API no tiene la estructura esperada."
        );
      }
    } catch (error) {
      console.error("Error al obtener los pisos de habitación:", error);
      throw error;
    }
  },

  async getFloorRoomById(floorRoomId) {
    try {
      const response = await httpClient.get(`/api/v1/floor-room/${floorRoomId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el piso de habitación:", error);
      throw error;
    }
  },

  async createFloorRoom(floorRoomData) {
    try {
      const response = await httpClient.post(`/api/v1/floor-room`, floorRoomData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el piso de habitación:", error);
      throw error;
    }
  },

  async updateFloorRoom(floorRoomId, floorRoomData) {
    try {
      const dataToSend = {
        number: floorRoomData.number,
      };

      const response = await httpClient.put(
        `/api/v1/floor-room/${floorRoomId}`,
        dataToSend
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el piso de habitación:", error);
      throw error;
    }
  },

  async deleteFloorRoom(floorRoomId) {
    try {
      await httpClient.delete(`/api/v1/floor-room/${floorRoomId}`);
    } catch (error) {
      console.error("Error al eliminar el piso de habitación:", error);
      throw error;
    }
  },
};

export default floorRoomService;