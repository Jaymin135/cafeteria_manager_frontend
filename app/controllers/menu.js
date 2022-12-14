import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class MenuController extends Controller {
    menuitems = {};
    @tracked item_name = '';
    @tracked price = '';
    @tracked category_name = '';
    @tracked empty_categoryname = false;
    @tracked empty_itemname = false;
    @tracked empty_itemprice = false;
    @tracked iscategorySaved = false;
    @tracked isitemSaved = false;
    
    @action
    async fetchitems(id) {
        const url = config.APP.URL;
        let response = await fetch(url + '/menuitems?id=' + id);
        let items = await response.json();
        this.set("menuitems",items);
    }

    @action
    async AddtoCart(menu_category_id, menu_item_id, menu_item_name, menu_item_price) {
        const cart = {
            user_id: localStorage.getItem('UserId'),
            menu_category_id: menu_category_id,
            menu_item_id: menu_item_id,
            menu_item_name: menu_item_name,
            menu_item_price: menu_item_price
        }
        const url = config.APP.URL;
        const response = await fetch(url + '/addtocart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
        });
    }

    @action
    setitem(category_id) {
        let description = document.getElementById('textarea_' + category_id);
        if(description)
            description.value = "";
        this.set("item_name", "");
        this.set("price", "");
        this.set('isitemSaved', false);
        this.set('empty_itemname', false);
        this.set('empty_itemprice', false);
    }

    @action 
    async saveItem(category_id) {
        let valid_input = true;
        this.empty_itemname = false;
        this.empty_itemprice = false;
        
        if(this.item_name.trim() == "") {
            this.empty_itemname = true;
            valid_input = false;
        }
        if(this.price.trim() == "") {
            this.empty_itemprice = true;
            valid_input = false;
        }

        if(valid_input) {
            let description = document.getElementById('textarea_' + category_id);
            const item = {
                category_id: category_id,
                item_name: this.item_name.trim(),
                description: description.value.trim(),
                price: this.price.trim()
            }
            const url = config.APP.URL;
            const response = await fetch(url + '/addmenuitem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
            });
            if(response.statusText == "Created") {
                this.set('isitemSaved', true);
                this.fetchitems(category_id);
            }
        }
    }

    @action
    setcategory() {
        this.set("category_name", "");
        this.set('iscategorySaved', false);
        this.set('empty_categoryname', false);
    }

    @action
    async saveCategory() {
        this.empty_categoryname = false;
        if(this.category_name.trim() == "") {
            this.empty_categoryname = true;
        }
        else {
            const url = config.APP.URL;
            const response = await fetch(url + '/addmenucategory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({category_name: this.category_name.trim()})
            });
            if(response.statusText == "Created") {
                this.set('iscategorySaved', true);
                this.send('refreshCurrentRoute');
            }
        }
    }

    @action
    redirect() {
        this.transitionToRoute('cart');
    }
}
