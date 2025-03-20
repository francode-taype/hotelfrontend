import httpClient from "./httpClient";

const clientService = {
  async getAllClients({ field = "name", value = "", pageable = {} }) {
    try {
      const { page = 0, size = 10, sort = "name,asc" } = pageable;
      const sortParam = Array.isArray(sort) ? sort.join(",") : sort;

      const response = await httpClient.get(`/api/v1/clients`, {
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
      console.error("Error al obtener los clientes:", error);
      throw error;
    }
  },

  async getClientById(clientId) {
    try {
      const response = await httpClient.get(`/api/v1/client/${clientId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      throw error;
    }
  },

  async getClientByDocumentNumber(documentNumber) {
    try {
      const response = await httpClient.get(`/api/v1/client/document-number/${documentNumber}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cliente por número de documento:", error);
      throw error;
    }
  },

  async createClient(clientData) {
    try {
      const response = await httpClient.post(`/api/v1/client`, clientData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error;
    }
  },

  async updateClient(clientId, clientData) {
    try {
      const dataToSend = {
        clientType: clientData.clientType,
        documentType: clientData.documentType,
        documentNumber: clientData.documentNumber,
        name: clientData.name,
        phone: clientData.phone,
      };
  
      const response = await httpClient.put(
        `/api/v1/client/${clientId}`,
        dataToSend
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  },

  async deleteClient(clientId) {
    try {
      await httpClient.delete(`/api/v1/client/${clientId}`);
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      throw error;
    }
  },
};

export default clientService;
