import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-dashboard',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         console.log('in dashboard');
      }

      async logout() {
         const token = localStorage.getItem('access_token');
         if (token) {
            await api.post('logout');
            localStorage.removeItem('access_token');
         }
         this.urlHash = '#/login';
         document.querySelector('sso-root').update();
      }
   }
);
