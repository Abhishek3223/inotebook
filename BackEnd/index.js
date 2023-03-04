import conectToMongo from "./db.js"
import  Express  from "express"

conectToMongo();

const app = Express()
const  port = 3000

// availabe rotes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



