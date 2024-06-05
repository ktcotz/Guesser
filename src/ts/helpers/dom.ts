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
