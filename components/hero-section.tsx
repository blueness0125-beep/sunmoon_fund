'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw gradient circles
    const drawMeshGradient = () => {
      const gradient1 = ctx!.createRadialGradient(100, 200, 0, 100, 200, 400);
      gradient1.addColorStop(0, 'rgba(0, 106, 121, 0.15)');
      gradient1.addColorStop(1, 'rgba(0, 106, 121, 0)');

      const gradient2 = ctx!.createRadialGradient(canvas.width - 100, canvas.height - 200, 0, canvas.width - 100, canvas.height - 200, 400);
      gradient2.addColorStop(0, 'rgba(211, 25, 69, 0.15)');
      gradient2.addColorStop(1, 'rgba(211, 25, 69, 0)');

      ctx!.fillStyle = gradient1;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = gradient2;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
    };

    drawMeshGradient();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawMeshGradient();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div className="max-container relative z-10 text-center px-4">
        <div className="space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">
                선문대학교 발전기금 플랫폼 개편
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block mb-2">더 나은</span>
            <span className="gradient-text">기금 모금 경험</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto leading-relaxed">
            3단계로 단순화된 직관적 인터페이스와 실시간 크라우드펀딩 기능으로 
            선문대학교의 발전기금 모금을 혁신합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="btn-primary group relative overflow-hidden">
              <span className="relative z-10">제안서 보기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <button className="btn-secondary">
              자세히 알아보기
            </button>
          </div>
        </div>

        {/* Floating Dashboard Mockup */}
        <div className="mt-16 md:mt-24 animate-float">
          <div className="relative mx-auto max-w-4xl">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-3xl rounded-3xl" />

            {/* Dashboard card */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/10">
              {/* Header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="text-sm text-neutral mb-2">총 모금액</div>
                  <div className="text-3xl font-bold text-primary">₩2.5M</div>
                  <div className="text-xs text-neutral mt-4">↑ 12% 증가</div>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                  <div className="text-sm text-neutral mb-2">기여자 수</div>
                  <div className="text-3xl font-bold text-accent">1,280</div>
                  <div className="text-xs text-neutral mt-4">↑ 24% 증가</div>
                </div>

                {/* Card 3 */}
                <div className="bg-gradient-to-br from-dark/10 to-dark/5 rounded-xl p-6 border border-dark/20">
                  <div className="text-sm text-neutral mb-2">완료율</div>
                  <div className="text-3xl font-bold text-dark">85%</div>
                  <div className="text-xs text-neutral mt-4">목표 달성 근접</div>
                </div>
              </div>

              {/* Progress section */}
              <div className="px-8 pb-8">
                <div className="bg-light rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-dark">진행률</span>
                    <span className="text-sm font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
