const { app,BrowserWindow ,Menu ,ipcMain,shell } =require('electron');
const path =require('path');
const os = require('os');
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const slash = require('slash')
const log = require('electron-log')

// Set env
process.env.NODE_ENV='production'

const isDev=process.env.NODE_ENV !=='production' ? true : false
const isWindows=process.platform === 'win32' ? true : false

let mainWindow;
let aboutWindow;

function createMainWindow(){
    mainWindow=new BrowserWindow({
        title:'ImageShrink',
        width:isDev ? 800 : 500,
        height:600,
        resizable:isDev ? true : false,
        backgroundColor:'white',
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
        },
    })

    if(isDev){
        mainWindow.webContents.openDevTools()
    }

   mainWindow.loadFile('./app/index.html')
}

function createAboutWindow(){
    aboutWindow=new BrowserWindow({
        title:'AboutImageShrink',
        width:300,
        height:300,
        resizable:false,
        backgroundColor:'white',
    })

   aboutWindow.loadFile('./app/about.html')
}


app.on('ready',()=>{
    createMainWindow()

    const mainMenu=Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

   
    mainWindow.on('ready',()=>mainWindow=null)
});

const menu=[
    ...(isWindows ? [{
        label:app.name,
        submenu:[
            {
                label:'About',
                click:createAboutWindow,
            },
        ],
    },] : []),
    { 
        role: 'fileMenu',
    },
    ...(isDev ? [
        {
            label:'Developer',
            submenu:[
                {role:'reload'},
                {role:'forcereload'},
                {role:'separator'},
                {role:'toggledevtools'},

            ]
        }
    ]:[])
]

ipcMain.on('image:minimize',(e,options)=>{
    console.log(options);
   options.dest=path.join(os.homedir(),'imageshrink')
   shrinkImage(options)
})

async function shrinkImage({imgPath,quality,dest}){
    try {
        const pngQuality=quality/100

        const files=await imagemin([slash(imgPath)],{
            destination:dest,
            plugins:[
                imageminMozjpeg({quality}),
                imageminPngquant({
                    quality:[pngQuality,pngQuality]
                }),
            ],
        })

        log.info(files)

        shell.openPath(dest)

        mainWindow.webContents.send('image:done')
    } catch (error) {
        log.error(err)
    }
}

app.allowRendererProcessReuse=true