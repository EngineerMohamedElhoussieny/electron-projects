const path=require('path')
const osu=require('node-os-utils')
const cpu=osu.cpu
const mem=osu.mem
const os=osu.os


//Run every 2 second
setInterval(()=>{
    //cpu
    cpu.usage().then((info)=>{
        document.getElementById('cpu-usage').innerText=info+'%'
    })

    //CPU Free
    cpu.free().then(info=>{
        document.getElementById('cpu-free').innerText=info+'%'
    })

    //Update Time
    document.getElementById('sys-update').innerText=secondsToDhms(os.uptime())
},2000)

//set model
document.getElementById('cpu-model').innerText=cpu.model()

// get computer name
document.getElementById('comp-name').innerText=os.hostname() 

//os
document.getElementById('os').innerText=`${os.type()} ${os.arch()}`

// Total mem
mem.info().then(info=>{
    document.getElementById('mem-total').innerText=info.totalMemMb
})

//show days , hours , mins , sec
function secondsToDhms(seconds){
    seconds= +seconds
    const d= Math.floor(seconds / (3600*24))
    const h=Math.floor((seconds % (3600 *24)) / 3600)
    const m=Math.floor((seconds % 3600) / 60)
    const s=Math.floor(seconds % 60)
    return `${d}d, ${h}h, ${m}m, ${s}s`
}