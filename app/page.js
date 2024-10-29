import { auth } from "../auth";
import Landing from "./(landingPage)/Landing/page";

export default async function Home() {
  const session = await auth();

  if (!session) return <Landing />;

  return (
    <div>
    </div>
  );
}
