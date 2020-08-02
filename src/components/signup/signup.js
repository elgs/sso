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

         if (response === 1) {
            const user = await this.context.login(this.username, this.password);
            if (user?.user_flag === 'signup') {
               this.urlHash = '#/verify-user';
            } else {
               this.urlHash = '#/dashboard';
            }
         }
      }


      login() {
         this.urlHash = '#/login';
      }
   }
);
