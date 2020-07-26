import { api } from './http-client.js';
import LWElement from '../lib/lw-element.js';


export const context = {
   user: null,

   async session() {
      if (!this.user) {
         this.user = await api.get('session');
      }
      LWElement.eventBus.dispatchEvent('user', this.user);
      return this.user;
   }
};