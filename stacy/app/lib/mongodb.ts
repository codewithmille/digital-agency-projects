import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not set. Stacy will use fallback slideshow data.");
}

type GlobalMongo = typeof globalThis & {
  _stacyMongoClientPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as GlobalMongo;

export function isMongoConfigured() {
  return Boolean(uri);
}

export async function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalMongo._stacyMongoClientPromise) {
    const client = new MongoClient(uri);
    globalMongo._stacyMongoClientPromise = client.connect();
  }

  return globalMongo._stacyMongoClientPromise;
}

export async function getMongoDatabase() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "stacy");
}
