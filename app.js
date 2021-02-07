const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nunjucks = require("nunjucks")
const db = require("./app/models");
const indexRouter = require("./app/routes/index.routes");
const postRouter = require("./app/routes/post.routes");


const app = express();
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

let corsOptions = {
    origin: "http://localhost:8080"
};

app.set('view engine', 'html');
nunjucks.configure('app/views', {
    express: app,
    watch: true,
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.use('/', indexRouter);
app.use('/post', postRouter);


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});