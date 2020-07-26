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
         const login = await http.post('login', {
            params: [this.username, this.password]
         });

         if (!login.access_token) {
            alert('login failed');
            return;
         }

         localStorage.setItem('access_token', login.access_token);

         await this.context.session();
         this.urlHash = '#/dashboard';
         // document.querySelector('sso-root').shadowRoot.querySelector('sso-dashboard').update();
      }

      signup() {
         this.urlHash = '#/signup';
      }

   }
);
