import { Modal } from 'bootstrap';

export const ModalService = {
  createRemoveConfirm: ({ confirmCallback, header, message }) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${header}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ${message}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" id="removeTaskConfirmButton">Удалить</button>
                  </div>
                </div>
              </div>
            </div>`
    );
    const removeModalContainer = document.querySelector('#removeModal');
    const removeTaskConfirmButton = document.querySelector(
      '#removeTaskConfirmButton'
    );
    const removeModal = new Modal(removeModalContainer);

    removeTaskConfirmButton.addEventListener('click', () => {
      confirmCallback();
      removeModal.hide();
    });

    removeModalContainer.addEventListener('hidden.bs.modal', () => {
      removeModal.dispose();
      removeModalContainer.remove();
    });

    removeModal.show();
  },
};
