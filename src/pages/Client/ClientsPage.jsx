import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import clientService from "../../services/clientService";
import Modal from "../../components/Modal/Modal";
import ToastMessage from "../../components/Message/ToastMessage";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/Search/SearchBar";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState("name,asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Usa useLocation para acceder al estado de la navegación
  const location = useLocation();

  // Efecto para mostrar el mensaje si existe en el estado de la navegación
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);

      // Limpiar el estado de la navegación para evitar que el mensaje se muestre nuevamente
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Función para obtener los clientes
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await clientService.getAllClients({
        field: "name",
        value: searchValue,
        pageable: {
          page,
          size: pageSize,
          sort,
        },
      });

      if (data.empty || data.content.length === 0) {
        setMessage("No se encontraron clientes.");
        setClients([]);
        setTotalPages(0);
        setTotalElements(0);
      } else {
        setClients(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }, [searchValue, page, pageSize, sort]);

  // Función para manejar errores al obtener los datos
  const handleFetchError = (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        setMessage(
          "No autenticado. Por favor, inicie sesión para acceder a este recurso."
        );
      } else if (status === 403) {
        setMessage(
          "Acceso denegado. No tiene permisos para acceder a este recurso."
        );
      } else {
        setMessage("Error al obtener los clientes.");
      }
    } else {
      setMessage("Error de red o servidor no disponible.");
    }
    console.error("Error fetching clients:", error);
  };

  // Efecto para cargar los clientes
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Función para manejar la búsqueda
  const handleSearch = (value) => {
    setSearchValue(value);
    setPage(0);
  };

  // Función para obtener sugerencias de autocompletado
  const fetchSuggestions = async (value) => {
    const data = await clientService.getAllClients({
      field: "name",
      value: value,
      pageable: {
        page: 0,
        size: 10, // Limitar a 10 resultados
        sort: "name,asc",
      },
    });
    return data.content.map((item) => item.name);
  };

  // Función para manejar la eliminación de un cliente
  const handleDelete = async () => {
    try {
      await clientService.deleteClient(clientToDelete);
      setToastMessage({
        message: "Cliente eliminado correctamente.",
        type: "successdelete",
      });
      setModalOpen(false);

      // Verificar si la página actual queda vacía después de eliminar
      if (clients.length === 1 && page > 0) {
        setPage(page - 1); // Redirigir a la página anterior
      } else {
        fetchClients(); // Recargar la lista
      }
    } catch (error) {
      setToastMessage({
        message: "Error al eliminar el cliente.",
        type: "error",
      });
      console.error("Error deleting client:", error);
    }
  };

  // Opciones de tamaño de página
  const pageSizeOptions = [10, 25, 50, 100].filter(
    (size) => size <= totalElements
  );

  // Función para manejar el cambio de tamaño de página
  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPage(0); // Reiniciar a la página 1 al cambiar el tamaño de la página
  };

  return (
    <div className="p-6 gap-4">
      {/* Mostrar el mensaje si existe */}
      {toastMessage && (
        <ToastMessage
          message={toastMessage.message}
          type={toastMessage.type}
          duration={3000}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center bg-secondary-300 rounded-lg px-4 py-2 border-b-2 border-secondary-700">
        <h2 className="text-2xl font-semibold text-primary-500">Clientes</h2>
        <Link to="/admin/clientes/crear" className="btn-secondary">
          Crear Cliente
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="bg-secondary-300 p-4 mt-4 rounded-lg">
        <div className="flex justify-between items-center">
          <SearchBar
            placeholder="Buscar cliente"
            onSearch={handleSearch}
            fetchSuggestions={fetchSuggestions}
          />

          {totalElements > 10 && (
            <div className="flex items-center gap-2">
              <p>Mostrar</p>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="p-2 py-1 border border-gray-300 rounded"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <p>Registros</p>
            </div>
          )}
        </div>

        {/* Tabla de clientes */}
        <table className="min-w-full mt-4 bg-secondary-500 rounded shadow-md table-striped">
          <thead>
            <tr>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() =>
                  setSort((prevSort) =>
                    prevSort.split(",")[0] === "name"
                      ? `${"name"},${
                          prevSort.split(",")[1] === "asc" ? "desc" : "asc"
                        }`
                      : `${"name"},asc`
                  )
                }
              >
                Nombre
              </th>
              <th className="py-2 px-4">Teléfono</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-2 px-4">
                  Cargando...
                </td>
              </tr>
            ) : message ? (
              <tr>
                <td colSpan="3" className="text-center py-2 px-4 text-red-600">
                  {message}
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="text-center">
                  <td className="py-2 px-4">{client.name}</td>
                  <td className="py-2 px-4">{client.phone}</td>
                  <td className="py-2 px-4 flex justify-center items-center gap-2">
                    <Link to={`/admin/clientes/ver/${client.id}`}>
                      <FaEye className="text-2xl text-secondary-900 hover:text-secondary-700 cursor-pointer" />
                    </Link>
                    <Link to={`/admin/clientes/actualizar/${client.id}`}>
                      <BiEdit className="text-2xl text-orange-500 hover:text-orange-700 cursor-pointer" />
                    </Link>
                    <MdDelete
                      onClick={() => {
                        setClientToDelete(client.id);
                        setModalOpen(true);
                      }}
                      className="text-2xl text-red-600 hover:text-red-700 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page} // Forzar la página seleccionada
            onPageChange={({ selected }) => setPage(selected)}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirmar eliminación"
        >
          <p>¿Estás seguro de que deseas eliminar este cliente?</p>
          <div className="mt-4 flex justify-between gap-4">
            <button
              onClick={() => setModalOpen(false)}
              className="btn-secondary w-full"
            >
              Cancelar
            </button>
            <button onClick={handleDelete} className="btn-tertiary w-full">
              Eliminar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ClientsPage;