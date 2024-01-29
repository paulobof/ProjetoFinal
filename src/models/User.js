class User{

    constructor(
        user,
        email,
        password
    ){
        this.user = user,
        this.email = email,
        this.password = password        
    }

    getUser(){
        return this.user;
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

}

module.exports = User