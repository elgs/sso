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
         this.context.session().then(() => {
            if (!this.context.user) {
               this.urlHashPath = '#/login';
            } else {
               this.urlHashPath = '#/dashboard';
               // document.querySelector('sso-root').update();
            }
         });
      }

      urlHashChanged() {
         this.update();
      }
   }
);
