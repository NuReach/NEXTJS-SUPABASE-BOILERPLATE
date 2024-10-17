import React from 'react'
import { getAdmin } from '../login/action'
import { redirect } from 'next/navigation';

export default async function Dashboard() {

  const isAdmin = await getAdmin();
  
  if (!isAdmin) {
    redirect('/permission');
  }

  return (
    <div>Dashboard</div>
  )
}
