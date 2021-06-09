import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './controllers';
import { errorHandler } from './middleware';

const port = process.env.PORT || 4040;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/', router);

app.use(function (req, res) {
  res.sendStatus(404)
})

app.use(errorHandler)

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});

export default app;