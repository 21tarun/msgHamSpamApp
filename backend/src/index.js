const express= require('express')
const { exec } = require('child_process');
const cors=require('cors')



let runPythonCode = async (text) => {
    
    return new Promise(async function (resolve, reject) {
        exec(`python  ../main.py "${text}"`, (err, stdout, stderr) => {
        
            if (err) {
              console.error(`exec error: ${err}`);
              return reject({ "error": err })
            }

            
            list=stdout.split("\r\n")
            return resolve(list)
            // console.error(`stderr: ${stderr}`);
    
    
        });




    })
}





const app =express()

app.use(express.json())

app.use(cors())

app.post('/ml',async function(req,res){
    let text = req.body.text
    console.log(text)
    let data= await runPythonCode(text)

    console.log("data",data)
    res.send({status:true, message:"success", data:data})
})




app.listen(4000,function(){
    console.log("server is running on 4000")
})