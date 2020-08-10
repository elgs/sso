import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';
import { http } from '../../services/http-client.js';

customElements.define('sso-forget-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      async sendCode() {
         const response = await http.post('forget-password-send-code', {
            params: [this.username],
         });

         this.urlHashPath = '#/forget-password-reset-password';
      }

      async resetPassword() {
         const response = await http.post(`forget-password-reset-password`, {
            params: [this.username, this.password, this.vCode],
         });

         if (response?.change_password === 1) {
            this.urlHashPath = '#/login';
         } else {
            alert('failed to reset password');
         }
      }

      urlHashChanged() {
         this.update();
      }
   }
);
