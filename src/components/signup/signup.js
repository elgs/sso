import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-signup',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      async signup() {
         const response = await http.post('signup', {
            params: [
               this.username,
               this.email,
               this.password,
            ]
         });
         if (response.data?.length) {
            const email = response.data?.[0]?.[0];
            console.log(email);
         }
         this.urlHash = '#/verify-user';
      }

      login() {
         this.urlHash = '#/login';
      }
   }
);
