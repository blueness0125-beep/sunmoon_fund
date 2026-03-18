"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Sparkles, Zap, PieChart, MapPin,
  PlayCircle, Settings, ShieldAlert, CheckCircle2,
  TrendingUp, Users, ChevronRight, CreditCard,
  LayoutDashboard, Monitor, Search, LayoutTemplate,
  BarChart3, Heart, MousePointerClick
} from 'lucide-react';

// --- 스크롤 애니메이션 훅 ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
};

// --- 숫자 카운팅 애니메이션 컴포넌트 ---
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0D1F1D] selection:bg-[#006A79] selection:text-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Problem vs Solution */}
      <ProblemSolutionSection />

      {/* 3. 6 Core Innovations (Bento Grid) */}
      <BentoGridSection />

      {/* 4. 3가지 맞춤형 랜딩페이지 타입 제안 (추가된 섹션) */}
      <LandingPageTypesSection />

      {/* 5. Admin Dashboard Preview */}
      <AdminDashboardSection />

      {/* 6. Expected Results & Timeline */}
      <ResultsTimelineSection />

      {/* 7. Footer CTA */}
      <FooterCTASection />

      {/* 글로벌 스타일 (애니메이션 및 클립패스) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .clip-donut-1 { clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%); }
        .clip-donut-2 { clip-path: polygon(50% 50%, 0 50%, 0 0); }
        .clip-donut-3 { clip-path: polygon(50% 50%, 0 0, 100% 0); }
      `}} />
    </div>
  );
}

// ==========================================
// 1. Hero Section
// ==========================================
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0D1F1D] overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-[#006A79] opacity-20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#D31945] opacity-20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#006A79] opacity-10 blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-white/80 text-sm font-medium reveal active">
          <Sparkles size={16} className="text-[#006A79]" />
          <span>선문대학교 발전기금 홈페이지 디지털 전환 프로젝트</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A5AEB4] mb-6 tracking-tight reveal active leading-tight">
          기부의 가치,<br />가장 투명하고 눈부시게.
        </h1>

        <p className="text-lg md:text-2xl text-[#A5AEB4] max-w-3xl mb-12 font-light leading-relaxed reveal active" style={{ transitionDelay: '100ms' }}>
          기부자 중심의 UI/UX와 자동화된 데이터 시각화로<br className="hidden md:block" />
          선문대학교의 새로운 기부 문화를 디자인합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 reveal active" style={{ transitionDelay: '200ms' }}>
          <button className="relative overflow-hidden group px-8 py-4 bg-[#D31945] hover:bg-[#b01438] text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(211,25,69,0.3)] hover:shadow-[0_0_40px_rgba(211,25,69,0.5)] flex items-center justify-center gap-2">
            <span className="relative z-10 flex items-center gap-2">리뉴얼 제안 확인하기 <ArrowRight size={18} /></span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer z-0"></div>
          </button>
        </div>

        {/* Floating Mockup */}
        <div className="mt-20 relative w-full max-w-5xl reveal active" style={{ transitionDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F1D] via-transparent to-transparent z-20"></div>
          <div className="relative rounded-t-2xl border border-white/10 bg-[#0D1F1D]/50 backdrop-blur-xl shadow-2xl overflow-hidden animate-[bounce_4s_infinite_alternate_ease-in-out]">
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-black/40">
              <div className="w-3 h-3 rounded-full bg-[#D31945]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="mx-auto bg-white/5 border border-white/10 rounded-md px-32 py-1 text-xs text-white/40">fund.sunmoon.ac.kr</div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4 bg-[#f8fafc]">
              <div className="col-span-1 h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="w-8 h-8 rounded bg-[#006A79]/20 mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-3 h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                <div className="flex justify-between mb-8">
                  <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-6 bg-[#006A79]/20 rounded"></div>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {[40, 60, 45, 80, 50, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#006A79] rounded-t-md opacity-80" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. Problem vs Solution
// ==========================================
function ProblemSolutionSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1F1D] mb-4">기존의 불편함을 혁신으로 바꿉니다</h2>
          <p className="text-[#A5AEB4] text-lg">기부자가 겪는 복잡한 여정을 과감하게 단축시켰습니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className={`bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6 text-[#D31945]">
              <ShieldAlert size={28} />
              <h3 className="text-2xl font-bold">AS-IS <span className="text-gray-400 text-lg font-normal ml-2">현재의 한계</span></h3>
            </div>
            <p className="text-gray-600 mb-8 font-medium">복잡한 폼, 숨겨진 메뉴, 시각화의 부재</p>

            <div className="space-y-4 relative">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="bg-[#D31945] text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 transform rotate-[-5deg]">
                  이탈률 증가 <TrendingUp size={16} className="rotate-180" />
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm opacity-60">
                <div className="w-1/3 h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-10 border border-gray-200 rounded bg-gray-50"></div>
                  <div className="w-full h-10 border border-gray-200 rounded bg-gray-50"></div>
                  <div className="w-full h-10 border border-gray-200 rounded bg-gray-50"></div>
                </div>
              </div>
              <div className="flex justify-center text-gray-400"><ArrowRight className="rotate-90" /></div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm opacity-40">
                <div className="w-full h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-[#006A79]/5 to-transparent rounded-3xl p-8 border border-[#006A79]/20 shadow-[0_10px_40px_rgba(0,106,121,0.08)] transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6 text-[#006A79]">
              <CheckCircle2 size={28} />
              <h3 className="text-2xl font-bold">TO-BE <span className="text-gray-400 text-lg font-normal ml-2">미래의 제안</span></h3>
            </div>
            <p className="text-[#0D1F1D] mb-8 font-medium">단 3번의 클릭, 투명한 데이터, 직관적 대시보드</p>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-[#006A79]/20 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-1/3 h-5 bg-[#006A79]/20 rounded"></div>
                  <div className="px-3 py-1 bg-[#006A79] text-white text-xs rounded-full">Step 1</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-lg bg-[#006A79]/5 border border-[#006A79]/20 flex items-center justify-center text-[#006A79] font-bold">간편 기부</div>
                  <div className="h-16 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">정기 후원</div>
                </div>
              </div>
              <div className="flex justify-center text-[#006A79]"><ArrowRight className="rotate-90" /></div>
              <div className="bg-[#006A79] p-4 rounded-xl shadow-lg flex items-center justify-between text-white transform hover:scale-105 transition-transform cursor-pointer">
                <span className="font-bold">기부 완료 및 영수증 자동 발급</span>
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. 6 Core Innovations (Bento Grid)
// ==========================================
function BentoGridSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 bg-[#f8fafc]" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1F1D] mb-4">6가지 핵심 혁신 전략</h2>
          <p className="text-[#A5AEB4] text-lg">모바일 최적화부터 관리자 자동화까지, 완벽한 생태계를 구축합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto auto-rows-[240px]">
          <div className={`col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#D31945]/30 transition-all group relative overflow-hidden flex flex-col justify-between ${isVisible ? 'reveal active' : 'reveal'}`}>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D31945]/5 rounded-full blur-2xl group-hover:bg-[#D31945]/10 transition-all"></div>
            <div>
              <div className="w-12 h-12 bg-[#D31945]/10 text-[#D31945] rounded-2xl flex items-center justify-center mb-4">
                <Zap size={24} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-[#0D1F1D] mb-2">Quick-Service 최적화</h3>
              <p className="text-gray-500 text-sm max-w-[80%]">영수증 간편 발급 및 나의 기부내역을 메인 최상단에 배치하여 접근성을 극대화합니다.</p>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg group-hover:bg-[#D31945] group-hover:text-white transition-colors">원클릭 영수증</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg group-hover:bg-[#D31945] group-hover:text-white transition-colors">나의 기부내역</span>
            </div>
          </div>

          <div className={`col-span-1 md:col-span-2 row-span-2 bg-[#006A79] text-white rounded-3xl p-8 border border-[#006A79] shadow-lg relative overflow-hidden group ${isVisible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '100ms' }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">크라우드 펀딩 & 간편결제</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  '천원의 아침밥'과 같은 상시 이벤트를 펀딩 형태로 제공하며, 네이버페이·카카오페이 연동으로 MZ세대 참여를 유도합니다.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-lg">천원의 아침밥 후원</span>
                  <span className="text-[#FFD166] font-bold text-xl">85%</span>
                </div>
                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#FFD166] rounded-full w-[85%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#03C75A] text-white text-xs font-bold py-2 rounded text-center">N Pay</div>
                  <div className="flex-1 bg-[#FEE500] text-[#191919] text-xs font-bold py-2 rounded text-center">Kakao Pay</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-span-1 md:col-span-1 lg:col-span-2 row-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#006A79]/30 transition-all group flex flex-col ${isVisible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '200ms' }}>
            <div className="w-12 h-12 bg-[#006A79]/10 text-[#006A79] rounded-2xl flex items-center justify-center mb-4">
              <PieChart size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1F1D] mb-2">데이터 시각화 리포트</h3>
            <p className="text-gray-500 text-sm mb-8">텍스트 위주의 정보를 직관적인 그래프로 자동 변환하여 투명성을 증명합니다.</p>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-[12px] border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-[#006A79] clip-donut-1 transform rotate-45 group-hover:scale-105 transition-transform origin-center"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-[#D31945] clip-donut-2 transform -rotate-12 group-hover:scale-105 transition-transform origin-center"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-[#0D1F1D]">100%</span>
                  <span className="text-xs text-gray-400">투명한 공개</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-span-1 row-span-1 bg-[#0D1F1D] text-white rounded-3xl p-6 border border-gray-800 shadow-sm relative overflow-hidden group ${isVisible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#006A79]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3 text-[#FFD166]">
              <MapPin size={20} />
            </div>
            <h3 className="text-lg font-bold mb-1">S-Members 통합</h3>
            <p className="text-gray-400 text-xs">지도 API 기반 후원의 집 및 기부자 명패 위치 시각화</p>
          </div>

          <div className={`col-span-1 row-span-1 bg-white rounded-3xl p-0 border border-gray-200 shadow-sm relative overflow-hidden group ${isVisible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '400ms' }}>
            <div className="absolute inset-0 bg-gray-100 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle size={48} className="text-white/80 group-hover:text-white transition-colors group-hover:scale-110" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-sm font-bold leading-tight mb-1">언박싱 등 미디어 허브</h3>
              <p className="text-[10px] text-white/70">홈페이지 직접 재생 콘텐츠</p>
            </div>
          </div>

          <div className={`col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-[#006A79]/50 transition-colors flex items-center gap-6 ${isVisible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '500ms' }}>
            <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center text-[#A5AEB4] group-hover:animate-spin-slow">
              <Settings size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0D1F1D] mb-1">관리자 업무 70% 효율화</h3>
              <p className="text-gray-500 text-sm">데이터 연동 및 엑셀 다운로드 자동화 시스템</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. Landing Page Types (새로 추가된 섹션)
// ==========================================
function LandingPageTypesSection() {
  const [ref, isVisible] = useScrollReveal();

  const options = [
    {
      id: "A",
      title: "데이터 대시보드형",
      desc: "숫자와 그래프로 대학의 투명성과 신뢰감을 최우선으로 보여주는 구조입니다.",
      icon: <BarChart3 size={24} className="text-[#006A79]" />,
      stats: { data: 70, emotion: 20, cta: 10 },
      link: "option_a.html",
      wireframe: (
        <div className="flex-1 bg-[#f8fafc] p-3 flex flex-col gap-3">
          {/* Header Placeholder */}
          <div className="w-1/2 h-3 bg-[#006A79]/40 rounded-sm"></div>
          {/* Dashboard Area */}
          <div className="flex gap-2">
            <div className="w-1/3 h-12 bg-white border border-gray-200 rounded-md p-2 flex flex-col justify-end">
              <div className="w-full h-1 bg-gray-100 mb-1 rounded"></div>
              <div className="w-1/2 h-3 bg-[#006A79] rounded-sm"></div>
            </div>
            <div className="w-1/3 h-12 bg-white border border-gray-200 rounded-md p-2 flex flex-col justify-end">
              <div className="w-full h-1 bg-gray-100 mb-1 rounded"></div>
              <div className="w-3/4 h-3 bg-[#006A79] rounded-sm"></div>
            </div>
            <div className="w-1/3 h-12 bg-white border border-gray-200 rounded-md p-2 flex flex-col justify-end">
              <div className="w-full h-1 bg-gray-100 mb-1 rounded"></div>
              <div className="w-2/3 h-3 bg-[#D31945] rounded-sm"></div>
            </div>
          </div>
          {/* Chart Placeholder */}
          <div className="flex-1 bg-white border border-gray-200 rounded-md p-2 flex items-end gap-1">
            <div className="w-full h-[40%] bg-[#006A79]/30 rounded-t-sm"></div>
            <div className="w-full h-[70%] bg-[#006A79]/50 rounded-t-sm"></div>
            <div className="w-full h-[50%] bg-[#006A79]/80 rounded-t-sm"></div>
            <div className="w-full h-[90%] bg-[#006A79] rounded-t-sm"></div>
          </div>
        </div>
      )
    },
    {
      id: "B",
      title: "비주얼 스토리텔링형",
      desc: "동문 인터뷰와 고화질 영상으로 방문자의 감성을 자극하고 공감을 이끌어냅니다.",
      icon: <Heart size={24} className="text-[#D31945]" />,
      stats: { data: 20, emotion: 70, cta: 10 },
      link: "option_b.html",
      wireframe: (
        <div className="flex-1 bg-white flex flex-col">
          {/* Hero Video/Image Area */}
          <div className="h-2/3 bg-[#0D1F1D] relative flex items-center justify-center rounded-t-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10 backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <div className="absolute bottom-3 left-3 w-2/3 space-y-1">
              <div className="h-2 w-full bg-white/80 rounded-sm"></div>
              <div className="h-2 w-1/2 bg-white/50 rounded-sm"></div>
            </div>
          </div>
          {/* Testimonial Area */}
          <div className="h-1/3 bg-gray-50 p-3 flex gap-2 items-center border-t border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-1/3 bg-gray-300 rounded-sm"></div>
              <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
              <div className="h-2 w-4/5 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "C",
      title: "전환 최적화 펀딩형",
      desc: "천원의 아침밥 등 구체적 캠페인을 전면에 배치하여 즉각적인 행동(CTA)을 유도합니다.",
      icon: <MousePointerClick size={24} className="text-[#006A79]" />,
      stats: { data: 20, emotion: 30, cta: 50 },
      link: "option_c.html",
      wireframe: (
        <div className="flex-1 bg-[#f8fafc] p-3 grid grid-cols-2 gap-2">
          {/* Funding Card 1 */}
          <div className="bg-white border border-gray-200 rounded-md flex flex-col">
            <div className="h-12 bg-gray-200 rounded-t-md"></div>
            <div className="p-2 space-y-1.5">
              <div className="h-1.5 w-full bg-gray-200 rounded-sm"></div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-[#D31945]"></div>
              </div>
              <div className="h-4 w-full bg-[#D31945] rounded-sm mt-1"></div>
            </div>
          </div>
          {/* Funding Card 2 */}
          <div className="bg-white border border-gray-200 rounded-md flex flex-col">
            <div className="h-12 bg-gray-200 rounded-t-md"></div>
            <div className="p-2 space-y-1.5">
              <div className="h-1.5 w-full bg-gray-200 rounded-sm"></div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-[#D31945]"></div>
              </div>
              <div className="h-4 w-full bg-[#006A79] rounded-sm mt-1"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-4">
            <LayoutTemplate size={16} /> UI/UX 레이아웃 제안
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1F1D] mb-4">3가지 맞춤형 메인 페이지 구조</h2>
          <p className="text-[#A5AEB4] text-lg">대학의 발전 비전과 타겟 성향에 맞춰 최적의 첫 화면을 선택하실 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((opt, idx) => (
            <a
              href={opt.link}
              target="_blank"
              rel="noopener noreferrer"
              key={opt.id}
              className={`flex flex-col group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Mockup Window */}
              <div className="h-56 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6 group-hover:shadow-xl group-hover:-translate-y-2 transition-all flex flex-col relative">
                {/* Mac Window Header */}
                <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                </div>
                {/* Wireframe Content */}
                {opt.wireframe}

                {/* Hover Overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#006A79] rounded-2xl transition-colors pointer-events-none"></div>
              </div>

              {/* Description */}
              <div className="px-2 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-black text-gray-300 group-hover:text-[#0D1F1D] transition-colors">옵션 {opt.id}</span>
                  <h3 className="text-xl font-bold text-[#0D1F1D] flex items-center gap-2">
                    {opt.title} {opt.icon}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{opt.desc}</p>

                {/* UX Value Bar */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold mb-2">가치 비중 분석</p>
                  <div className="h-2 w-full flex rounded-full overflow-hidden mb-3">
                    <div style={{ width: `${opt.stats.data}%` }} className="bg-[#006A79]" title="데이터/투명성"></div>
                    <div style={{ width: `${opt.stats.emotion}%` }} className="bg-[#A5AEB4]" title="감성/스토리"></div>
                    <div style={{ width: `${opt.stats.cta}%` }} className="bg-[#D31945]" title="행동 유도(기부)"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#006A79]"></div>신뢰 {opt.stats.data}%</span>
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#A5AEB4]"></div>감성 {opt.stats.emotion}%</span>
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#D31945]"></div>참여 {opt.stats.cta}%</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


// ==========================================
// 5. Admin Dashboard Preview
// ==========================================
function AdminDashboardSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#0D1F1D] mb-4">관리자 관제 센터의 우월함</h2>
            <p className="text-[#A5AEB4] text-lg">방대한 검색 필터 대신, 인사이트를 제공하는 완벽한 대시보드를 제공합니다.</p>
          </div>
          <button
            onClick={() => window.open('manage.html', '_blank')}
            className="px-6 py-3 bg-white border border-gray-200 text-[#006A79] font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            관리자 데모 보기 <ArrowRight size={16} />
          </button>
        </div>

        <div className={`rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,106,121,0.1)] overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Mac Header */}
          <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            <div className="mx-auto bg-white border border-gray-200 text-gray-400 text-xs px-24 py-1.5 rounded-md flex items-center gap-2">
              <ShieldAlert size={12} /> admin.fund.sunmoon.ac.kr
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 bg-[#f8fafc] flex flex-col md:flex-row gap-6 h-[600px] overflow-hidden">
            <div className="hidden md:flex flex-col w-48 bg-[#0D1F1D] rounded-xl text-gray-400 p-4 shrink-0">
              <div className="flex items-center gap-2 text-white font-bold mb-8">
                <div className="w-6 h-6 rounded bg-[#006A79]"></div>
                SM ADMIN
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-[#006A79] text-white p-2 rounded-lg text-sm"><LayoutDashboard size={16} /> 대시보드</div>
                <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg text-sm"><CreditCard size={16} /> 약정 관리</div>
                <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg text-sm"><Users size={16} /> 회원 관리</div>
                <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg text-sm"><Monitor size={16} /> 홈페이지 관리</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#0D1F1D]">종합 상황판</h3>
                <div className="flex gap-2">
                  <div className="bg-white border border-gray-200 p-2 rounded-lg text-gray-400"><Search size={16} /></div>
                  <div className="bg-white border border-gray-200 p-2 rounded-lg text-gray-400"><Settings size={16} /></div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "금월 모금액 (원)", val: "142,500,000", color: "text-[#006A79]" },
                  { title: "누적 기부자 수 (명)", val: "12,458", color: "text-[#0D1F1D]" },
                  { title: "신규 약정 대기 (건)", val: "18", color: "text-[#D31945]" },
                  { title: "펀딩 달성률 (%)", val: "85", color: "text-[#006A79]" }
                ].map((kpi, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">{kpi.title}</p>
                    <p className={`text-xl font-black ${kpi.color}`}>{kpi.val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-sm mb-4">최근 6개월 모금 추이</h4>
                  <div className="h-40 flex items-end gap-2">
                    {[30, 45, 25, 60, 40, 80].map((h, i) => (
                      <div key={i} className="flex-1 relative group h-full flex items-end">
                        <div className="w-full bg-[#006A79]/20 group-hover:bg-[#006A79] rounded-t-md transition-colors" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                  <h4 className="font-bold text-sm mb-4 self-start">기부 목적별 비율</h4>
                  <div className="w-32 h-32 rounded-full border-[10px] border-[#006A79] relative">
                    <div className="absolute inset-[-10px] rounded-full border-[10px] border-[#D31945] clip-donut-1 transform rotate-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-lg font-bold">55%</span>
                      <span className="text-[10px] text-gray-500">장학기금</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h4 className="font-bold text-sm">최근 약정 내역</h4>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs">
                    <tr>
                      <th className="p-3">약정일자</th>
                      <th className="p-3">성명</th>
                      <th className="p-3">기부종류</th>
                      <th className="p-3">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="p-3">2026-03-12</td>
                      <td className="p-3 font-medium">김선문 (동문)</td>
                      <td className="p-3">건축기금</td>
                      <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">접수완료</span></td>
                    </tr>
                    <tr>
                      <td className="p-3">2026-03-11</td>
                      <td className="p-3 font-medium">(주)애플디자인</td>
                      <td className="p-3">장학기금</td>
                      <td className="p-3"><span className="px-2 py-1 bg-red-100 text-[#D31945] rounded text-xs font-bold">입금대기</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. Expected Results & Timeline
// ==========================================
function ResultsTimelineSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 bg-[#0D1F1D] text-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwdjIwaDIwVjIwaC0yMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">확실한 성과, 명확한 로드맵</h2>
          <p className="text-[#A5AEB4] text-lg">데이터가 증명하는 리모델링의 가치입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto border-b border-white/10 pb-16">
          <div className="text-center">
            <div className="text-[#006A79] mb-4 flex justify-center"><TrendingUp size={40} /></div>
            <div className="text-5xl font-black mb-2 flex items-center justify-center gap-1">
              +<AnimatedCounter end={20} />%
            </div>
            <p className="text-[#A5AEB4] font-medium">기부 참여율 증가 예상</p>
          </div>
          <div className="text-center">
            <div className="text-[#FFD166] mb-4 flex justify-center"><Settings size={40} /></div>
            <div className="text-5xl font-black mb-2 flex items-center justify-center gap-1">
              -<AnimatedCounter end={70} />%
            </div>
            <p className="text-[#A5AEB4] font-medium">관리자 행정 소요 시간 단축</p>
          </div>
          <div className="text-center">
            <div className="text-[#D31945] mb-4 flex justify-center"><ShieldAlert size={40} /></div>
            <div className="text-5xl font-black mb-2 flex items-center justify-center gap-1">
              <AnimatedCounter end={0} />%
            </div>
            <p className="text-[#A5AEB4] font-medium">기부 이탈률 목표</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#FFD166]">8 Weeks Milestone</h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 transform md:-translate-x-1/2"></div>

            {[
              { week: "Week 1", title: "요구사항 분석 및 기획 확정", desc: "기존 데이터 구조 파악 및 레이아웃(A/B/C) 확정" },
              { week: "Week 2-3", title: "UI/UX 디자인 및 프로토타이핑", desc: "선문대 브랜드 가이드 적용 및 인터랙션 설계" },
              { week: "Week 4-7", title: "Next.js 프론트 & 백엔드 개발", desc: "대시보드 시각화 연동 및 반응형 웹 구축" },
              { week: "Week 8", title: "QA, 보안 검수 및 정식 런칭", desc: "간편결제 테스트 및 최종 시스템 안정화" }
            ].map((step, i) => (
              <div key={i} className={`relative flex items-center mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transition: 'all 0.5s ease', transitionDelay: `${i * 150}ms` }}>
                <div className="hidden md:block w-1/2 px-8 text-right flex-col justify-center">
                  {i % 2 !== 0 && (
                    <div className="text-right">
                      <div className="text-[#006A79] font-bold text-xl mb-1">{step.week}</div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-[#A5AEB4] text-sm">{step.desc}</p>
                    </div>
                  )}
                </div>

                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#D31945] border-4 border-[#0D1F1D] transform -translate-x-1/2 z-10 shadow-[0_0_10px_#D31945]"></div>

                <div className="pl-12 md:pl-0 md:w-1/2 md:px-8">
                  <div className={`text-left ${i % 2 === 0 ? 'md:text-left' : 'md:hidden'}`}>
                    <div className="text-[#006A79] font-bold text-xl mb-1">{step.week}</div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-[#A5AEB4] text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. Footer CTA
// ==========================================
function FooterCTASection() {
  return (
    <footer className="relative bg-[#006A79] py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#D31945] opacity-30 blur-[100px] mix-blend-overlay"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#0D1F1D] opacity-40 blur-[80px] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          선문대학교의 브랜드 가치,<br className="hidden md:block" />지금 새로운 차원으로 도약합니다.
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
          제안드린 세 가지 레이아웃(데이터형/스토리텔링형/펀딩형) 중 <br className="hidden sm:block" />
          가장 적합한 방향을 선택해 주시면 즉시 상세 설계에 착수하겠습니다.
        </p>

        <div className="pt-8 border-t border-white/20 text-white/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; 2026 선문대학교 디지털 전략 파트너 '블루문 인텔리전스'. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}