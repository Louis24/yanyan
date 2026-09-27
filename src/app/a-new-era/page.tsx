export const metadata = {
  alternates: { canonical: '/a-new-era' },
};

import { redirect } from 'next/navigation'

export default function ANewEraPage() {
  redirect('/home')
}
