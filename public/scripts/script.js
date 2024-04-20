let comentar = []
const {app,BrowserWindow } = require('electron')
const { Notification } = require('electron')
let valid = true
function adicionar(){
    let comentario = document.getElementById('userComentar').value;
    comentar.push(comentario)
    document.getElementById("res").innerHTML = `${comentar}  `;
    document.getElementById('userComentar').value = ""; 
}

function mostrarNotificacao (campo) {
    const notificacao = {
      title: `Campo ${campo}`,
      body: 'Conteúdo da Notificação'
    }
    new Notification(notificacao).show()
  }

function excluir(){
    comentar.pop()
    document.getElementById("res").innerHTML = `${comentar}  `;
}



function newUser() {
    let email = document.getElementById('userEmail').value;
    let senha = document.getElementById('userSenha').value;
    let url = document.getElementById('userUrl').value;
    let comentarios = document.getElementById('userPausa').value;
    let tempo = document.getElementById('userTempo').value;
    let pausa = document.getElementById('userPausaComent').value;
    let user = { email, senha, url, comentarios, tempo, pausa,comentar };
    // let arrayValid = [ email, senha, url, comentarios, tempo, pausa,comentar ];
   
    // for(let i = 0 ; i < arrayValid.length; i++ ){
    //     if(arrayValid[i] === ""){
    //     valid = false
    //     mostrarNotificacao(arrayValid[i])
    //     }
    // }

    // if(valid){
        const options = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(user)
        }
        fetch("http://localhost:3333/api/new", options).then(res => {
            console.log(JSON.stringify(res));
        });
        fetch("http://localhost:3333/api/puppeteer", options).then(res => {
        console.log(JSON.stringify(res));
        });

    // }
    
       
}

