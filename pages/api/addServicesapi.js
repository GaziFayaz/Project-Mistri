import dbConnect from "../../lib/mongo";
import ServicesSchema from "../../models/services";
import services from "../../models/services";

import { didToken } from "../loginWithEmail";

export default async function handler(req, res) {
  // const { method, cookies } = req;
  const { method } = req;

  // const token = cookies.token;

  dbConnect();

  // if (method === "GET") {
  //   try {
  //     const service = await ServicesSchema.find();
  //     res.status(200).json(service);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  if (method == "POST") {
    // if (!didToken) {
    //   return res.status(401).json("Not authenticated!");
    // }
    try {
      // const data = JSON.parse(req.body);
      // console.log(data);
      // console.log(data.services);
      const formData = await ServicesSchema.create(req.body);
      res.status(201).json(formData);
    } catch (error) {
      res.status(500).json(error);
      console.log("error", error);
    }
  }

  // if (req.method == "POST") {
  //   for (let i = 0; i < req.body.length; i++) {
  //     let s = new services({
  //       service: req.body[i].service,
  //     });
  //     await s.save();
  //   }
  //   res.status(200).json({ name: "success" });
  // } else {
  //   res.status(500).json({ error: "error" });
  // }
}
