import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "stacy";

if (!uri) {
  console.error("Missing MONGODB_URI in environment.");
  process.exit(1);
}

const slides = [
  {
    title: "Sweet everyday dress",
    tag: "Dresses",
    image: "/img/657576098_1376495067834290_9163013850703279435_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Cute daily top",
    tag: "Tops",
    image: "/img/657948139_1376493581167772_4042167179065393927_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Easy wear bottoms",
    tag: "Pants",
    image: "/img/658125919_1376494814500982_8282276342450375921_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Layer-ready jacket",
    tag: "Jackets",
    image: "/img/658132576_1376495107834286_7444600315804004551_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Sulit bundle picks",
    tag: "Bundles",
    image: "/img/658830157_1376495631167567_5484416353753710479_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Fresh drop favorite",
    tag: "Featured",
    image: "/img/658964028_1376494084501055_3485864027219705420_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "Prettiest neutral set",
    tag: "Trending",
    image: "/img/659250304_1376495377834259_8687871249592187237_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
  {
    title: "New arrival steal",
    tag: "New Drop",
    image: "/img/661444226_1376494911167639_5021627411567300326_n.jpg",
    url: "https://www.facebook.com/stacythrifts",
  },
];

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(dbName).collection("owner_posts");
    const now = new Date();
    const documents = slides.map((slide, index) => ({
      _id: new ObjectId(),
      title: slide.title,
      tag: slide.tag,
      image: slide.image,
      url: slide.url,
      createdAt: new Date(now.getTime() - index),
      updatedAt: now,
    }));

    await collection.deleteMany({});
    await collection.insertMany(documents);

    console.log(`Seeded ${documents.length} owner posts into "${dbName}".`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Failed to seed owner posts.");
  console.error(error);
  process.exit(1);
});
