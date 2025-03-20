import React from "react";
import {
  FaBed,
  FaRegMoneyBillAlt,
  FaEye,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ocupado":
        return "bg-red-500";
      case "libre":
        return "bg-green-500";
      case "por_limpiar":
        return "bg-yellow-500";
      case "limpiando":
        return "bg-blue-500";
      case "mantenimiento":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg border-2 transition-transform transform hover:scale-105 hover:shadow-xl ${getStatusColor(
        room.status
      )} text-white`}
    >
      <div className="flex justify-between items-center mb-2 flex-wrap">
        <div className="flex">
          <FaBed className="text-4xl mr-3" />
          <h4 className="text-3xl font-extrabold">{room.number}</h4>
        </div>
        <p className="text-xl font-semibold">{room.status}</p>
      </div>
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <div className="flex items-center">
          <FaRegMoneyBillAlt className="mr-2" />
          <p className="text-sm">
            <span className="font-semibold">Precio Diario:</span> S/.{" "}
            {room.dailyPrice}
          </p>
        </div>

        <div className="flex items-center">
          <FaRegMoneyBillAlt className="mr-2" />
          <p className="text-sm">
            <span className="font-semibold">Precio por Hora:</span> S/.{" "}
            {room.hourlyPrice}
          </p>
        </div>
      </div>
      <span className="mt-2 border-t flex items-center justify-between"></span>

      <div className="flex justify-between mt-2">
        <Link
          to={`/admin/habitaciones/ver/${room.id}`}
          className="text-primary-500 hover:underline py-2 flex items-center"
        >
          <FaEye className="mr-2" />
          Ver más
        </Link>
        {room.status === "libre" && (
          <Link
            to={`/admin/reservar/${room.id}`}
            className="btn-secondary flex items-center"
          >
            <FaRegCalendarCheck className="mr-2" />
            Reservar
          </Link>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
