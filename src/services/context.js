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

   async loginSSO(username, password) {
      const accessToken = await this.getAccessToken(username, password);
      if (accessToken) {
         if (this.return_url.indexOf('?') > 0) {
            location.href = this.return_url + '&' + (this.token_key ?? 'access_token') + '=' + accessToken;
         } else {
            location.href = this.return_url + '?' + (this.token_key ?? 'access_token') + '=' + accessToken;
         }

      } else {
         alert('login_failed');
      }
   },

   async getAccessToken(username, password) {
      const login = await http.post('login', {
         params: [username, password]
      });
      return login.access_token;
   }
};