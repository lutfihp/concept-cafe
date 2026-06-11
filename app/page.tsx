import { HeroSection }     from '@/components/landing/HeroSection'
import { MarqueeBar }      from '@/components/landing/MarqueeBar'
import { FeaturedGrid }    from '@/components/landing/FeaturedGrid'
import { AboutSection }    from '@/components/landing/AboutSection'
import { DaypartSection }  from '@/components/landing/DaypartSection'
import { GalleryCarousel } from '@/components/landing/GalleryCarousel'
import { ReviewsSection }  from '@/components/landing/ReviewsSection'
import { VisitSection }    from '@/components/landing/VisitSection'
import { NewsletterCTA }   from '@/components/landing/NewsletterCTA'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <FeaturedGrid />
      <AboutSection />
      <DaypartSection />
      <GalleryCarousel />
      <ReviewsSection />
      <VisitSection />
      <NewsletterCTA />
    </>
  )
}
