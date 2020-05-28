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
            _0: this.username,
            _1: this.email,
            _2: this.password,
         });
         if (response.data?.length) {
            const email = response.data?.[0]?.[0];
            console.log(email);
         }
         // this.context.show = 'dashboard';
         document.querySelector('sso-root').update();
      }

      login() {
         this.context.show = 'login';
         document.querySelector('sso-root').update();
      }
   }
);
