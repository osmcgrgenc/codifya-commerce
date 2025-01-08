import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { AdminNav } from './admin-nav'
import Menu from '@/components/shared/header/menu'
import { getSetting } from '@/lib/actions/setting.actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // Admin yetkisi kontrolü
  if (session?.user.role !== 'Admin') {
    throw new Error('Admin yetkisi gerekli')
  }

  const { site } = await getSetting()

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='bg-black text-white'>
        <div className='flex h-16 items-center px-4'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              src='/icons/logo.svg'
              width={48}
              height={48}
              alt={`${site.name} logo`}
              className='mr-2'
            />
            <span className='font-bold hidden md:inline'>{site.name} Admin</span>
          </Link>

          {/* Ana Navigasyon */}
          <AdminNav className='mx-6 hidden md:flex' />

          {/* Sağ Menü */}
          <div className='ml-auto flex items-center space-x-4'>
            <Menu forAdmin />
          </div>
        </div>

        {/* Mobil Navigasyon */}
        <div className='md:hidden px-4 pb-2'>
          <AdminNav className='flex flex-wrap' />
        </div>
      </header>

      {/* Ana İçerik */}
      <main className='flex-1 p-4'>
        <div className='max-w-7xl mx-auto'>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t py-4 text-center text-sm text-muted-foreground'>
        <p>© {new Date().getFullYear()} {site.name} Admin Panel</p>
      </footer>
    </div>
  )
}
