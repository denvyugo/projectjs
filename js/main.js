"use strict";

class ProductItem {
	constructor(id, title, price, img){
		this.id = id;
		this.title = title;
		this.price = price;
		this.img = img;
	}
	
	renderItem(){
		 return `<div class="product-item">
                <h3>${this.title}</h3>
				<img src="${this.img}" alt="${this.title}">
                <p>${this.price}</p>
                <button class="buy-btn" data-id="${this.id}">Купить</button>
            </div>`;
	}
}

class Products {
	constructor(container='.products'){
		this.container = container;
		this.productItems = new Map();
		this.init();
	}
	
	init(){
		this._getProductItems();
		this._renderProducts();
		this._setProductsHandler();
	}
	
	_fetchData(){
		return [
			{id: 1, title: 'Notebook', price: 2000, img: 'images\\img001.jpeg'},
			{id: 2, title: 'Keyboard', price: 70, img: 'images\\img002.jpeg'},
			{id: 3, title: 'Mouse', price: 46, img: 'images\\img003.jpeg'},
			{id: 4, title: 'Gamepad', price: 68, img: 'images\\img004.jpeg'},
			{id: 5, title: 'Chair', price: 168, img: 'images\\img005.jpeg'},
		];
	}
	
	_getProductItems(){
		const data = this._fetchData();
		data.forEach(item => this._makeProductItem(item));
	}
	
	_makeProductItem(item){
		let productItem = new ProductItem(item.id, item.title, item.price, item.img);
		this.productItems.set(productItem.id, productItem);
	}
	
	_setProductsHandler(){
		document.querySelector(this.container)
		.addEventListener('click', event => this._buyProductHandler(event));
	}
	
	_buyProductHandler(event){
		const el = event.target;
		if (el.tagName == 'BUTTON') {
			basket.addItem(this.productItems.get(+el.dataset.id));
		}
	}
	
	_renderProducts(){
		const block = document.querySelector(this.container);
		let totalPrice = 0.0;
		for (let item of this.productItems.values()){
			block.insertAdjacentHTML('beforeend', item.renderItem());
			totalPrice += item.price;
		}
		block.insertAdjacentHTML('beforeend', `<div>Total price of all products: ${totalPrice}.</div>`);
	}
}

class Basket{
	constructor(showSwitchBtn){
		this._setSwitchBtnHandler(showSwitchBtn); //установить обработчик события переключателя
		this.showStatus = false;
		this.buyingItems = new Map(); //список продуктов в корзине
		this.totalItems = 0;	//всего продуктов в корзине
		this.totalPrice = 0.0;	//стоимость всех продуктов в корзине
	}
	/**
	 * Метод подключения кнопки показа/скрытия корзины
	 * устанавливает обработчик события нажатия кнопки
	 * @param {str} showSwitchBtn идентификатор копки
	 */
	_setSwitchBtnHandler(showSwitchBtn){
		document.querySelector(`#${showSwitchBtn}`)
			.addEventListener('click', event => this._switchBtnHandler(event));
	}
	/**
	 * Метод обработки показа/скрытия корзины
	 */
	_switchBtnHandler(event){
		this.showStatus = !this.showStatus;
		if (this.showStatus) {
			console.log(`Show status switch on to ${this.showStatus}, total: ${this.totalItems}`);
			this.render();
		} else {
			console.log(`Show status switch off to ${this.showStatus}, total: ${this.totalItems}`);
			this.hide();
		}
	}
	/**
	 * Метод добавления продукта в корзину
	 * @param {ProductItem} goodItem продукт, добавляемый в корзину
	 */
	addItem(goodItem){
		let buyItem = this.buyingItems.get(goodItem.id);
		if (buyItem === undefined) {
			buyItem = new BasketItem(
				goodItem.id,
				goodItem.title,
				goodItem.price,
				goodItem.img,
				1
			);
			this.buyingItems.set(buyItem.id, buyItem);
		} else {
			buyItem.addItem();
		}
		this.totalItems += 1;
		this.totalPrice += buyItem.price;
	}
	/**
	 * Метод удаления продукта из корзины
	 * @param {int} goodID ключевой номер продукта
	 */
	deleteItem(goodID){
		let buyItem = this.buyingItems.get(goodID);
		if (buyItem) {
			price = buyItem.price;
			if (buyItem.quantity > 1) {
				buyItem.decItem();
			} else {
				this.buyingItems.delete(goodID);
			}
			this.totalItems--;
			this.totalPrice -= price;
		}
	}
	/**
	 * Метод получения количества всех продуктов в корзине
	 */
	getQuantity() {
		return this.totalItems;
	}
	/**
	 * Метод получения общей стоимости всех продуктов в корзине
	 */
	getTotalPrice() {
		return this.totalPrice;
	}
	/**
	 * Метод отображения корзины на странице
	 */
	render() {
		let block = document.createElement('div');
		block.setAttribute('class', 'basket');
		document.querySelector('.container').appendChild(block);
		for (let item of this.buyingItems.values()){
			block.insertAdjacentHTML('beforeend', item.renderItem());
		}
		block.insertAdjacentHTML('beforeend', 
			`<p>Total ${this.getQuantity()} goods</p>
			<p>Total price is $${this.getTotalPrice()}</p>`)
	}
	
	/**
	 * Метод скрытия конзины на странице
	 *
	 */
	hide() {
		let block = document.querySelector('.basket');
		block.remove();
	}
}

class BasketItem extends ProductItem {
	constructor(id, title, price, img, quantity){
		super(id, title, price, img);
		this.quantity = quantity;
	}
	/**
	 * Метод отображения элемента корзины
	 */
	renderItem() {
		return `<div class="basket-item">
			<h3>${this.title}</h3>
			<p>${this.getItemPrice()}</p>
			<p>quantity: ${this.getQuantity()} 
			<button class="btn-delete" data-id="${this.id}">&times;</button></p>
			</div>`;
	}
	/**
	 * Метод увеличения количества продукта
	 * @param {int} quantity добавление на указанное количество, по умолчанию на один
	 */
	addItem(quantity=1){
		this.quantity += quantity;
	}
	/**
	 * Метод уменьшения количества продукта на один
	 */
	decItem(){
		if (this.quantity === 1) {
			//удалить элемент
		} else {
			//уменьшить количество
			this.quantity--;
		}
	}
	/**
	 * Метод получения общего количества товатов
	 */
	getQuantity(){
		return this.quantity;
	}
	/**
	 * Метод получения общей суммы 
	 */
	getItemPrice(){
		return this.price * this.quantity;
	}
}

const products = new Products();
const basket = new Basket('basket-btn');