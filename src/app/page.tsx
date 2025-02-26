import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getAdmin } from "./login/action";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";


export default async function Home() {


  return (
    <div className="">
        <Navbar />
    </div>
  );
}