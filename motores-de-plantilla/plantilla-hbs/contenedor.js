class Products {

    constructor() {
        this.items = []
    }

    addProduct(product) {
        const newItem = {
            id: this.items.length + 1,
            ...product
        }
        this.items.push(newItem)
        console.log(this.items);
        return newItem
    }

    viewAll() {
        return this.items;
    }

}

module.exports = new Products()