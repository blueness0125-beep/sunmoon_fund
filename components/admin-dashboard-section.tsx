'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboardSection() {
  const [animateNumbers, setAnimateNumbers] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateNumbers(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const chartData = [
    { name: '1월', value: 450 },
    { name: '2월', value: 600 },
    { name: '3월', value: 800 },
    { name: '4월', value: 920 },
    { name: '5월', value: 1100 },
    { name: '6월', value: 1280 },
  ];

  const pieData = [
    { name: '교육 지원', value: 40, color: '#006A79' },
    { name: '시설 개선', value: 35, color: '#D31945' },
    { name: '연구비', value: 15, color: '#A5AEB4' },
    { name: '장학금', value: 10, color: '#0D1F1D' },
  ];

  const AnimatedNumber = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animateNumbers) return;

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
    }, [animateNumbers, target, duration]);

    return count;
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-light"
    >
      <div className="max-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            관리자 대시보드
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            기금 모금 현황을 한눈에 파악할 수 있는 통합 관리 시스템
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-sm text-neutral">Sunmoon Fund Management System</span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: '총 모금액', value: 2500, suffix: '만원', color: 'from-primary' },
                { label: '기여자 수', value: 1280, suffix: '명', color: 'from-accent' },
                { label: '캠페인', value: 12, suffix: '개', color: 'from-dark' },
                { label: '완료율', value: 85, suffix: '%', color: 'from-primary' },
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${kpi.color}/10 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-all`}
                >
                  <p className="text-sm text-neutral mb-2">{kpi.label}</p>
                  <div className="text-3xl font-bold text-dark">
                    <AnimatedNumber target={kpi.value} />
                    {kpi.suffix}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="bg-light rounded-xl p-6 border border-primary/10">
                <h3 className="font-bold text-dark mb-4">월별 기여자 추이</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="#006A79" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-light rounded-xl p-6 border border-primary/10">
                <h3 className="font-bold text-dark mb-4">기금 용도별 분포</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-light rounded-xl p-6 border border-primary/10 overflow-x-auto">
              <h3 className="font-bold text-dark mb-4">최근 기여 현황</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left py-3 px-4 text-dark font-semibold">캠페인명</th>
                    <th className="text-left py-3 px-4 text-dark font-semibold">목표액</th>
                    <th className="text-left py-3 px-4 text-dark font-semibold">달성액</th>
                    <th className="text-left py-3 px-4 text-dark font-semibold">진행률</th>
                    <th className="text-left py-3 px-4 text-dark font-semibold">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '학생 장학금 캠페인', target: 500, achieved: 425, progress: 85, status: '진행중' },
                    { name: '도서관 리노베이션', target: 300, achieved: 300, progress: 100, status: '완료' },
                    { name: '연구시설 확충', target: 800, achieved: 680, progress: 85, status: '진행중' },
                    { name: '국제 교류 프로그램', target: 400, achieved: 360, progress: 90, status: '진행중' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-primary/5 hover:bg-white/50 transition-colors">
                      <td className="py-3 px-4 text-dark">{row.name}</td>
                      <td className="py-3 px-4 text-neutral">{row.target}만원</td>
                      <td className="py-3 px-4 text-dark font-semibold">{row.achieved}만원</td>
                      <td className="py-3 px-4">
                        <div className="w-24 bg-primary/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          row.status === '완료'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
