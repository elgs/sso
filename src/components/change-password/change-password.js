import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';
import { api } from '../../services/http-client.js';

customElements.define('sso-change-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      async changePassword() {
         const response = await api.post(`change-password`, {
            params: [this.newPassword, this.oldPassword],
         });
         if (response?.change_password !== 1) {
            alert('Change password failed.');
         } else {
            this.urlHashPath = '#/dashboard';
         }
      }
   }
);
