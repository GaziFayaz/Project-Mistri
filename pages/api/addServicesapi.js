import dbConnect from "../../lib/mongo";
import services from "../../models/services";
import { didToken } from "../loginWithEmail";

export default async function handler(req, res) {
  // const { method, cookies } = req;
  const { method } = req;

  // const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const service = await services.find();
      res.status(200).json(service);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if (!didToken) {
    //   return res.status(401).json("Not authenticated!");
    // }
    try {
      const service = await services.create(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
