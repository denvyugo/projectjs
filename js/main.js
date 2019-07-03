class ProductItem {
	constructor(id, title, price, img){
		this.id = id;
		this.title = title;
		this.price = price;
		this.img = img;
	}
	
	renderProduct(){
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
		//this.productItems = data.map(item => this._makeProductItem(item.id, item.title, item.price, item.img));
		data.forEach(item => this._makeProductItem(item));
	}
	
	_makeProductItem(item){
		let productItem = new ProductItem(item.id, item.title, item.price, item.img);
		//return productItem;
		this.productItems.set(productItem.id, productItem);
	}
	
	_renderProducts(){
		const block = document.querySelector(this.container);
		let totalPrice = 0.0;
		for (let item of this.productItems.values()){
			block.insertAdjacentHTML('beforeend', item.renderProduct());
			totalPrice += item.price;
		}
		block.insertAdjacentHTML('beforeend', `<div>Total price of all products: ${totalPrice}.</div>`);
	}
}

class Basket{
	constructor(showSwitchBtn){
		this._setSwitchBtnHandler(showSwitchBtn); //установить обработчик собития переключателя
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
			console.log(`Show status is switch on to ${this.showStatus}`);
		} else {
			console.log(`Show status is switch off to ${this.showStatus}`);
		}
	}
	/**
	 * Метод добавления продукта в корзину
	 * @param {ProductItem} goodItem продукт, добавляемый в корзину
	 */
	addItem(goodItem){
		let buyItem = this.buyingItems(goodItem.id);
		if (buyItem === undefined) {
			buyItem = new BasketItem(
				id = goodItem.id,
				title = goodItem.title,
				price = goodItem.price,
				quantity = 1
			);
			this.buyingItems.set(buyItem.id, buyItem);
		} else {
			buyItem.quantity += 1;
		}
		console.log(buyItem);
	}
	/**
	 * Метод удаления продукта из корзины
	 * @param {int} goodID ключевой номер продукта
	 */
	deleteItem(goodID){
		console.log();
	}
	/**
	 * Метод получения количества всех продуктов в корзине
	 */
	getQuantity(){
		console.log();
	}
	/**
	 * Метод получения общей стоимости всех продуктов в корзине
	 */
	getTotalPrice(){
		console.log();
	}
	/**
	 * Метод отображения корзины на странице
	 */
	render(){
		console.log();
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
	renderItem(){
		console.log();
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
		console.log();
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
		console.log();
	}
	/**
	 * Метод получения ключевого номера продукта
	 */
	getItemID(){
		return this.getItemID;
	}
}

const products = new Products();
const basket = new Basket('basket-btn');