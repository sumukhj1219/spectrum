import JoinHandler from "@/components/ui/JoinHandler";
import { auth } from "../auth";
import Landing from "./(landingPage)/Landing/page";
import CreateRoom from "@/components/ui/CreateRoom";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();

  if (!session) return redirect('/Landing');

  return (
    <div>
        <JoinHandler />
        <CreateRoom />
    </div>
    
  );
}
