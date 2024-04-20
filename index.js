const express = require('express');
const puppeteer = require('puppeteer-core');
const users = require('./models/users')
const apiRoute = require('./router/api')
const api = express();
const path = require('path');
const port = 3333;
const {app,BrowserWindow } = require('electron')
const { Notification } = require('electron')

// craindo a rota api 
// usar pagina html com caminho da pastas paa acessar os arquivos path.join junta as partes de um caminho  v__dirname diretorio do projeto mais concatenado com a minha pasta public
api.use('/api', apiRoute)
// api.use(express.static(path.join(__dirname, "public")));
api.use('/api/puppeteer', apiRoute, async function logar() {
    let email = (users.users[0]);
    let senha = (users.users[1]);
    let url = (users.users[2]);
    let comentarios = (users.users[3]);
    let tempo = (users.users[4]);
    let pausa = (users.users[5]);
    let comentar = (users.users[6]);
    let arrayValid = [
                      {valor :email, campo:"Email" },
                      {valor:senha, campo:"senha"},
                      {valor:url, campo:"url"}, 
                      {valor:comentarios, campo:"comentarios"},
                      {valor:tempo, campo:"tempo"}, 
                      {valor:pausa, campo:"pausa"},
                      {valor:comentar, campo:"comentar"} 
    ];
    var valid = true

    function mostrarNotificacao (campo) {
      const notificacao = {
        title: `Campo ${campo}`,
        body: 'Não pode ser vazio'
      }
      new Notification(notificacao).show()
    }

    for(let i = 0 ; i < arrayValid.length; i++ ){

      if(arrayValid[i].valor === ""){
        valid = false
        mostrarNotificacao(arrayValid[i].campo) 
        return
      }
    }
    if(valid){
      const browser = await puppeteer.launch({
        defaultViewport: null,
        args : [
            '--window-size=300,500','--no-sandbox',
            '--disable-setuid-sandbox'
          ], 
        headless: false,
        slowMo: 380,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'          
      }); 

      const page = await browser.newPage();
      await page.goto('https://www.instagram.com/'); // vai para a pagina de login
      await page.waitForTimeout(4000)
  
      function segundos(valor) {
          let mile = 1000;
          let result = valor * mile;
          return Math.floor(Math.random() * 9000 + result);
      };
      
      function minutos(valor) {
          let mile = 1000 * 60;
          let result = valor * mile;
          return Math.floor(result);
      };
  
      const inputLogin = await page.$x("//input[@aria-label='Senha']");
      const inputSenha = await page.$x("//input[@aria-label='Telefone, nome de usuário ou email']")
      const botaoLogin = await page.$x("//div[contains(text(), 'Entrar')]");
      if (inputLogin.length > 0 && inputSenha.length > 0 && botaoLogin.length > 0) { 
          // Enviar uma mensagem na tela
          await page.evaluate(() => {
              // Cria um novo elemento div
              var divNova = document.createElement("div");
              // Cria um novo nó de texto
              var conteudoNovo = document.createTextNode('Foram Encotrados todos elementos pra prosseguir');
              // Adiciona o nó de texto à nova div criada
              divNova.appendChild(conteudoNovo);
              divNova.style.position = 'fixed';
              divNova.style.top = '10px';
              divNova.style.left = '10px';
              divNova.style.right = '10px';
              divNova.style.textAlign ='center'
              divNova.style.height ='500rem'
              divNova.style.backgroundColor = 'black';
              divNova.style.opacity = '0.6';
              divNova.style.color = 'white';
              divNova.style.fontSize = '2rem';
              divNova.style.fontWeight = '500';
              divNova.style.padding = '10px';
              divNova.style.border = '1px solid black';
              divNova.style.zIndex = '1000';
              // Adiciona o novo elemento criado e seu conteúdo ao DOM
              var divAtual = document.getElementById("teste");
              document.body.insertBefore(divNova, divAtual);
          });
  
          await page.evaluate(() => {
              setTimeout(() => {
                  let elementoParaRemover = document.getElementById('msg1');
                  if (elementoParaRemover) {
                      elementoParaRemover.parentNode.removeChild(elementoParaRemover);
                  }
              }, 20000);
          });
          await page.type('[name="username"] ', email);
          await page.type('[name="password"]', senha);
          await page.waitForTimeout(4000); //tempo para ir para o proximo comando
      }
    }

    // //clica no botão
    // await page.keyboard.press('Enter')
    // //await page.click('.sqdOP.L3NKy.y3zKF');
    // await page.waitForTimeout(4000);
    // //vai para a postagem especifica
    // await page.goto(url);
    // await page.waitForTimeout(3000);

    // async function comentario() {
    //     let x = 1
    //     for (x; x <= comentarios; x++) {
    //         // comenta o array selecionadp
    //         await page.click('._15y0l button')
    //         await page.waitForTimeout(2000);
    //         await page.type('.Ypffh', comentar[Math.floor(Math.random() * comentar.length)]); //sorteia o array random
    //         await page.waitForTimeout(2000);
    //         //clica no botão
    //         await page.keyboard.press('Enter')
    //         // await page.click('_15y0l')
    //         await page.waitForTimeout(1000)
    //         async function comentarioBloqueado(page, selector) {
    //             const bloqueio = await page.$(selector)
    //             if (bloqueio) {
    //                 console.log(email, 'comentario bloqueado', x)
    //                 await page.waitForTimeout(2000)
    //                 await page.click('.sqdOP.yWX7d._8A5w5.ZIAjV')
    //                 await page.waitForTimeout(minutos(pausa) * 20)
    //                 await page.goto(url);
    //                 await comentarioBloqueado(page, selector)
    //             } else {
    //                 // comenta o array selecionado
    //                 await page.waitForTimeout(segundos(tempo));
    //             }
    //         }
    //         await comentarioBloqueado(page, '.gxNyb')
    //     }
    //     console.log(email, x - 1)
    //     await page.waitForTimeout(minutos(pausa));
    // }
    // comentario();
    // setInterval(comentario, minutos(pausa) + (segundos(tempo) + 10000) * comentarios);
    // await page.waitForNavigation();
});

api.listen(process.env.PORT || port);

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.once('ready-to-show', () => {
    win.maximize()
})

  win.loadFile('./public/index.html')
}

app.whenReady().then(createWindow)


