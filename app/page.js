import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LandingPageComponents from "./(landingPage)/_components/LandingPageComponents";

export default async function Home() {

  return (
    <div>
       <LandingPageComponents />
    </div>
    
  );
}
