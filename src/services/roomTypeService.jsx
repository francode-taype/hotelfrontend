import httpClient from "./httpClient";

const roomTypeService = {
  async getAllRoomTypes({ field = "name", value = "", pageable = {} }) {
    try {
      const { page = 0, size = 10, sort = "name,asc" } = pageable;
      const sortParam = Array.isArray(sort) ? sort.join(",") : sort;

      const response = await httpClient.get(`/api/v1/room-types`, {
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
      console.error("Error al obtener los tipos de habitación:", error);
      throw error;
    }
  },
  async getRoomTypeById(roomTypeId) {
    try {
      const response = await httpClient.get(`/api/v1/room-type/${roomTypeId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el tipo de habitación:", error);
      throw error;
    }
  },

  async createRoomType(roomTypeData) {
    try {
      const response = await httpClient.post(`/api/v1/room-type`, roomTypeData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el tipo de habitación:", error);
      throw error;
    }
  },

  async updateRoomType(roomTypeId, roomTypeData) {
    try {
      const dataToSend = {
        name: roomTypeData.name,
        description: roomTypeData.description,
      };
  
      const response = await httpClient.put(
        `/api/v1/room-type/${roomTypeId}`,
        dataToSend
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el tipo de habitación:", error);
      throw error;
    }
  },

  async deleteRoomType(roomTypeId) {
    try {
      await httpClient.delete(`/api/v1/room-type/${roomTypeId}`);
    } catch (error) {
      console.error("Error al eliminar el tipo de habitación:", error);
      throw error;
    }
  },
};

export default roomTypeService;
