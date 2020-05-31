import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-verify-password',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      async verify() {
         const response = await http.post('verify-user', {
            _0: this.verificationCode,
         });
         if (response.data?.length) {
            const email = response.data?.[0]?.[0];
            console.log(email);
         }
         this.urlHash = '#/dashboard';
         document.querySelector('sso-root').update();
      }
   }
);
