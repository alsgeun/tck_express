import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import multer from "multer"
import { tmpdir } from "os"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config();

const s3 = new S3Client({   // S3Client 객체를 생성하고 S3에 접근하는데 사용
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  },
})

// 멀터 미들웨어를 설정하고 파일을 디렉토리에 저장
const multerUpload = multer({
  dest: tmpdir() // tmpdir() : 운영 체제의 임시 디렉토리 경로 반환
})

const upload = async (req, res, next) => {
    multerUpload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(500).json({ message: error.message })
        }

        if (req.file) {
            const fileStream = fs.createReadStream(req.file.path) // 파일의 성공적인 처리시, 파일을 읽는 스트림 생성

            const uploader = new Upload({   // 파일을 S3에 업로드
            client: s3,
            params: {
            Bucket: process.env.BUCKET_NAME,
            Key: req.file.originalname,
            Body: fileStream,
            ContentType: req.file.mimetype,
            }
            })
            try {
                await uploader.done()
                next()
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        } else {
            next()  
        }
    })  
}

export { upload }