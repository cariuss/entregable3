import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal";
import { getPeticiones, deletePeticion } from "../../services/peticiones.service";
import CreatePeticion from "./CreatePeticion";
import UpdatePeticion from "./UpdatePeticion";

export const ListPeticiones = () => {
  const [peticiones, setPeticiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPeticionId, setSelectedPeticionId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [peticionToDeleteId, setPeticionToDeleteId] = useState(null);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentItems = peticiones.slice(offset, offset + itemsPerPage);

  const fetchPeticiones = async () => {
    try {
      const data = await getPeticiones();
      setPeticiones(data);
    } catch (error) {
      console.error("Error al cargar peticiones:", error);
      setPeticiones([]);  // Evita que se rompa la UI
    }
  };

  useEffect(() => {
    fetchPeticiones();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openUpdateModal = (id) => {
    setSelectedPeticionId(id);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const openDeleteModal = (id) => {
    setPeticionToDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = async () => {
    if (peticionToDeleteId) {
      try {
        await deletePeticion(peticionToDeleteId);
        await fetchPeticiones();
      } catch (error) {
        console.error("Error al eliminar la petición:", error);
      } finally {
        closeDeleteModal();
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Peticiones</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crear Petición
        </button>
      </div>

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
            {currentItems.length ? currentItems.map((p) => (
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
            )) : (
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
        pageCount={Math.ceil(peticiones.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4 space-x-2"
        pageLinkClassName="px-3 py-1 border rounded hover:bg-gray-100"
        activeLinkClassName="bg-blue-500 text-white"
        previousLabel="<"
        nextLabel=">"
      />

      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        <CreatePeticion onSubmit={fetchPeticiones} onCancel={closeCreateModal} />
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
        <UpdatePeticion
          peticionData={peticiones.find((p) => p.id === selectedPeticionId)}
          onSubmit={fetchPeticiones}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
        text="¿Estás seguro de que quieres eliminar esta petición?"
        icon="warning"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ListPeticiones;