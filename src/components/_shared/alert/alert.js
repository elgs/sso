import LWElement from './../../../lib/lw-element.js';
import ast from './ast.js';

customElements.define('sso-alert',
   class extends LWElement {
      constructor() {
         super(ast);
      }

   }
);
