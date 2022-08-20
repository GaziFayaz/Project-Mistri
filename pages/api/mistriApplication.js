import dbConnect from "../../lib/mongo";
import MistriApplicationSchema from "../../models/mistriApplicationSchema";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method == "POST") {
    try {
      // const data = JSON.parse(req.body);
      const formData = await MistriApplicationSchema.create(req.body);
      res.status(201).json(formData);
    } catch (error) {
      res.status(500).json(error);
      console.log("error", error);
    }
  }
}
