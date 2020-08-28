import dialog from '../../services/dialog.js';
import { http } from '../../services/http-client.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

customElements.define('sso-forget-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      turnedOn() {
         const autoFocusInputs = this.shadowRoot.querySelectorAll('.auto-focus');
         if (leanweb.urlHashPath === '#/forget-password-send-code') {
            autoFocusInputs?.[0]?.focus();
         } else if (leanweb.urlHashPath === '#/forget-password-reset-password') {
            autoFocusInputs?.[1]?.focus();
         }
      }

      async sendCode(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const response = await http.post('forget-password-send-code', {
            params: [this.username],
         });
         this.isLoading = false;

         leanweb.urlHashPath = '#/forget-password-reset-password';
      }

      async resetPassword(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const response = await http.post(`forget-password-reset-password`, {
            params: [this.username, this.password, this.vCode],
         });
         this.isLoading = false;

         if (response?.change_password === 1) {
            leanweb.urlHashPath = '#/login';
         } else {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Change password failed.'
            });
            return;
         }

         this.username = '';
         this.password = '';
         this.vCode = '';
      }

      urlHashChanged() {
         this.update();
      }

      backToLogin() {
         leanweb.urlHashPath = '#/login';
      }
   }
);
