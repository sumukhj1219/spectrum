import { auth } from "../auth";
import Landing from "./(landingPage)/Landing/page";

export default async function Home() {
  const session = await auth();

  if (!session) return <Landing />;

  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
      <h1>Welcome, {session.user.name}!</h1>
    </div>
  );
}
