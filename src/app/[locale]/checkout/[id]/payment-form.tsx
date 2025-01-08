'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'
import { redirect, useRouter } from 'next/navigation'
import CheckoutFooter from '../checkout-footer'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import { completeOrder } from '@/lib/actions/order.actions'

export default function OrderDetailsForm({
  order,
}: {
  order: IOrder
}) {
  const router = useRouter()
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,
  } = order
  const { toast } = useToast()

  if (isPaid) {
    redirect(`/account/orders/${order._id}`)
  }

  const handleCompleteOrder = async () => {
    try {
      const res = await completeOrder(order._id)
      if (!res.success) {
        toast({
          description: res.message,
          variant: 'destructive',
        })
        return
      }
      
      toast({
        description: 'Siparişiniz başarıyla tamamlandı',
      })
      
      router.push(`/account/orders/${order._id}`)
    } catch (error) {
      toast({
        description: 'Bir hata oluştu',
        variant: 'destructive',
      })
    }
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        <div>
          <div className='text-lg font-bold'>Sipariş Özeti</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Ürünler:</span>
              <span>
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Kargo:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'ÜCRETSİZ'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Vergi:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between pt-1 font-bold text-lg'>
              <span>Toplam:</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>

            {!isPaid && (
              <Button
                className='w-full mt-4'
                onClick={handleCompleteOrder}
              >
                Siparişi Tamamla
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Teslimat Adresi */}
          <div>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Teslimat Adresi</span>
              </div>
              <div className='col-span-2'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* Ödeme Yöntemi */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Ödeme Yöntemi</span>
              </div>
              <div className='col-span-2'>
                <p>{paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Ürünler ve Teslimat */}
          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>
              <span>Ürünler ve Teslimat</span>
            </div>
            <div className='col-span-2'>
              <p>
                Tahmini Teslimat Tarihi:
                {formatDateTime(expectedDeliveryDate).dateOnly}
              </p>
              <ul className='mt-2 space-y-2'>
                {items.map((item) => (
                  <li key={item.slug} className='flex justify-between'>
                    <span>{item.name} x {item.quantity}</span>
                    <ProductPrice price={item.price * item.quantity} plain />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobil Özet */}
          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>

          <CheckoutFooter />
        </div>

        {/* Masaüstü Özet */}
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
