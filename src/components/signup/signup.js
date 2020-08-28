import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';
import dialog from '../../services/dialog.js';

customElements.define('sso-signup',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         console.log('signup');
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async signup() {
         this.isLoading = true;
         this.update();
         const response = await http.post('signup', {
            params: [
               this.username,
               this.email,
               this.password,
            ]
         });
         this.isLoading = false;

         if (response?.signup === 1 && response?.create_flag === 1) {
            const user = await this.context.login(this.username, this.password);
            if (user?.flags?.signup !== undefined && user?.flags?.signup !== null) {
               leanweb.urlHashPath = '#/verify-user';
            } else {
               leanweb.urlHashPath = '#/dashboard';
            }
         } else {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Signup failed.'
            });
            return;
         }

         this.username = '';
         this.email = '';
         this.password = '';
      }

      backToLogin() {
         leanweb.urlHashPath = '#/login';
      }
   }
);
