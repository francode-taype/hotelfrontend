import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import clientService from "../../services/clientService";
import Input from "../../components/Form/Input";
import ToastMessage from "../../components/Message/ToastMessage";

const ClientViewPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState({
    clientType: "",
    documentType: "",
    documentNumber: "",
    name: "",
    phone: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await clientService.getClientById(id);
        setClient(data);
      } catch (error) {
        console.error("Error al cargar el cliente:", error);
        setToastMessage({
          message: "Error al cargar el cliente.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Detalles del Cliente</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : (
        <div className="bg-secondary-300 p-4 rounded-lg">
          <Input
            label="Tipo de Cliente"
            name="clientType"
            value={client.clientType}
            placeholder="Tipo de Cliente"
            disabled
          />
          <Input
            label="Tipo de Documento"
            name="documentType"
            value={client.documentType}
            placeholder="Tipo de Documento"
            disabled
          />
          <Input
            label="Número de Documento"
            name="documentNumber"
            value={client.documentNumber}
            placeholder="Número de Documento"
            disabled
          />
          <Input
            label="Nombre"
            name="name"
            value={client.name}
            placeholder="Nombre"
            disabled
          />
          <Input
            label="Teléfono"
            name="phone"
            value={client.phone}
            placeholder="Teléfono"
            disabled
          />

          <div className="flex justify-center mt-6">
            <Link to="/admin/clientes" className="btn-back">
              Regresar
            </Link>
          </div>
        </div>
      )}

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

export default ClientViewPage;