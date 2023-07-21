import { MongoClient } from "mongodb";
import clientPromise from "@/src/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    const orders = await db.collection("orders").find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
}
