import AWS, { S3 } from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export function getS3Client() {
  const s3Client = new AWS.S3();
  return s3Client;
}

export async function getAllS3Files(params): Promise<S3.ListObjectsV2Output> {
  return new Promise((resolve, reject) => {
    const s3 = getS3Client();

    s3.listObjectsV2(params, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data as S3.ListObjectsV2Output);
    });
  });
}

export async function deleteObjectFromS3(params) {
  return new Promise((resolve, reject) => {
    const s3 = getS3Client();

    s3.deleteObject(params, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

export enum FOLDERS {
  IMAGES = "images",
  FILES = "files",
  PARTNERS_LOGOS = "partner",
}
