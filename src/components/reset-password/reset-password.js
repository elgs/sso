import dialog from '../../services/dialog.js';
import { api } from '../../services/http-client.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

customElements.define('sso-reset-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async resetPassword(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const response = await api.post(`reset-password`, {
            params: [this.username, this.newPassword],
         });
         this.isLoading = false;
         this.update();
         if (response.err) {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: response.err
            });
            return;
         } else if (response?.reset_password === 1) {
            this.username = '';
            this.newPassword = '';
         } else {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Reset password failed.'
            });
            return;
         }
      }
   }
);
