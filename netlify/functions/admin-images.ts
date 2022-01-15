import { Handler, HandlerEvent } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import {
  FOLDERS,
  getAllS3Files,
  deleteObjectFromS3,
} from "../shared/s3-client";

const ALLOWED_METHODS = ["GET", "DELETE"];

async function get() {
  try {
    const params = {
      Bucket: process.env.VITE_S3_OUR_HUT_BUCKET,
      Prefix: FOLDERS.IMAGES,
    };

    const listObjects = await getAllS3Files(params);

    const imagesUrls = listObjects.Contents.map((file) => {
      return `https://${process.env.VITE_S3_OUR_HUT_BUCKET}.s3.amazonaws.com/${file.Key}`;
    });

    return jsonResponse({
      status: 200,
      body: { images: imagesUrls },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching imagsd, please try again later on.",
      },
    });
  }
}

async function deleteImage(event: HandlerEvent) {
  try {
    const { name } = event.queryStringParameters;

    const params = {
      Bucket: process.env.VITE_S3_OUR_HUT_BUCKET,
      Key: `${FOLDERS.IMAGES}/${name}`,
    };

    await deleteObjectFromS3(params);

    return jsonResponse({
      status: 200,
      body: { message: "Image successfully deleted!" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching imagsd, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext;

  if (!user) {
    return jsonResponse({
      status: 403,
      body: { message: "Only authorized users can perform this request" },
    });
  }

  if (!ALLOWED_METHODS.includes(event.httpMethod)) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  if (event.httpMethod === "GET") {
    return get();
  }

  if (event.httpMethod === "DELETE") {
    return deleteImage(event);
  }
};

export { handler };
