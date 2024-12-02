import { auth } from "@/auth";

export const runtime = "nodejs";
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
