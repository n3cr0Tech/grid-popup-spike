import { getServerSession } from 'next-auth/next';
import Image from 'next/image'
import { options } from './api/auth/[...nextauth]/options';
import UserCard from './components/UserCard';
import UpcomingOrders from './components/UpcomingOrders';

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">         
        <h1>boop</h1>
        <UpcomingOrders></UpcomingOrders>
    </main>
  )
}
