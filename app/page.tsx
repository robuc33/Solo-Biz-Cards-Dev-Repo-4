import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { CallToAction } from '@/components/landing/CallToAction'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  )
}
