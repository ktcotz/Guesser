type Action = "add" | "remove";

export const showMessage = (
  messageElement: HTMLSpanElement | null,
  message: string
) => {
  if (!messageElement) return;

  messageElement.textContent = message;
};

export const showError = (
  messageElement: HTMLSpanElement | null,
  error: string
) => {
  if (!messageElement) return;

  messageElement.textContent = error;
};

export const setElementContent = <T extends HTMLElement>(
  element: T | null,
  content: string | number
) => {
  if (!element) return;

  element.textContent = String(content);
};

export const setFocus = <T extends HTMLElement>(focusElement: T | null) => {
  if (!focusElement) return;

  focusElement.focus();
};

export const manageElementState = <T extends HTMLElement>(
  element: T | null,
  action: {
    type: Action;
    className: string;
  },
  content: string | number
) => {
  if (!element) return;

  if (action.type === "add") {
    element.classList.add(action.className);
  } else {
    element.classList.remove(action.className);
  }

  element.textContent = String(content);
};

export const clearInput = (element: HTMLInputElement | null) => {
  if (!element) return;

  element.value = "";
};
