import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-verify-user',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      async verify() {
         const response = await api.post('verify-user', {
            params: [this.verificationCode],
         });
         if (response?.delete_flag === 1) {
            this.context.session(true);
            leanweb.urlHashPath = '#/dashboard';
         } else {
            alert('Verification failed.')
         }
      }
   }
);
