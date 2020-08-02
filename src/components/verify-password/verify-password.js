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
         const response = await api.post('verify-user', {
            params: [this.verificationCode],
         });
         if (response === 1) {
            this.context.session(true);
            this.urlHash = '#/dashboard';
         } else {
            alert('Verification failed.')
         }
      }
   }
);
