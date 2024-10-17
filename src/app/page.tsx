import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getAdmin } from "./login/action";
import { redirect } from "next/navigation";

export async function logout() {
  "use server"
  const supabase = createClient();
  await supabase.auth.signOut();
}

export default async function Home() {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser();

  const isAdmin = await getAdmin();

  if (!isAdmin) {
    redirect('/permission');
  }

  return (
    <div className="flex justify-center items-center p-9">
        <div className="flex justify-between items-center w-full">
          {
            data.user ?  <p className="font-bold text-xl">{data.user.email}</p>  :
            <p className="font-bold text-xl">User</p>
          }
          <div className="flex space-x-3">
            {
              data.user ?
              <form action={logout} >
                <Button>Logout</Button>   
              </form>:
              <Button>
                  <Link href="/login">Login</Link>
              </Button>  
            }
            {
              isAdmin && <Button><Link href={'/dashboard'}>Dashboard</Link></Button>
            }
          </div>
          
        </div>
    </div>
  );
}