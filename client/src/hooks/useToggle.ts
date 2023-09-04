import { useState } from 'react';

const useToggle = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  function toggle() {
    setIsOpen(!isOpen);
  }
  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return {
    isOpen,
    toggle,
    onClose,
    onOpen,
  };
};
export default useToggle;
