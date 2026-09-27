export const metadata = {
  alternates: { canonical: '/apply-to-serve' },
};

import { redirect } from 'next/navigation'

export default function ApplyToServePage() {
  redirect('/wardrobe')
}
