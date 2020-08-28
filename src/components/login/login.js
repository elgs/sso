import { context } from '../../services/context.js';
import dialog from '../../services/dialog.js';
import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';



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
         if (this.context.return_url) {
            this.loginSSO();
         } else {
            this.loginLocal();
         }
      }

      async loginLocal() {
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

      async loginSSO() {
         this.isLoading = true;
         this.update();
         const accessToken = await this.context.getAccessToken(this.username, this.password);
         this.isLoading = false;
         if (accessToken) {
            if (this.context.return_url.indexOf('?') > 0) {
               location.href = this.context.return_url + '&' + (this.context.token_key ?? 'access_token') + '=' + accessToken;
            } else {
               location.href = this.context.return_url + '?' + (this.context.token_key ?? 'access_token') + '=' + accessToken;
            }
            this.username = '';
            this.password = '';

         } else {
            dialog.alert({
               level: 'danger',
               title: 'Failed',
               message: 'Login failed.'
            });
            return;
         }
      }

      forgetPassword() {
         leanweb.urlHashPath = '#/forget-password-send-code';
      }

      signup() {
         leanweb.urlHashPath = '#/signup';
      }

   }
);
