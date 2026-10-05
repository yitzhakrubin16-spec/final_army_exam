import express from "express"
import cors from "cors"
import "dotenv/config"

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send('Server is working');
});


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})