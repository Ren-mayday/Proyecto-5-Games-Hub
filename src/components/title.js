//!#COMPONENTE JS REUTILIZABLE

export const createTitle = (text, level = 1, className = "") => {
  const headingTitle = document.createElement(`h${level}`);
  headingTitle.textContent = text;

  if (className) {
    headingTitle.className = className;
  }

  return headingTitle;
};
