const express = require('express');
const cors = require('cors');
const useRouter = require('./routes/routes');

const app = express();
const port = 3001;

require('./config/database');

app.use(express.json());
app.use(cors());
app.use('/todos', useRouter);
app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is started at PORT number: ${port}...`);
});
