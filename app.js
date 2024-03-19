// const express = require('express');
// const app = express();
// const insectRoutes = require('./backend/routes/insects');
// //const insectRoutes = require('./backend/routes/insects');

// app.use(express.json());

// app.use('/insects', insectRoutes);

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });


const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const insectRoutes = require('./backend/routes/insects');

app.use(express.json());

// Use CORS middleware to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/insects', insectRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
