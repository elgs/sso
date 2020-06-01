const parseJwt = token => {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
};

export const context = {
   get user() {
      const token = localStorage.getItem('access_token');
      if (!token) {
         return null;
      }
      return parseJwt(token);
   }
};