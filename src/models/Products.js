class Product{
    constructor(
        name,
        brand,
        price,
        type,
        picture
    ){
        this.name = name,
        this.brand = brand,
        this.price = price,
        this.type = type,
        this.picture = picture        
    }

    getName(){
        return this.name;
    }
    
    getBrand(){
        return this.brand;
    }

    getPrice(){
        return this.price;
    }

    getType(){
        return this.type;
    }

    getPicture(){
        return this.picture;
    }

}

module.exports = Product