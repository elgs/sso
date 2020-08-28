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

   async logout() {
      await api.post('logout');
      localStorage.removeItem('access_token');
      this.user = null;
      leanweb.urlHashPath = '#/login';
   },

   async getAccessToken(username, password) {
      const login = await http.post('login', {
         params: [username, password, this.return_url]
      });
      return login.access_token;
   }
};