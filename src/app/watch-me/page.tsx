export const metadata = {
  alternates: { canonical: '/watch-me' },
};

import { redirect } from 'next/navigation'

export default function WatchMePage() {
  redirect('/home')
}
