import { context } from '../../services/context.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';


customElements.define('sso-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         delete this.context.return_url;
         delete this.context.token_key;
         this.context.return_url = leanweb.urlHashParams.return_url;
         this.context.token_key = leanweb.urlHashParams.token_key;
      }

      async domReady() {
         await this.context.session();
         if (!this.context.user && (leanweb.urlHashPath.startsWith('#/dashboard') || !leanweb.urlHashPath)) {
            leanweb.urlHashPath = '#/login';
         } else {
            if (!leanweb.urlHashPath) {
               leanweb.urlHashPath = '#/dashboard';
            }
         }
      }

      urlHashChanged() {
         this.update();
      }
   }
);
