import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal";
import { getPeticiones, deletePeticion } from "../../services/peticiones.service";
import CreatePeticion from "./CreatePeticion";
import UpdatePeticion from "./UpdatePeticion";

export const ListPeticiones = () => {
  const [peticiones, setPeticiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // … resto de estados …

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(peticiones)
    ? peticiones.slice(offset, offset + itemsPerPage)
    : [];

  const fetchPeticiones = async () => {
    try {
      const data = await getPeticiones();
      console.log("fetchPeticiones → data:", data);
      setPeticiones(data);
    } catch (error) {
      console.error("Error al cargar peticiones:", error);
      setPeticiones([]);
    }
  };

  useEffect(() => {
    fetchPeticiones();
  }, []);

  // … resto de funciones para paginación, modales, etc. …

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Peticiones</h2>
      {/* Botón Crear, modales, etc. */}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Recurso</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((p) => (
                <tr key={p.id} className="text-center border-b">
                  <td className="px-4 py-2">{p.usuario}</td>
                  <td className="px-4 py-2">{p.recurso}</td>
                  <td className="px-4 py-2">{p.cantidad_solicitada}</td>
                  <td className="px-4 py-2">{p.estado}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openUpdateModal(p.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(p.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  No hay peticiones disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        pageCount={Math.ceil((peticiones.length || 0) / itemsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center mt-4 space-x-2"
        pageLinkClassName="px-3 py-1 border rounded hover:bg-gray-100"
        activeLinkClassName="bg-blue-500 text-white"
        previousLabel="<"
        nextLabel=">"
      />

      {/* Aquí van los modales de Crear, Actualizar y Eliminar */}
    </div>
  );
};

export default ListPeticiones;
