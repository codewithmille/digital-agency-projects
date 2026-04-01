import HomeClient from "./home-client";
import { listOwnerPosts } from "@/app/lib/owner-posts";

export default async function Page() {
  const initialSlides = await listOwnerPosts();

  return <HomeClient initialSlides={initialSlides} />;
}
