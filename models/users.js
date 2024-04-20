module.exports = {



    users: [


    ], getAll(){
        return this.users
    },
    newUser(email, senha, url, comentarios, tempo, pausa, comentar) {
        this.users = [];
        this.users.push(email);
        this.users.push(senha);
        this.users.push(url);
        this.users.push(comentarios);
        this.users.push(tempo);
        this.users.push(pausa);
        this.users.push(comentar);
    }
}