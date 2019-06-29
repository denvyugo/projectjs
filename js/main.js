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
                <button class="buy-btn">Купить</button>
            </div>`;
	}
}

class Products {
	constructor(container='.products'){
		this.container = container;
		this.productItems = [];
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
		this.productItems = data.map(item => this._makeProductItem(item.id, item.title, item.price, item.img));
	}
	
	_makeProductItem(id, title, price, img){
		let productItem = new ProductItem(id, title, price, img);
		return productItem;
	}
	
	_renderProducts(){
		const block = document.querySelector(this.container);
		for (let item of this.productItems){
			block.insertAdjacentHTML('beforeend', item.renderProduct());
		}
	}
}

class Basket{
	constructor(){
		this.productItems = []; //список продуктов в корзине
		this.totalItems = 0;	//всего продуктов в корзине
		this.totalPrice = 0.0;	//стоимость всех продуктов в корзине
	}
	/**
	 * Метод добавления продукта в корзину
	 * @param {ProductItem} goodItem продукт, добавляемый в корзину
	 */
	addItem(goodItem){
		console.log();
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