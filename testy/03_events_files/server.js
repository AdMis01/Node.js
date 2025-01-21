let fs = require('fs');
let rs = fs.createReadStream("./demo.txt");

rs.on('open',function(test){
    console.log("otwarty");
    console.log(test);
});
let ds = '';
rs.on('data',function(chuk){
    console.log(chuk);
    ds += chuk;
});
rs.on("end",()=>{

    console.log(ds);
})

let events = require('events');
let eventEmitter = new events.EventEmitter();

eventEmitter.on("scream", ()=>{
    console.log('krzyk');
});

eventEmitter.emit('scream');// ma piorytet