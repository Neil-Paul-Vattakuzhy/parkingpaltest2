
const locations={
    1 : {left : '4vw',margintop : '7%',angle : '180deg'},
    2 : {left : '23vw',margintop : '7%',angle : '180deg'},
    3 : {left : '42vw',margintop : '7%',angle : '180deg'},
    4 : {left : '61vw',margintop : '7%',angle : '180deg'},
    5 : {left : '80vw',margintop : '7%',angle : '180deg'},
    6 : {left : '4vw',margintop : '40%',angle : '0deg'},
    7 : {left : '23vw',margintop : '40%',angle : '0deg'},
    8 : {left : '42vw',margintop : '40%',angle : '0deg'},
    9 : {left : '61vw',margintop : '40%',angle : '0deg'},
    10 : {left : '80vw',margintop : '40%',angle : '0deg'}
}

try {
    const socket = new WebSocket("ws://192.168.1.2:81");
    socket.onopen = () => {
        console.log("WebSocket connection established");
        
    };
    socket.onclose = () => {
        console.log("WebSocket connection closed");
    };
    socket.onmessage = (event) => {
        console.log(event.data);
        updateslots(event.data)
    };
    function managepark(slot,zone){
        slotst=(slot!=10)?"0":""
        slotst=slotst+slot
        park=""+zone+slotst
        console.log(park)
        socket.send(park)
        slotid="but"+zone+slot
        console.log(slotid)
        document.getElementById(slotid).style.backgroundColor="red"
        managecar(slot,zone)
    }
    
} 
catch(err) {
        console.log('Socket Error');
}



document.getElementById("send").addEventListener("click", () => {
  socket.send(document.getElementById("message").value);
  console.log("message sent");
});

function updateslots(rcvddata) {
    console.log(rcvddata[0])
    for(i=0;i<20;i++){
        zone=(i<10)?'j':'c';
        slot=i+1;
        if(zone=='c') slot=slot-10;
        slotid='but'+zone+slot
        if(rcvddata[i]=='g') document.getElementById(slotid).style.backgroundColor="green";
        else document.getElementById(slotid).style.backgroundColor="red";
    }
}
 
function managecar(slot,zone){
    parkarea=(zone=='j')?'park1':'park2'
    console.log(parkarea)
    let targetparklocation=document.getElementById(parkarea)
    console.log(targetparklocation)
    let img = document.createElement('img')
    img.src='car2.png'
    img.className='carup'
    img.id=parkarea+'car'+slot
    img.style.width='15vw'
    img.style.height='15vw'
    img.style.left=locations[slot].left
    img.style.marginTop=locations[slot].margintop
    img.style.transform.rotate=locations[slot].angle
    targetparklocation.prepend(img)
}


