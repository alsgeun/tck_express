import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3020;

app.use(cookieParser());
app.use('/')

app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});