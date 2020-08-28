import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';
import { api } from '../../services/http-client.js';
import dialog from '../../services/dialog.js';

customElements.define('sso-change-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async changePassword() {
         this.isLoading = true;
         this.update();
         const response = await api.post(`change-password`, {
            params: [this.newPassword, this.oldPassword],
         });
         this.isLoading = false;
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
