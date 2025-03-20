import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientService from "../../services/clientService";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import ToastMessage from "../../components/Message/ToastMessage";

const ClientCreatePage = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    clientType: "natural", // Valor por defecto
    documentType: "dni", // Valor por defecto
    documentNumber: "",
    name: "",
    phone: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar campos obligatorios
    if (!client.documentNumber.trim()) {
      newErrors.documentNumber = "El número de documento es obligatorio.";
    } else if (!/^\d+$/.test(client.documentNumber)) {
      // Validar que el número de documento contenga solo números
      newErrors.documentNumber = "El número de documento debe ser solo números.";
    }

    if (!client.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!client.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(client.phone)) {
      // Validar que el teléfono contenga solo números
      newErrors.phone = "El teléfono debe ser solo números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, se puede enviar
  };

  // Manejar la creación del cliente
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        clientType: client.clientType,
        documentType: client.documentType,
        documentNumber: client.documentNumber,
        name: client.name,
        phone: client.phone,
      };

      await clientService.createClient(dataToSend);

      // Redirigir inmediatamente y pasar el mensaje como estado
      navigate("/admin/clientes", {
        state: { toastMessage: { message: "Cliente creado correctamente.", type: "success" } },
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      setToastMessage({ message: "Error al crear el cliente.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/clientes");
  };

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Crear Cliente</h2>
      </div>

      {/* Formulario de creación */}
      <Form onSubmit={handleSubmit} isLoading={isLoading} onCancel={handleCancel}>
        <select
          name="clientType"
          value={client.clientType}
          onChange={(e) => setClient({ ...client, clientType: e.target.value })}
          className="bg-secondary-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-secondary-900 sm:text-sm mb-4"
        >
          <option value="juridica">Jurídica</option>
          <option value="natural">Natural</option>
        </select>

        <select
          name="documentType"
          value={client.documentType}
          onChange={(e) => setClient({ ...client, documentType: e.target.value })}
          className="bg-secondary-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-secondary-900 sm:text-sm mb-4"
        >
          <option value="dni">DNI</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="otro">Otro</option>
        </select>

        <Input
          label="Número de Documento"
          name="documentNumber"
          value={client.documentNumber}
          onChange={(e) => setClient({ ...client, documentNumber: e.target.value })}
          error={errors.documentNumber} // Mostrar error si existe
        />

        <Input
          label="Nombre"
          name="name"
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          error={errors.name} // Mostrar error si existe
        />

        <Input
          label="Teléfono"
          name="phone"
          value={client.phone}
          onChange={(e) => setClient({ ...client, phone: e.target.value })}
          error={errors.phone} // Mostrar error si existe
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

export default ClientCreatePage;