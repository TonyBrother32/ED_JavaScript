let itemsDatabaseObj = {
	
	_items: {},
	_basket: {},
	idStart: 9990,
	
	get items(){
		return this._items;
	},
	get basket(){
		return this._basket;
	},
	
	addItem(name, cost, details){
		let idNum = this.idStart;
		let newItem = {
			name,
			cost,
			id: idNum,
			details
		};
		this.items[idNum] = newItem;
		this.idStart++;
		return idNum;
	},
	
	addBasket(name, count){
		let newBasket = {
			name,
			count
		}
		this.basket[name] = newBasket;
	},
	
	getItemId(name){
		let keysFromDb = Object.keys(this.items);
		const db = this.items;
		for (keysFromDb in db){
			if(name === db[keysFromDb].name){
				return db[keysFromDb].id;
			}
		}
		return 'Nothing found';
	},
	
	removeItem(name){
		delete this.items[name];
	},
	getItemCost(id){
		return this.items[id].cost;
	},
	
	calculateBasketCost(){
		let total = 0;
		const query = this.basket;
		for(item in query){
			let itemCost = this.getItemCost(this.getItemId(query[item].name))*query[item].count;
			total += itemCost;
		}
		return total;
	},
	
	calculateBasketCount(){
		let total = 0;
		const query = this.basket;
		for(item in query){
			total += query[item].count;
		}
		return total;		
	},
	
	checkEmptyBasket(){
		if(Object.keys(this.basket).length === 0){
			return true;
		} else {
			return false;
		}
	},
	htmlCreateForm(type, id){
		let element = document.createElement(type);
		element.setAttribute('id', id);
		return element;
	},
	htmlEdit(elem, param){
		return elem.innerHTML = param;
	},
	htmlAppend(parent, child){
		return parent.appendChild(child);
	},
	htmlInsertAfter(elem, afterElem) {
		afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
	},
	htmlGenerateBasket(){
		if(!this.checkEmptyBasket()){
			return 'В корзине '+this.calculateBasketCount()+' товаров, на сумму: '+this.calculateBasketCost()+' рублей.'
		} else {
			return 'Корзина пуста';
		}
	},
};


itemsDatabaseObj.addItem( 'Memory', 7000, 'Kingston');
itemsDatabaseObj.addItem( 'CPU' , 20000, 'AMD' );
itemsDatabaseObj.addItem( 'GPU', 30000, 'Nvidia');
itemsDatabaseObj.addItem( 'CPU_Cooler', 2500, 'CoolerMaster');

itemsDatabaseObj.addBasket( 'CPU' ,2);
itemsDatabaseObj.addBasket( 'Memory' ,4);
itemsDatabaseObj.addBasket( 'GPU' ,1);

console.log('*** *** *** *** *** ***');
console.log('Стоимость корзины: '+itemsDatabaseObj.calculateBasketCost());
console.log('*** *** *** *** *** ***');

const db = itemsDatabaseObj; 

const mainwrap = document.getElementById('wrap'); 
const description2 = document.getElementById('description');
const basketWrap = db.htmlCreateForm('div', 'basketWrap'); 
db.htmlInsertAfter(basketWrap,description2); 

const basketWrapLink = document.getElementById('basketWrap'); 
const basket = db.htmlCreateForm('div', 'basket'); 
db.htmlAppend(basketWrapLink, basket); 

const basketLink = document.getElementById('basket');

db.htmlEdit(basketLink, db.htmlGenerateBasket());
