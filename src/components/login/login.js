import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-login',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         console.log('login');
      }

      async login() {
         const user = await this.context.login(this.username, this.password);
         if (!user) {
            alert('Login failed.');
            return;
         }

         if (user?.flags?.signup !== undefined && user?.flags?.signup !== null) {
            this.urlHashPath = '#/verify-user';
         } else {
            this.urlHashPath = '#/dashboard';
         }
      }

      forgetPassword() {
         this.urlHashPath = '#/forget-password-send-code';
      }

      signup() {
         this.urlHashPath = '#/signup';
      }

   }
);
