import { context } from '../../services/context.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';


customElements.define('sso-dashboard',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      toDashboard() {
         leanweb.urlHashPath = '#/dashboard'
      }

      changePassword() {
         leanweb.urlHashPath = '#/dashboard/change-password'
      }

      resetPassword() {
         leanweb.urlHashPath = '#/dashboard/reset-password'
      }

      urlHashChanged() {
         this.update();
      }
   }
);
