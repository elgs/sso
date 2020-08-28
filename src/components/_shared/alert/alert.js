import LWElement from './../../../lib/lw-element.js';
import ast from './ast.js';

customElements.define('sso-alert',
   class extends LWElement {
      constructor() {
         super(ast);

         const modal = this.shadowRoot.querySelector('.modal');
         this.modal = modal;
         modal.querySelectorAll('.delete,.modal-background,.modal-close')?.forEach(elem => {
            elem.addEventListener('click', e => {
               this.remove();
            });
         });

         modal.addEventListener('keyup', e => {
            if (e.key === 'Escape') {
               this.remove();
            }
         });
      }

      domReady() {
         this.modal.focus();
      }
   }
);
