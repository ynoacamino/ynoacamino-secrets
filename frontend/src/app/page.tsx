import { SECRET_KEY } from '@/config/global';
import { pb } from '@/lib/pocketbase';
import Home from './Home';

export default async function Page({ searchParams }: { searchParams: { k: string } }) {
  // if (searchParams.k !== SECRET_KEY) {
  //   return (
  //     <div>
  //       forebiden
  //     </div>
  //   );
  // }

  return (
    <Home />
  );
}
