import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-login',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      async login() {
         const response = await http.post('login', {
            _0: this.username,
            _1: this.password,
         });
         if (response.token) {
            localStorage.setItem('access_token', response.token);
         }
         if (response.data) {
            this.context.user = response.data?.[0]?.[0];
         }
         this.context.show = 'dashboard';
         document.querySelector('sso-root').update();
      }

      signup() {
         this.context.show = 'signup';
         document.querySelector('sso-root').update();
      }
   }
);
