const socketConnect = async ()=> {
    return new Promise( (resolve, reject)=>{
       try {
            const socket = new WebSocket("ws://192.168.1.2:81");
            socket.onopen = ()=>{
                resolve(socket);
            }
       } catch (err) {
            reject(err);
       }
    })
    
}

export default socketConnect