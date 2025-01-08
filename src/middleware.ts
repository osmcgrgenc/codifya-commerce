import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from './i18n-config'

// Performans için statik değerler
const PUBLIC_FILE = /\.(.*)$/
const defaultLocale = i18n.defaultLocale

export function middleware(request: NextRequest) {
  // Statik dosyaları atla
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return
  }

  // URL'den dil parametresini al
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.map(locale => locale.code).every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Dil parametresi yoksa, varsayılan dile yönlendir
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

// Dil belirleme fonksiyonu - memoize edilebilir
const getLocale = (request: NextRequest): string => {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, i18n.locales.map(locale => locale.code), defaultLocale)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
