const socket=io();
socket.on('connection',()=>{
    console.log("estas conectado")
})
let prod=[];
let chat=[];
socket.on('products',(data)=>{
    console.log(data)
    prod=data;
    let htmlToRender = '';
    for(let i =0;i<prod.length;i ++){
        htmlToRender = htmlToRender + `
        <tr>
        <td><h1>${prod[i].title}</h1></td>
        <td><h1>${prod[i].price}</h1></td>
        <td><img src="${prod[i].thumbnail}" class="product-img" style="width:60px ;height:60px"></td>
        </tr>
        `
    }
    document.querySelector('#products').innerHTML =htmlToRender;
})
socket.on('chat',(data)=>{
    console.log(data)
    chat=data;
    let htmlToRender = '';
    for(let i =0;i<chat.length;i ++){
        htmlToRender = htmlToRender + `
        <tr>
        <td><p>${chat[i].email}</p></td>
        <td><p>${chat[i].message}</p></td>
        <td><p>${chat[i].date}</p></td>
        </tr>
        `
    }
    document.querySelector('#message').innerHTML =htmlToRender;
    
})
// socket.on('chat', (data)=>{
//     let htmlReduce = data.reduce((previewHtml, CurrentHtml)=>previewHtml + `
//     <tr>
//     <td> <h1>${CurrentHtml.email}</h1> </td>
//     <td> <h1>${CurrentHtml.message}</h1> </td>
//     <td> <h1>${CurrentHtml.date}</h1> </td>
//     </tr>
//     `, ``
//     )
//     document.querySelector('#message').innerHTML = htmlReduce;

//     console.log(data)

// }
// )

function addMessage(addMessage){
    let messageToAdd={
        email:addMessage.email.value,
        message:addMessage.message .value,
        date : new Date().toLocaleDateString(),
    }
    socket.emit('addMessage',messageToAdd)    
}
function addProduct(addProduct){
    let productToAdd={
        title:addProduct.title.value,
        price:addProduct.price.value,
        thumbnail:addProduct.thumbnail.value,  
    }
    socket.emit('addProduct',productToAdd)
}