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

      async domReady() {
         await this.context.session();
         this.update();
      }

      async logout() {
         await api.post('logout');
         localStorage.removeItem('access_token');
         this.context.user = null;
         this.urlHash = '#/login';
      }

      urlHashChanged() {
         this.update();
      }
   }
);
