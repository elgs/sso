import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';
import { api } from '../../services/http-client.js';

customElements.define('sso-reset-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      async resetPassword() {
         const response = await api.post(`reset-password`, {
            params: [this.username, this.newPassword],
         });
         if (response.err) {
            alert(response.err);
         } else if (response?.reset_password === 1) {
            this.username = '';
            this.newPassword = '';
            this.update();
         } else {
            alert('Reset password failed.');
         }
      }
   }
);
