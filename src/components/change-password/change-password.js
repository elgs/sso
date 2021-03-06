import dialog from '../../services/dialog.js';
import { api } from '../../services/http-client.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

customElements.define('sso-change-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async changePassword(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const response = await api.post(`change-password`, {
            params: [this.newPassword, this.oldPassword],
         });
         this.isLoading = false;
         this.update();
         if (response?.change_password !== 1) {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Change password failed.'
            });
            return;
         }
         this.newPassword = '';
         this.oldPassword = '';
      }
   }
);
