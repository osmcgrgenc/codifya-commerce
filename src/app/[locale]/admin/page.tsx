import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function AdminPage() {
  const session = await auth()
  
  // Admin yetkisi kontrolü
  if (session?.user.role !== 'Admin') {
    throw new Error('Admin yetkisi gerekli')
  }

  // Kullanıcıyı overview sayfasına yönlendir
  redirect('/admin/overview')
} 