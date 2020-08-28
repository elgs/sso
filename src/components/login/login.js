import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';
import { context } from '../../services/context.js';
import dialog from '../../services/dialog.js';


customElements.define('sso-login',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      turnedOn() {
         this.shadowRoot.querySelector('input:not([lw-false])[auto-focus]')?.focus();
      }

      async login(event) {
         if (event && event.key !== 'Enter') {
            return;
         }
         this.isLoading = true;
         this.update();
         const user = await this.context.login(this.username, this.password);
         this.isLoading = false;
         this.username = '';
         this.password = '';
         if (!user) {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Login failed.'
            });
            return;
         }

         if (user?.flags?.signup !== undefined && user?.flags?.signup !== null) {
            leanweb.urlHashPath = '#/verify-user';
         } else {
            leanweb.urlHashPath = '#/dashboard';
         }
      }

      loginSSO() {
         this.context.loginSSO(this.username, this.password);
      }

      forgetPassword() {
         leanweb.urlHashPath = '#/forget-password-send-code';
      }

      signup() {
         leanweb.urlHashPath = '#/signup';
      }

   }
);
