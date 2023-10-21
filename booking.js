import  socketConnect  from "./connection.js";
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


async function sendDataToIoT(data){
    try {
        const socket = await socketConnect();
        socket.send(data);
    } catch (err) {
        console.log(err);
    }
}

async function handleData(){
    try{
        console.log('running')
        const socket=  await socketConnect();
        socket.onmessage = (event)=>{
            updateslots(event.data)

        }
    } catch (err){
        console.log(err)
    }
}

setTimeout(handleData,1000)

function managepark(slot,zone){
    let slotst=(slot!=10)?"0":""
    slotst=slotst+slot
    let park=""+zone+slotst
    console.log(park)
    sendDataToIoT(park)
    let slotid="but"+zone+slot
    console.log(slotid)
    document.getElementById(slotid).style.backgroundColor="red"
    managecar(slot,zone)
}



function updateslots(rcvddata) {
    console.log(rcvddata[0])
    for(let i=0;i<20;i++){
        let zone=(i<10)?'j':'c';
        let slot=i+1;
        if(zone=='c') slot=slot-10;
        let slotid='but'+zone+slot
        if(rcvddata[i]=='g') document.getElementById(slotid).style.backgroundColor="green";
        else document.getElementById(slotid).style.backgroundColor="red";
    }
}
 
function managecar(slot,zone){
    let parkarea=(zone=='j')?'park1':'park2'
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
    img.style.transform = `rotate(${locations[slot].angle})`;
    targetparklocation.prepend(img)
}
window.managepark = managepark
