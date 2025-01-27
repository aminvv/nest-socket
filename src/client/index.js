const socket=io("http://localhost:3000")

socket.on("connect",()=>{
  console.log("connected");
  
})
socket.on("client-chat",(data)=>{
  console.log("client data",data);
  
})
socket.on("exception",(data)=>{
  console.log(data);
  
})

const username=prompt("enter username","amin")
const roomName=prompt("enter room name","nodejs")
const msgInput=document.querySelector("#msg-input")
const sendBtn=document.querySelector("#send-btn")
const usernameTag=document.querySelector("#username")

sendBtn.addEventListener("click",()=>{
  usernameTag.innerHTML=username
  const message=msgInput.value
  if(roomName && username){
    socket.emit("join-room",{
      roomName,
      user:{
        username,
        socketId:socket.id
      }
    })

    socket.emit("server-chat",{
      message,
      user: {
        username,
        socketId:socket.id
      },
      time: new Date().toString(),
      roomName,
    })

  }else{
    alert(" please enter the data")
  }
})