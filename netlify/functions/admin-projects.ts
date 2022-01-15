import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient } from "mongodb";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

let projectSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.object().required(),
  year: yup.number().required().positive().integer(),
  company: yup.string(),
  technologies: yup.array().of(yup.string()).required(),
  links: yup.object().shape({
    github: yup.string().url(),
    website: yup.string().url(),
  }),
});

type Project = {
  title: string;
  year: number;
  description: string;
  technologies: string[];
  company?: string;
  links: {
    github?: string;
    website?: string;
  };
};

const ALLOWED_METHODS = ["GET", "POST"];

async function get(client: MongoClient) {
  try {
    const projects = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("projects")
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { projects },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching projects, please try again later on.",
      },
    });
  }
}

async function post(client: MongoClient, event: HandlerEvent) {
  try {
    const { project } = JSON.parse(event.body);

    let projectDocument;

    try {
      projectDocument = await projectSchema.validate(project);
    } catch (error) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "Validation Error",
            error: error.message,
          },
        },
      });
    }

    await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("projects")
      .insertOne(projectDocument);

    return jsonResponse({
      status: 200,
      body: { message: "Project successfully inserted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error creating your project, please try again later on.",
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

  let client;

  try {
    client = await connect();
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error connecting to the database, please try again later on.",
      },
    });
  }

  if (event.httpMethod === "GET") {
    return get(client);
  }

  if (event.httpMethod === "POST") {
    return post(client, event);
  }
};

export { handler };
