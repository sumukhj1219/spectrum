import JoinHandler from "@/components/ui/JoinHandler";
import { auth } from "../auth";
import Landing from "./(landingPage)/Landing/page";
import CreateRoom from "@/components/ui/CreateRoom";


export default async function Home() {
  const session = await auth();

  if (!session) return <Landing />;

  return (
    <div>
        <JoinHandler />
        <CreateRoom />
    </div>
    
  );
}
