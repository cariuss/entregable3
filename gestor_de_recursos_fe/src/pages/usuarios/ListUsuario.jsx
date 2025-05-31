import React from "react";
import { useState, useEffect } from "react";
import { getUsuarios, deleteUsuario , createUs} from "../../services/usuarios.service";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal";
import CreateUsuario from "./CreateUsuario";
import UpdateUsuario from "./UpdateUsuario";

export const ListUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [usuarioToDeleteId, setUsuarioToDeleteId] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const openDeleteModal = (id) => {
    setUsuarioToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUsuarioToDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      if (usuarioToDeleteId) {
        await deleteUsuario(usuarioToDeleteId); // asegúrate de importar esto
        setUsuarios(
          usuarios.filter((usuario) => usuario.id !== usuarioToDeleteId)
        );
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const openUpdateModal = (id) => {
    setSelectedUsuarioId(id);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUsuarioId(null);
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, [currentPage]);

  const fetchUsuarios = async () => {
    const recursos = await getUsuarios();
    setUsuarios(recursos);
    setPageCount(Math.ceil(recursos.length / itemsPerPage));
  };


  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentUsuarios = usuarios.slice(offset, offset + itemsPerPage);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Lista de Usuarios
      </h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          onClick={openCreateModal}
        >
          Crear Usuario
        </button>
      </div>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Numero
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {usuario.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {usuario.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {usuario.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {usuario.numero}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {usuario.rol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <button
                    onClick={() => openUpdateModal(usuario.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openDeleteModal(usuario.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Siguiente >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Anterior"
        renderOnZeroPageCount={null}
        containerClassName="pagination flex justify-center mt-4"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 border rounded-md hover:bg-gray-200"
        previousClassName="page-item"
        previousLinkClassName="page-link px-4 py-2 border rounded-md hover:bg-gray-200"
        nextClassName="page-item"
        nextLinkClassName="page-link px-4 py-2 border rounded-md hover:bg-gray-200"
        activeClassName="active bg-blue-500 text-white"
        disabledClassName="disabled opacity-50 cursor-not-allowed"
      />
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          title={false}
          text={false}
          icon={false}
          children={
            <CreateUsuario
              onSubmit={fetchUsuarios}
              onCancel={closeCreateModal}
            />
          }
        />
      )}
      {isUpdateModalOpen && (
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          title={false}
          text={false}
          icon={false}
          children={
            <UpdateUsuario
              usuarioData={usuarios.find(
                (usuario) => usuario.id === selectedUsuarioId
              )}
              onSubmit={fetchUsuarios}
            />
          }
        />
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
        text="¿Estás seguro de que quieres eliminar este usuario?"
        icon="warning"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ListUsuario;
