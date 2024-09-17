import React, { createContext, useContext, useState } from "react";
import CropImageModal from "../components/modals/CropImageModal";

const CropImageModalContextState = createContext();
const CropImageModalContextOpen = createContext();
const CropImageModalContextClose = createContext();

const CropImageModalProvider = ({ children }) => {
  const [cropImageModal, setCropImageModal] = useState({
    title: "",
    children: <></>,
    canClose: false,
    isOpen: false,
  });

  const openCropImageModal = (imageSrc, setImage) => {
    setCropImageModal({
      title: "",
      children: <CropImageModal imageSrc={imageSrc} setImage={setImage} />,
      canClose: false,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setCropImageModal({
      title: "",
      children: <></>,
      canClose: false,
      isOpen: false,
    });
  };

  return (
    <CropImageModalContextState.Provider value={cropImageModal}>
      <CropImageModalContextClose.Provider value={closeModal}>
        <CropImageModalContextOpen.Provider value={openCropImageModal}>
          {children}
        </CropImageModalContextOpen.Provider>
      </CropImageModalContextClose.Provider>
    </CropImageModalContextState.Provider>
  );
};

const useCropImageModalState = () => {
  return useContext(CropImageModalContextState);
};

const useCropImageModalOpen = () => {
  return useContext(CropImageModalContextOpen);
};

const useCropImageModalClose = () => {
  return useContext(CropImageModalContextClose);
};

export {
  CropImageModalProvider,
  useCropImageModalState,
  useCropImageModalOpen,
  useCropImageModalClose,
};
