import express from "express"
import cors from "cors"
import "dotenv/config"
import apiAlertsRouter from "./routes/apiAlertsRouter.js"
// import apiAuthRouter from "./routes/apiAuthRouter.js"
import { errorHandler } from "./middleware/errorHandler.js"

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/alerts", apiAlertsRouter)
// app.use("/api/auth", apiAuthRouter)
app.use(errorHandler)

app.get('/health', (req, res) => {
  res.send('Server is working');
});


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})