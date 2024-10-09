import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/router.js"

const app = express();
const PORT = 3020;

app.use(cookieParser());
app.use('/', router)

app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});