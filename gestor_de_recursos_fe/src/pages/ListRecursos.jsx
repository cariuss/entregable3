import { getRecursos, deleteRecurso } from "../services/recursos.service";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import UpdateRecurso from "./UpdateRecurso";
import CreateRecurso from "./CreateRecurso";
import { handleDownloadPDF } from "../services/download.pdf";
export const ListRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    const recursos = await getRecursos();
    setRecursos(recursos);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recursoToDeleteId, setRecursoToDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setRecursoToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecursoToDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      if (recursoToDeleteId) {
        await deleteRecurso(recursoToDeleteId);
        setRecursos(
          recursos.filter((recurso) => recurso.id !== recursoToDeleteId)
        );
        closeDeleteModal();
        fetch();
      }
    } catch (error) {
      console.error("Error deleting recurso:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = recursos.slice(offset, offset + itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecursoId, setSelectedRecursoId] = useState(null);

  const openModal = (id) => {
    setSelectedRecursoId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecursoId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Recursos</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Recurso
        </button>
         <button
    onClick={() => handleDownloadPDF(currentItems)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Descargar PDF
  </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">
                Cantidad Total
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Cantidad Disponible
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Fecha Creación
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Fecha Actualización
              </th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((recurso) => (
              <tr key={recurso.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.descripcion}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.tipo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.cantidad_total}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.cantidad_disponible}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.fecha_creacion}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recurso.fecha_actualizacion}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(recurso.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(recurso.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={Math.ceil(recursos.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4 space-x-2"}
        pageClassName={"mx-1"}
        pageLinkClassName={
          "px-3 py-1 border rounded text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
        }
        previousLinkClassName={
          "px-3 py-1 border rounded bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
        }
        nextLinkClassName={
          "px-3 py-1 border rounded bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
        }
        activeLinkClassName={"bg-blue-500 text-white px-3 py-1 border rounded"}
        breakClassName={"mx-1"}
        breakLinkClassName={
          "px-3 py-1 border rounded text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
        }
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={false}
          text={false}
          icon={false}
          children={
            <UpdateRecurso
              recursoData={recursos.find(
                (recurso) => recurso.id === selectedRecursoId
              )}
              onSubmit={fetch}
              onCancel={closeModal}
            />
          }
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
        text="¿Estás seguro de que quieres eliminar este recurso?"
        icon="warning"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        onConfirm={handleDelete}
      />
      <Modal
  isOpen={isCreateModalOpen}
  onClose={closeCreateModal}
  title={false}
  text={false}
  icon={false}
  children={
    <CreateRecurso
      onSubmit={() => {
        fetch();        // recarga la lista
        closeCreateModal(); // cierra el modal
      }}
    />
  }
/>
    </div>
  );
};

export default ListRecursos;
