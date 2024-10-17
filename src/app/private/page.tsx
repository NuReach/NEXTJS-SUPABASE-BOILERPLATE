import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const result = await supabase.from('Roles').select('*').eq('user_id',data?.user.id).single();

  if ( !result.data ) {
    redirect('/error')
  }

  return <p>Hello {JSON.stringify(result)}</p>

}