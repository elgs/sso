import { context } from '../../services/context.js';
import dialog from '../../services/dialog.js';
import { api } from '../../services/http-client.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';


customElements.define('sso-verify-user',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async verify(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const response = await api.post('verify-user', {
            params: [this.verificationCode],
         });
         this.isLoading = false;
         if (response?.delete_flag === 1) {
            this.context.session(true);
            leanweb.urlHashPath = '#/dashboard';
         } else {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Verification failed.'
            });
            return;
         }
         this.verificationCode = '';
      }

      backToLogin() {
         leanweb.urlHashPath = '#/login';
      }
   }
);
