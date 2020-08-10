import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-dashboard',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;

         console.log('dashboard');
      }


      async logout() {
         await api.post('logout');
         localStorage.removeItem('access_token');
         this.context.user = null;
         this.urlHashPath = '#/login';
      }

      changePassword() {
         this.urlHashPath = '#/dashboard/change-password'
      }

      resetPassword() {
         this.urlHashPath = '#/dashboard/reset-password'
      }

      urlHashChanged() {
         this.update();
      }
   }
);
