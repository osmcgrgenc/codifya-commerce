'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
    icon: '📊',
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: '📦',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: '🛍️',
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: '👥',
  },
  {
    title: 'Pages',
    href: '/admin/web-pages',
    icon: '📄',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: '⚙️',
  },
]

export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const t = useTranslations('Admin')

  return (
    <nav
      className={cn(
        'flex items-center flex-wrap overflow-hidden gap-2 md:gap-4',
        className
      )}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center px-3 py-2 rounded-md hover:bg-primary/10 transition-colors',
            pathname.includes(item.href)
              ? 'text-primary font-semibold'
              : 'text-muted-foreground'
          )}
        >
          <span className='mr-2'>{item.icon}</span>
          {t(item.title)}
        </Link>
      ))}
    </nav>
  )
}
