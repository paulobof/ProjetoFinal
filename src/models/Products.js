class Product{
    constructor(
        name,
        type,
        model,
        description,
        picture
    ){
        this.name = name,
        this.type = type,
        this.model = model,
        this.description = description,
        this.picture = picture        
    }

    getName(){
        return this.name;
    }

    getType(){
        return this.type;
    }

    getModel(){
        return this.model;
    }

    getDescription(){
        return this.description;
    }

    getPicture(){
        return this.picture;
    }

}

module.exports = Product