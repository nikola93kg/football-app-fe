import { useState } from 'react';

function useModal() {
  const [isModalOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const openModal = (id = null) => {
    setIsOpen(true);
    setItemId(id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setItemId(null);
  };

  return { isModalOpen, itemId, openModal, closeModal };
}

export default useModal;
