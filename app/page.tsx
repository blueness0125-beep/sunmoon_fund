import HeroSection from '@/components/hero-section';
import ProblemSolutionSection from '@/components/problem-solution-section';
import BentoGridSection from '@/components/bento-grid-section';
import AdminDashboardSection from '@/components/admin-dashboard-section';
import ExpectedResultsSection from '@/components/expected-results-section';
import FooterCTA from '@/components/footer-cta';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <ProblemSolutionSection />
      <BentoGridSection />
      <AdminDashboardSection />
      <ExpectedResultsSection />
      <FooterCTA />
    </main>
  );
}
