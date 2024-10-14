import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/router.js"
import { ShowsRepository } from "./shows/shows.repository.js";

const app = express();
const PORT = 3020;

const showsRepository = new ShowsRepository()

app.use(express.json())
app.use(cookieParser());
app.use('/', router)

setInterval(() => {
    showsRepository.updateShowStatus().catch(err => console.error('Error updating show status', err))
}, 24 * 60 * 60 * 1000) // 정식 서비스가 아니기 때문에 24시간 간격으로 실행

app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});