import express from 'express';
import cors from 'cors';
import multer from 'multer';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();

// Or wont send any data to our db
app.use(express.json());

// middleware
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
  //store destination/ location
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  },
  //name of the file
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// const upload = multer({ dest: "upload/" });

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(8800, () => {
  console.log('connnect to backend ');
});
