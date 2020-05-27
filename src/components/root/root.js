import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { api, http } from '../../services/http-client.js';

customElements.define('sso-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
      }

      username = "root";
      password = "scandisk";

      async login() {
         const response = await http.post('login', {
            _0: this.username,
            _1: this.password,
         });
         if (response.token) {
            localStorage.setItem('access_token', response.token);
         }
         if (response.data) {
            this.user = response.data?.[0]?.[0];
         }
         this.update();
      }

      async logout() {
         const token = localStorage.getItem('access_token');
         if (token) {
            await api.post('logout');
            delete this.user;
         }
         this.update();
      }
   }
);
