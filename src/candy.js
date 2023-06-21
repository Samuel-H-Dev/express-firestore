import { db } from "./connectdb.js"


export async function getCandy(req, res){
    const candy = await db.collection('candy').get()
        .catch(err => {
            return res.status(500).send({success: false, message: err})
        })    
    //now lets clean up candy 
    const candyArray = candy.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    res.send(candyArray)
}

export async function addNewCandy (req, res){
    const newCandy = req.body
    await db.collection('candy').add(newCandy)
        .catch(err => {
            return res.status(500).send({sucess: false, message: err})
        })
        getCandy(req,res);
}