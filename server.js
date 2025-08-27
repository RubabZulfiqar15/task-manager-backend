
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const taskRoutes = require("./routes/taskRoutes"); 
require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Status = ok!');
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  });
