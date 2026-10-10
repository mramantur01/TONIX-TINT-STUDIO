import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PriceCalculator } from './components/PriceCalculator';
import { GalleryBeforeAfter } from './components/GalleryBeforeAfter';
import { PromotionsSection } from './components/PromotionsSection';
import { InstagramFeed } from './components/InstagramFeed';
import { MastersSection } from './components/MastersSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { UserCabinetModal } from './components/UserCabinetModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { InstallAppBanner } from './components/InstallAppBanner';

function MainLayout() {
  const { isAdminAuthed } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-[#131d33] text-slate-100 transition-colors relative selection:bg-amber-500 selection:text-slate-950">
      {/* Subtle ambient lighting for a lighter, premium aesthetic */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(245,158,11,0.08),transparent)] -z-10" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_40%_at_50%_45%,rgba(236,72,153,0.035),transparent)] -z-10" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_35%_at_50%_100%,rgba(59,130,246,0.06),transparent)] -z-10" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <PriceCalculator />
        <GalleryBeforeAfter />
        <PromotionsSection />
        <InstagramFeed />
        <MastersSection />
        <ReviewsSection />
        <FaqSection />
        <LocationMap />
      </main>
      <Footer />

      {/* Global Interactive Modals & Floating Tools */}
      <BookingModal />
      <UserCabinetModal />
      {isAdminAuthed ? <AdminDashboardModal /> : <AdminLoginModal />}
      <LiveChatWidget />
      <InstallAppBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
