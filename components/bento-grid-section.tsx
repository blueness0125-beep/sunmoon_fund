'use client';

import { useEffect, useRef, useState } from 'react';

export default function BentoGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '💳',
      title: '간편한 기부',
      description: '한 번의 클릭으로 기부 완료',
      color: 'from-primary/10 to-primary/5',
      span: 'col-span-1 row-span-1',
    },
    {
      icon: '📊',
      title: '실시간 진행률',
      description: '캠페인 진행 상황 실시간 추적',
      color: 'from-accent/10 to-accent/5',
      span: 'col-span-1 row-span-1',
    },
    {
      icon: '🎯',
      title: '크라우드펀딩',
      description: '다양한 캠페인에 참여',
      color: 'from-dark/10 to-dark/5',
      span: 'col-span-1 row-span-1',
    },
    {
      icon: '📱',
      title: '모바일 최적화',
      description: '언제 어디서나 접근 가능',
      color: 'from-primary/10 to-accent/10',
      span: 'md:col-span-2 row-span-1',
    },
    {
      icon: '🔐',
      title: '안전한 결제',
      description: '최신 암호화 기술 적용',
      color: 'from-accent/10 to-dark/10',
      span: 'md:col-span-1 row-span-1',
    },
    {
      icon: '📈',
      title: '상세 분석',
      description: '기부자별 통계 및 분석',
      color: 'from-dark/10 to-primary/10',
      span: 'md:col-span-1 row-span-1',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="max-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            핵심 기능
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            선문대학교 발전기금 플랫폼의 혁신적인 기능들
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`${feature.span} bg-gradient-to-br ${feature.color} rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:shadow-lg`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${idx * 0.1}s`,
              }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral">
                {feature.description}
              </p>

              {/* Hover effect line */}
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
