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

let slot,zone;

function makecaranimation(loc,area){
    let car_animation=document.createElement('style');
    let movement=document.createTextNode(`@keyframes comecar{
        0%{left: 100vw;transform: rotate(90deg);margin-top: 23.5%;}
        70%{left: ${locations[loc].left};transform: rotate(90deg);}
        80%{transform: rotate(${locations[loc].angle});margin-top: 23.5%;}
    }`);
    car_animation.appendChild(movement);


    let movement2=document.createTextNode(`@keyframes car-exit{
        80%{transform: rotate(${locations[loc].angle});margin-top: 23.5%;}
        70%{left: ${locations[loc].left};transform: rotate(90deg);}
         0%{left: 100vw;transform: rotate(90deg);margin-top: 23.5%;}
    }`);

    car_animation.appendChild(movement2);

    document.getElementById(area).appendChild(car_animation)
}


function carexit(){
    // makecaranimation(slot,parkarea)
    // img.style.animation='car-exit 2s'
    // setTimeout(function(){img.remove()}, 2000)
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
        
        const socket=  await socketConnect();
        socket.onmessage = (event)=>{
            updateslots(event.data)
            console.log(event.data)

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
    document.getElementById(slotid).style.backgroundColor="red";
    managecar(slot,zone,slotid)
    // targetparklocation.style.animation = 'comecar 2s';
    // document.getElementsByClassName('carup').style.animation='comecar 2s'
}



function updateslots(rcvddata) {
    console.log(rcvddata[0])
    for(let i=0;i<20;i++){
        zone=(i<10)?'j':'c';
        slot=i+1;
        if(zone=='c') slot=slot-10;
        let slotid='but'+zone+slot
        if(rcvddata[i]=='g') document.getElementById(slotid).style.backgroundColor="green";
        else document.getElementById(slotid).style.backgroundColor="red";
    }
}
 
var w,h;
var slotwidth,slotheight;
var parkareawidth,parkareaheight;
var topdist,leftdist;
var locx,locy;

function managecar(slot,zone,slotid){
    
    let parkarea=(zone=='j')?'park1':'park2'
    makecaranimation(slot,parkarea)
    carexit();

    console.log(parkarea)
    // parkareawidth=document.getElementById(parkarea).offsetWidth
    // parkareaheight=document.getElementById(parkarea).offsetHeight
    // slotwidth=document.getElementById(slotid).offsetWidth
    // slotheight=document.getElementById(slotid).offsetHeight
    // topdist=document.getElementById(slotid).offsetTop
    // leftdist=document.getElementById(slotid).offsetLeft
    // locx=leftdist-20
    // locy=topdist-600
    // console.log(parkareawidth+","+parkareawidth+","+slotwidth+","+slotheight+","+topdist+","+leftdist)
    // console.log(locx,locy)
    let targetparklocation=document.getElementById(parkarea)
    console.log(targetparklocation)
    let img = document.createElement('img')
    img.src='car2.png'
    img.className='carup'
    img.id=parkarea+'car'+slot
    img.style.width='15vw'
    img.style.height='15vw'
    //img.style.animation='comecar 3s'
    img.style.left=locations[slot].left
    img.style.marginTop=locations[slot].margintop
    // img.style.left=`${locx}px`
    // img.style.marginTop=`${locy}px`
    img.style.transform = `rotate(${locations[slot].angle})`;
    targetparklocation.prepend(img)
    

    //    img.style.animation='comecar 2s';
       

        // img.style.animation='car-exit 2s';
    
   

    




}
window.managepark = managepark



