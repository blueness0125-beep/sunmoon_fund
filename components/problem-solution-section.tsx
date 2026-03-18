'use client';

export default function ProblemSolutionSection() {
  return (
    <section className="section-padding bg-light">
      <div className="max-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AS-IS vs TO-BE
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            기존 프로세스의 복잡성을 개선하여 사용자 경험을 극대화합니다.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AS-IS */}
          <div className="glass-morphism p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-dark">현재 프로세스</h3>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">6 단계</span>
            </div>

            <div className="space-y-4">
              {[
                { step: '1', title: '로그인' },
                { step: '2', title: '캠페인 검색' },
                { step: '3', title: '캠페인 상세 조회' },
                { step: '4', title: '금액 선택' },
                { step: '5', title: '결제 처리' },
                { step: '6', title: '확인 완료' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 font-bold text-sm">
                    {item.step}
                  </div>
                  <p className="text-dark">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-neutral">
                ❌ 복잡한 내비게이션
                <br />
                ❌ 낮은 완료율
                <br />
                ❌ 시간 소모
              </p>
            </div>
          </div>

          {/* TO-BE */}
          <div className="glass-morphism p-8 space-y-6 border-2 border-primary/50 bg-white/20">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">개선된 프로세스</h3>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">3 단계</span>
            </div>

            <div className="space-y-4">
              {[
                { step: '1', title: '캠페인 선택' },
                { step: '2', title: '기부 금액 입력' },
                { step: '3', title: '결제 완료' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {item.step}
                  </div>
                  <p className="text-dark">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-primary font-semibold">
                ✅ 직관적인 UI
                <br />
                ✅ 높은 완료율 (50% ↑)
                <br />
                ✅ 빠른 처리 (2분 단축)
              </p>
            </div>
          </div>
        </div>

        {/* Visual Flow */}
        <div className="mt-16 p-8 bg-white rounded-2xl border border-primary/20">
          <h3 className="text-xl font-bold mb-6 text-center text-dark">
            프로세스 개선 효과
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: '6 단계', value: '6', color: 'bg-red-500/20' },
              { label: '→', value: '→', color: 'bg-gray-500/10' },
              { label: '3 단계', value: '3', color: 'bg-green-500/20' },
              { label: '50% ↑', value: '완료율', color: 'bg-primary/20' },
              { label: '2min ↓', value: '시간', color: 'bg-accent/20' },
              { label: '만족도 ↑', value: 'UX', color: 'bg-primary/20' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} rounded-lg p-4 text-center`}
              >
                {item.label !== '→' && (
                  <>
                    <div className="text-2xl font-bold text-dark">
                      {item.value}
                    </div>
                    <div className="text-xs text-neutral mt-1">
                      {item.label}
                    </div>
                  </>
                )}
                {item.label === '→' && (
                  <div className="text-2xl text-neutral">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
