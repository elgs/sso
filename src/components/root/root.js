import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';

customElements.define('sso-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         if (!this.context.user) {
            this.urlHash = '#/login';
         }
      }
   }
);
