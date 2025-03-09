import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import roomService from "../../services/roomService";
import roomTypeService from "../../services/roomTypeService";
import floorRoomService from "../../services/floorRoomSerive";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import Select from "react-select";
import ToastMessage from "../../components/Message/ToastMessage";
import * as Yup from "yup"; // Importar Yup

const RoomCreatePage = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    number: "",
    description: "",
    dailyPrice: "",
    hourlyPrice: "",
    status: "",
    tipo_habitacion_id: null,
    piso_id: null,
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [roomTypes, setRoomTypes] = useState([]); // Opciones para tipos de habitación
  const [floors, setFloors] = useState([]); // Opciones para pisos

  // Opciones para el estado de la habitación
  const statusOptions = [
    { value: "ocupado", label: "Ocupado" },
    { value: "libre", label: "Libre" },
    { value: "por_limpiar", label: "Por limpiar" },
    { value: "limpiando", label: "Limpiando" },
    { value: "mantenimiento", label: "Mantenimiento" },
  ];

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    number: Yup.string().required("El número de habitación es obligatorio."),
    description: Yup.string(),
    dailyPrice: Yup.number()
      .required("El precio diario es obligatorio.")
      .positive("El precio diario debe ser un número positivo."),
    hourlyPrice: Yup.number()
      .required("El precio por hora es obligatorio.")
      .positive("El precio por hora debe ser un número positivo."),
    status: Yup.string().required("El estado es obligatorio."),
    tipo_habitacion_id: Yup.object()
      .required("Debe seleccionar un tipo de habitación.")
      .nullable(),
    piso_id: Yup.object()
      .required("Debe seleccionar un piso.")
      .nullable(),
  });

  // Cargar tipos de habitación y pisos
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Obtener tipos de habitación
        const roomTypesData = await roomTypeService.getAllRoomTypes({
          pageable: { page: 0, size: 100, sort: "name,asc" },
        });
        setRoomTypes(
          roomTypesData.content.map((rt) => ({
            value: rt.id,
            label: rt.name,
          }))
        );

        // Obtener pisos
        const floorsData = await floorRoomService.getAllFloorRooms({
          pageable: { page: 0, size: 100, sort: "number,asc" },
        });
        setFloors(
          floorsData.content.map((f) => ({
            value: f.id,
            label: f.number,
          }))
        );
      } catch (error) {
        console.error("Error al cargar opciones:", error);
        setToastMessage({
          message: "Error al cargar opciones. Intente nuevamente.",
          type: "error",
        });
      }
    };

    fetchOptions();
  }, []);

  // Validar el formulario con Yup
  const validateForm = async () => {
    try {
      await validationSchema.validate(room, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  // Manejar la creación de la habitación
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    if (!(await validateForm())) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        number: room.number,
        description: room.description,
        dailyPrice: parseFloat(room.dailyPrice),
        hourlyPrice: parseFloat(room.hourlyPrice),
        status: room.status,
        tipo_habitacion_id: room.tipo_habitacion_id.value,
        piso_id: room.piso_id.value,
      };

      await roomService.createRoom(dataToSend);

      setToastMessage({
        message: "Habitación creada correctamente.",
        type: "success",
      });
      setTimeout(() => navigate("/admin/habitaciones"), 2000);
    } catch (error) {
      console.error("Error al crear la habitación:", error);
      setToastMessage({
        message: "Error al crear la habitación.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar la cancelación
  const handleCancel = () => {
    navigate("/admin/habitaciones");
  };

  return (
    <div className="p-6">
      <div className="flex items-center bg-secondary-300 rounded-lg px-4 py-2 mb-4 border-b-2 border-secondary-700">
        <h2 className="text-xl font-semibold text-primary-500">Crear Habitación</h2>
      </div>

      {/* Formulario de creación */}
      <Form onSubmit={handleSubmit} isLoading={isLoading} onCancel={handleCancel}>
        <Input
          label="Número de Habitación"
          name="number"
          value={room.number}
          onChange={(e) => setRoom({ ...room, number: e.target.value })}
          required
          error={errors.number}
        />
        <TextArea
          label="Descripción"
          name="description"
          value={room.description}
          onChange={(e) => setRoom({ ...room, description: e.target.value })}
          rows={4}
        />
        <Input
          label="Precio Diario"
          name="dailyPrice"
          type="number"
          value={room.dailyPrice}
          onChange={(e) => setRoom({ ...room, dailyPrice: e.target.value })}
          required
          error={errors.dailyPrice}
        />
        <Input
          label="Precio por Hora"
          name="hourlyPrice"
          type="number"
          value={room.hourlyPrice}
          onChange={(e) => setRoom({ ...room, hourlyPrice: e.target.value })}
          required
          error={errors.hourlyPrice}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <Select
            options={statusOptions}
            value={statusOptions.find((option) => option.value === room.status)}
            onChange={(selected) =>
              setRoom({ ...room, status: selected.value })
            }
            placeholder="Seleccione un estado"
          />
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Habitación
          </label>
          <Select
            options={roomTypes}
            value={room.tipo_habitacion_id}
            onChange={(selected) =>
              setRoom({ ...room, tipo_habitacion_id: selected })
            }
            placeholder="Seleccione un tipo de habitación"
          />
          {errors.tipo_habitacion_id && (
            <p className="text-red-500 text-sm mt-1">{errors.tipo_habitacion_id}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Piso
          </label>
          <Select
            options={floors}
            value={room.piso_id}
            onChange={(selected) => setRoom({ ...room, piso_id: selected })}
            placeholder="Seleccione un piso"
          />
          {errors.piso_id && (
            <p className="text-red-500 text-sm mt-1">{errors.piso_id}</p>
          )}
        </div>
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

export default RoomCreatePage;