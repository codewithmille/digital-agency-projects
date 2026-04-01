import { ObjectId } from "mongodb";
import { del } from "@vercel/blob";
import { getBlobReadWriteToken } from "@/app/lib/env";
import { getMongoDatabase, isMongoConfigured } from "@/app/lib/mongodb";
import type { SlideItem } from "@/app/lib/site-content";

type OwnerPostDocument = {
  _id: ObjectId;
  title: string;
  tag: string;
  image: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
};

let hasLoggedMongoWarning = false;

function getCollection() {
  return getMongoDatabase().then((database) =>
    database.collection<OwnerPostDocument>("owner_posts"),
  );
}

function normalizeSlide(slide: SlideItem): Omit<SlideItem, "id"> {
  return {
    title: slide.title.trim(),
    tag: slide.tag.trim(),
    image: slide.image.trim(),
    url: slide.url?.trim() || "",
  };
}

function toSlideItem(document: OwnerPostDocument): SlideItem {
  return {
    id: document._id.toHexString(),
    title: document.title,
    tag: document.tag,
    image: document.image,
    url: document.url || "",
  };
}

function isVercelBlobUrl(url: string) {
  return url.includes(".blob.vercel-storage.com");
}

export async function listOwnerPosts() {
  if (!isMongoConfigured()) {
    return [];
  }

  try {
    const collection = await getCollection();
    const documents = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return documents.map(toSlideItem);
  } catch (error) {
    if (!hasLoggedMongoWarning) {
      hasLoggedMongoWarning = true;
      console.warn("Could not load owner posts from MongoDB.", error);
    }
    return [];
  }
}

export async function replaceOwnerPosts(slides: SlideItem[]) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured.");
  }

  const normalizedSlides = slides
    .map(normalizeSlide)
    .filter((slide) => slide.title || slide.tag || slide.image);
  const collection = await getCollection();
  const existing = await collection.find({}).toArray();
  const incomingIds = new Set(
    slides.map((slide) => slide.id).filter((value): value is string => Boolean(value)),
  );
  const removedImages = existing
    .filter((document) => !incomingIds.has(document._id.toHexString()))
    .map((document) => document.image)
    .filter((image) => isVercelBlobUrl(image));

  await collection.deleteMany({});

  if (normalizedSlides.length > 0) {
    const now = new Date();
    const documents: OwnerPostDocument[] = normalizedSlides.map((slide, index) => ({
        _id: new ObjectId(),
        title: slide.title || `Owner post ${normalizedSlides.length - index}`,
        tag: slide.tag || "New post",
        image: slide.image,
        url: slide.url,
        createdAt: new Date(now.getTime() - index),
        updatedAt: now,
      }));

    await collection.insertMany(
      documents,
    );
  }

  const blobToken = getBlobReadWriteToken();

  if (removedImages.length > 0 && blobToken) {
    await del(removedImages, { token: blobToken });
  }

  return listOwnerPosts();
}
