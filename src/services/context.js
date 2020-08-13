import LWElement from '../lib/lw-element.js';
import { api, http } from './http-client.js';

export const context = {
   user: null,

   async session(force = false) {
      if (force || !this.user) {
         this.user = await api.get('session');
         leanweb.eventBus.dispatchEvent('update');
      }
      return this.user;
   },

   async login(username, password) {
      const accessToken = await this.getAccessToken(username, password);

      if (accessToken) {
         localStorage.setItem('access_token', accessToken);
      }

      return await this.session(true);
   },

   async loginSSO(username, password, returnUrl) {
      const accessToken = await this.getAccessToken(username, password);
      if (accessToken) {
         location.href = returnUrl + '?access_token=' + accessToken;
      }
   },

   async getAccessToken(username, password) {
      const login = await http.post('login', {
         params: [username, password]
      });
      return login.access_token;
   }
};