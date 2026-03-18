'use client';

import { useEffect, useRef, useState } from 'react';

export default function ExpectedResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let current = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return count;
  };

  const results = [
    {
      icon: '📈',
      number: 50,
      unit: '%',
      label: '기부 완료율 증가',
      description: '직관적인 UI로 인한 사용자 완료율 향상',
    },
    {
      icon: '⏱️',
      number: 120,
      unit: 's',
      label: '기부 시간 단축',
      description: '평균 기부 소요 시간 2분에서 1분으로 단축',
    },
    {
      icon: '😊',
      number: 95,
      unit: '%',
      label: '사용자 만족도',
      description: '개선된 UI/UX에 대한 사용자 만족도',
    },
    {
      icon: '🎯',
      number: 30,
      unit: '%',
      label: '기금 모금 증가',
      description: '전환율 개선으로 인한 모금액 증가',
    },
  ];

  const timeline = [
    {
      week: '1주',
      title: '디자인 및 계획',
      tasks: ['요구사항 분석', '시스템 아키텍처 설계'],
      color: 'from-primary',
    },
    {
      week: '2-3주',
      title: 'Frontend 개발',
      tasks: ['UI 컴포넌트 개발', 'React 통합'],
      color: 'from-primary',
    },
    {
      week: '4-5주',
      title: 'Backend 개발',
      tasks: ['API 구축', '데이터베이스 설정'],
      color: 'from-accent',
    },
    {
      week: '6주',
      title: '통합 및 테스트',
      tasks: ['통합 테스트', '성능 최적화'],
      color: 'from-dark',
    },
    {
      week: '7주',
      title: '배포 준비',
      tasks: ['QA 테스트', '운영 매뉴얼 작성'],
      color: 'from-primary',
    },
    {
      week: '8주',
      title: '본 서비스 런칭',
      tasks: ['프로덕션 배포', '모니터링'],
      color: 'from-accent',
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
            기대 효과
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            선문대학교 발전기금 플랫폼 개편으로 기대되는 성과
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-primary/5 to-primary/2 rounded-2xl p-8 border border-primary/10 text-center hover:border-primary/30 transition-all group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${idx * 0.15}s`,
              }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {result.icon}
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                <AnimatedCounter target={result.number} />
                {result.unit}
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">
                {result.label}
              </h3>
              <p className="text-sm text-neutral">
                {result.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-dark mb-2">
              8주 개발 일정
            </h3>
            <p className="text-neutral">
              체계적이고 단계적인 프로젝트 진행 계획
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" />

            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${0.3 + idx * 0.1}s`,
                  }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full z-10" />

                  {/* Content card */}
                  <div className={`bg-gradient-to-br ${item.color}/10 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all h-full hover:shadow-lg`}>
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2">
                        {item.week}
                      </span>
                      <h4 className="font-bold text-dark mb-3">
                        {item.title}
                      </h4>
                      <ul className="space-y-1">
                        {item.tasks.map((task, taskIdx) => (
                          <li key={taskIdx} className="text-xs text-neutral">
                            ✓ {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
