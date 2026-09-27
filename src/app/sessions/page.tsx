export const metadata = {
  alternates: { canonical: '/sessions' },
};

import { redirect } from 'next/navigation'

export default function SessionsPage() {
  redirect('/wardrobe')
}
