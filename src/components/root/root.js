import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         console.log('root');
      }

      async domReady() {
         await this.context.session();
         if (!this.context.user) {
            this.urlHashPath = '#/login';
         } else {
            if (!this.urlHashPath) {
               this.urlHashPath = '#/dashboard';
            }
         }
      }

      urlHashChanged() {
         this.update();
      }
   }
);
