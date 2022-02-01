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
        return newItem
    }

    viewAll() {
        return this.items;
    }
}

module.exports = new Products()