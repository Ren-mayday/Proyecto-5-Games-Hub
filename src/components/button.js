//!#COMPONENTE JS REUTILIZABLE

export const createButton = (text, onClick, className = "") => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = `btn-base ${className}`; // btn-base, clase base para reutilizar estilos
  btn.addEventListener("click", onClick);
  return btn;
};
