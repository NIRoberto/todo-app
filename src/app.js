import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import WrestleRouter from './routes/wrestles.js';

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true, }))



app.get('/',  (req, res) => {
     res.status(200).json({
     message: "Welcome to todo app backend"
    });
});
app.use("/api/v1/todo/", userRouter);
app.use("/api/v1/todo/", WrestleRouter);



app.use((req, res) => {
    res.status(404).json({
        Error: "invalid url"
    })

})
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`app is listen to port ${port}`);
})
