'use client';

import { useRef, useEffect } from 'react';

export default function FooterCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

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
      <div className="max-container relative z-10 px-4 text-center space-y-8">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block mb-2">함께 만드는</span>
            <span className="gradient-text">더 나은 미래</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral max-w-2xl mx-auto">
            선문대학교의 발전기금 플랫폼 개편으로 
            더 투명하고 효율적인 기부 문화를 만들어갑니다.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto my-12">
          <div className="glass-morphism p-6 rounded-2xl">
            <div className="text-2xl mb-2">📧</div>
            <p className="text-sm text-neutral mb-1">이메일</p>
            <p className="font-semibold text-dark">info@sunmoon.ac.kr</p>
          </div>

          <div className="glass-morphism p-6 rounded-2xl">
            <div className="text-2xl mb-2">📞</div>
            <p className="text-sm text-neutral mb-1">전화</p>
            <p className="font-semibold text-dark">041-550-1234</p>
          </div>

          <div className="glass-morphism p-6 rounded-2xl">
            <div className="text-2xl mb-2">🏢</div>
            <p className="text-sm text-neutral mb-1">위치</p>
            <p className="font-semibold text-dark">충남 천안시</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary group relative overflow-hidden text-lg px-8 py-4">
            <span className="relative z-10">제안서 검토하기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
          <button className="btn-secondary text-lg px-8 py-4">
            더 알아보기
          </button>
        </div>

        {/* Footer Links */}
        <div className="pt-12 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral">
            <a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-primary transition-colors">이용약관</a>
            <a href="#" className="hover:text-primary transition-colors">문의하기</a>
            <a href="#" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <p className="mt-6 text-xs text-neutral">
            © 2024 Sunmoon University Development Fund. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
