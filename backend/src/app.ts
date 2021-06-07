import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './controllers';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/', router);

app.use(function (req, res) {
  res.status(404).send("adasdasda")
})

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});

export default app;