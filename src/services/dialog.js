export default {
   alert(options) {
      const alertElement = document.createElement('sso-alert');
      document.documentElement.appendChild(alertElement);
      alertElement.level = 'is-' + (options?.level ?? 'info');
      alertElement.title = options?.level ?? 'Information';
      alertElement.message = options?.message ?? 'options: title, level, message; levels: info, success, warning, danger';
      alertElement.update();
      const modal = alertElement.shadowRoot.querySelector('.modal');
      modal.classList.add('is-active');
      modal.querySelectorAll('.delete,.modal-background,.modal-close')?.forEach(elem => {
         elem.addEventListener('click', e => {
            modal.classList.remove('is-active');
         });
      });
   },
};