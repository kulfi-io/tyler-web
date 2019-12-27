import Cookie from './cookie';

export class NavHelper {

    constructor() {
    }

    // public attachNavEvents = () => {
        
    //     this._navs = Array.from(document.querySelectorAll('.pages'));

    //     if(this._navs) {
    //         this._navs.forEach((list: HTMLUListElement) => {
    //             const _items =list.querySelectorAll('li');
    //             if(_items) {
    //                 _items.forEach((item: Element) => {
    //                   item.addEventListener('click', this.selectMunuItem);
    //                 });
    //             }
    //         });
    //     }
    // }

    // private selectMunuItem = (e: Event) => {
    //     const _target = <HTMLElement>e.currentTarget;
        
    //     if(_target) {
    //       const _parent = _target.parentNode;
  
    //       if(_parent) {
    //         const _item = _parent.querySelector('li.active');
    //         if(_item) {
    //           _item.classList.remove('active');
    //         }
    //       }
          
    //       _target.classList.add('active');
    //     }
  
    // }

    public setActiveNavItem = (target: string) => {
        const _active = document.querySelector('ul.active-nav');

        if(_active) {
            // const _activeNav = this._navs.find(x => x.classList.contains('active-nav'));
            
            // if(_activeNav) {

                const _activeItem = _active.querySelector('li.active');
                const _targetItem = _active.querySelector(`.nav-${target}`);

                if(_activeItem) _activeItem.classList.remove('active');

                if(_targetItem) _targetItem.classList.add('active');

            // }
        }
    }

    // public displayloggedItems = () => {
    //     if(!this._navs) {
    //         this._navs = Array.from(document.querySelectorAll('.pages'));

    //         if(this._cookieManager.value) {
    //             this._navs.forEach((item: HTMLUListElement) => {
    //                 item.classList.remove('active-nav');
    
    //                 if(item.classList.contains('logged-in')) {
    //                     item.classList.add('active-nav');
    //                 }
    //             });
    //         } else {
    //             this._navs.forEach((item: HTMLUListElement) => {
    //                 item.classList.remove('active-nav');
    
    //                 if(item.classList.contains('default')) {
    //                     item.classList.add('active-nav');
    //                 }
    //             });
    //         }
    //     }

    // }

    // public displayBookedItems = () => {
    //     if(!this._book) {
    //         this._book = <HTMLDivElement>document.querySelector('.book');
    //         this._book.addEventListener('click', (e: Event) => {
    //             window.location.href = '/schedule';
    //         });


    //         if(this._cookieManager.value && !this._book.classList.contains('show')) {
    //             this._book.classList.add('show');
    //         } 

    //     } else {
    //         if(!this._cookieManager.value && this._book.classList.contains('show')) {
    //             this._book.classList.remove('show');
    //         } 
    //     }
        
    //     this.displayloggedItems();

        
    // }

}

export default new NavHelper();