import LWElement from '../lib/lw-element.js';
import { api, http } from './http-client.js';

export const context = {
   user: null,

   async session(force = false) {
      if (force || !this.user) {
         this.user = await api.get('session');
      }
      return this.user;
   },

   async login(username, password) {
      const login = await http.post('login', {
         params: [username, password]
      });

      if (!login.access_token) {
         return;
      }

      localStorage.setItem('access_token', login.access_token);

      return await this.session(true);
   }
};