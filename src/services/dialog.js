export default {
   alert(options) {
      const alertElement = document.createElement('sso-alert');
      document.documentElement.appendChild(alertElement);
      alertElement.level = 'is-' + (options?.level ?? 'info');
      alertElement.title = options?.title ?? 'Information';
      alertElement.message = options?.message ?? 'options: title, level, message; levels: info, success, warning, danger';
      alertElement.update();
   },
};