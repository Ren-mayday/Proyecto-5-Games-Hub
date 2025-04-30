//!#COMPONENTE JS REUTILIZABLE

import { createButton } from "./button";

export const createModal = (options = {}) => {
  const config = {
    title: "Modal Title",
    content: "",
    showCloseButton: true,
    closeButtonText: "Cerrar",
    showActionButton: true,
    actionButtonText: "Aceptar",
    onAction: () => {},
    onClose: () => {},
    ...options,
  };

  // Crear el elemeto modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = options.id || "custom-modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalTitle = document.createElement("h2");
  modalTitle.className = "modal-title";
  modalTitle.textContent = config.title;

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  // Contenido flexible (string o nodo DOM)
  if (typeof config.content === "string") {
    modalBody.innerHTML = config.content;
  } else if (config.content instanceof Node) {
    // Verifica si es un nodo DOM
    modalBody.appendChild(config.content);
  } else {
    console.error("El contenido del modal debe ser string o Node");
    modalBody.innerHTML = ""; // Limpia el contenido si no es válido
  }

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  // Botón de cerrar
  if (config.showCloseButton) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close-btn";
    closeBtn.textContent = config.closeButtonText;
    closeBtn.addEventListener("click", () => {
      config.onClose();
      modal.hide();
    });
    modalFooter.appendChild(closeBtn);
  }

  if (config.showActionButton) {
    const actionBtn = createButton(
      config.actionButtonText,
      () => {
        config.onAction();
        modal.hide();
      },
      "modal-action-btn"
    );
    modalFooter.appendChild(actionBtn);
  }

  modalContent.append(modalTitle, modalBody, modalFooter);
  modal.appendChild(modalContent);

  modal.show = () => {
    if (!document.body.contains(modal)) {
      document.body.appendChild(modal);
    }
    modal.style.display = "flex";
  };

  modal.hide = () => {
    modal.style.display = "none";
  };

  return modal;
};
