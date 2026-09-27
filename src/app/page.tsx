export const metadata = {
  alternates: { canonical: '/' },
};

import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/home')
}