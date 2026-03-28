'use client'

import Image from 'next/image'
import FadeIn from '@/components/profile/FadeIn'
import { FadeInStagger, FadeInItem } from '@/components/profile/FadeIn'

export default function ResumePage() {
  return (
    <div className="max-w-[860px] mx-auto px-6 pt-16 pb-28">
      {/* ═══ Hero ═══ */}
      <FadeIn>
        <section className="mb-20 rounded-2xl border border-[#a78bfa]/20 bg-gradient-to-br from-[#a78bfa]/5 via-surface to-surface p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-5">
              <Image
                src="/profile.png"
                alt="신은정"
                width={64}
                height={64}
                className="rounded-2xl bg-white shrink-0 shadow-sm"
              />
              <div className="pt-1">
                <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight leading-none mb-1">
                  신은정
                </h1>
                <p className="text-[15px] text-text-secondary">Backend Developer · 3+ years</p>
              <p className="text-[12.5px] text-text-muted mt-1">rueun0302@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1.5 shrink-0">
              <ContactIcon href="https://github.com/rueun" label="GitHub" external icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              } />
              <ContactIcon href="/" label="Blog" external icon={
                <span className="text-[16px] font-extrabold leading-none">B</span>
              } />
            </div>
          </div>

          <FadeInStagger className="space-y-2.5">
            <IntroItem>
              서비스의 <Mark>기획부터 런칭까지 리드</Mark>한 경험이 있는 4년차 백엔드 개발자입니다.
            </IntroItem>
            <IntroItem>
              <Mark>도메인 주도 설계(DDD)</Mark>와 <Mark>클린 아키텍처</Mark>를 실무에 적용하며, 확장 가능하고 유지보수하기 좋은 구조를 설계합니다.
            </IntroItem>
            <IntroItem>
              최근에는 <Mark>AX(AI Transformation)</Mark>에 관심을 갖고 있으며, AI가 코드를 잘 작성할 수 있도록 프로젝트를 구조화하고 컨텍스트를 설계하는 방법을 탐구하고 있습니다.
            </IntroItem>
            <IntroItem>
              누구나 읽고 이해하기 쉬운 코드가 좋은 코드라 생각하며, <Mark>가독성과 유지보수성</Mark>을 고려한 코딩 스타일을 지향합니다.
            </IntroItem>
            <IntroItem>
              학습한 내용을 <a href="https://github.com/rueun" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline font-medium">GitHub</a>과 <a href="/" className="text-[#a78bfa] hover:underline font-medium">블로그</a>에 기록하며, 개발 과정에서의 고민과 의사결정을 문서화합니다.
            </IntroItem>
          </FadeInStagger>
        </section>
      </FadeIn>

      {/* ═══ Skills ═══ */}
      <FadeIn delay={0.1}>
        <ResumeSection number="01" title="Skills">
          <div className="space-y-4">
            <SkillCard label="Backend" items={[
              { name: 'Java', level: 'main' },
              { name: 'Spring Boot', level: 'main' },
              { name: 'Spring MVC', level: 'main' },
              { name: 'Spring Batch', level: 'main' },
              { name: 'Spring Cloud Gateway', level: 'main' },
              { name: 'JPA', level: 'main' },
              { name: 'QueryDSL', level: 'main' },
              { name: 'Spring AOP', level: 'main' },
              { name: 'Spring Cloud Config', level: 'main' },
            ]} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillCard label="Database" items={[
                { name: 'MySQL', level: 'main' },
                { name: 'MariaDB', level: 'main' },
                { name: 'Redis', level: 'main' },
                { name: 'Redis Streams', level: 'main' },
                { name: 'MongoDB', level: 'main' },
              ]} />
              <SkillCard label="DevOps" items={[
                { name: 'AWS EC2 / S3', level: 'main' },
                { name: 'Docker', level: 'main' },
                { name: 'GitHub Actions', level: 'main' },
                { name: 'K6', level: 'main' },
                { name: 'Grafana', level: 'main' },
              ]} />
              <SkillCard label="Test" items={[
                { name: 'JUnit5', level: 'main' },
                { name: 'AssertJ', level: 'main' },
                { name: 'Mockito', level: 'main' },
                { name: 'Testcontainers', level: 'main' },
              ]} />
              <SkillCard label="Tools" items={[
                { name: 'IntelliJ', level: 'main' },
                { name: 'VS Code', level: 'main' },
                { name: 'Git', level: 'main' },
                { name: 'Notion', level: 'main' },
              ]} />
            </div>
          </div>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Experience ═══ */}
      <FadeIn delay={0.15}>
        <ResumeSection number="02" title="Experience">
          <div className="relative pl-6 border-l border-border">
            <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-[#10b981] ring-2 ring-base" />
            <div className="mb-1 flex items-center gap-3 flex-wrap">
              <h3 className="text-[15px] font-semibold text-text-primary">무하유</h3>
              <span className="text-[10px] font-semibold text-[#10b981] bg-[#10b981]/10 rounded px-1.5 py-0.5 leading-none">
                현재 재직중
              </span>
            </div>
            <p className="text-[13px] text-text-muted mb-6">백엔드 개발자 — 2022.09 ~ 현재</p>

            {/* CopyKiller Lite */}
            <ProjectBlock
              title="CopyKiller Lite"
              subtitle="표이미지 표절검사"
              period="2025.09 ~ 2025.10"
              description="기존 텍스트 표절검사 서비스에 표·이미지·차트 등 시각 자료 표절검사 기능을 신규 개발하여 출시했습니다."
              linkUrl="https://www.copykiller.com/"
              skills={['Java', 'Spring Boot', 'MariaDB', 'Redis Streams', 'JPA', 'QueryDSL', 'Ceph S3']}
            >
              <BulletItem>표·이미지·차트 표절검사 백엔드 전체 설계 및 개발</BulletItem>
              <BulletItem>클린 아키텍처 + DDD 기반 멀티모듈 구조 설계</BulletItem>
              <BulletItem>Redis Streams + Consumer Group 기반 <Mark>비동기 분석 파이프라인</Mark> 구축</BulletItem>
              <BulletItem>도메인 상태 머신으로 분석 단계 전이 규칙 캡슐화</BulletItem>
              <BulletItem>Presigned URL 방식 파일 처리로 서버 부하 최소화</BulletItem>
            </ProjectBlock>

            {/* CK FactChecker */}
            <ProjectBlock
              title="CK FactChecker"
              subtitle="뉴스 기사 팩트체크 서비스"
              period="2025.08"
              description="지식 트리플 기반 의미적 유사도를 활용한 뉴스 기사 팩트체크 서비스를 기획부터 출시까지 개발했습니다."
              linkUrl="https://facts.copykiller.com/"
              skills={['Java', 'Spring Boot', 'MariaDB', 'JPA', 'QueryDSL', 'Spring WebFlux']}
            >
              <BulletItem>지식 트리플 기반 팩트체크 서비스 백엔드 설계 및 개발</BulletItem>
              <BulletItem>클린 아키텍처 + DDD 기반 멀티모듈 구조, <Mark>UseCase 단위 비즈니스 흐름 관리</Mark></BulletItem>
              <BulletItem>뉴스 기사 → 문장 분할 → 개체명 인식 → 지식 트리플 → 유사도 비교 파이프라인 구현</BulletItem>
              <BulletItem>Dead Letter + Google Chat 알림으로 장애 대응 체계 구축</BulletItem>
            </ProjectBlock>

            {/* CopyKiller HR */}
            <ProjectBlock
              title="CopyKiller HR"
              subtitle="ATS (Applicant Tracking System)"
              period="2023.08 ~ 2025.07"
              description="채용 관리 시스템 신규 서비스를 기획부터 런칭까지 전 과정에 참여하고, 프로젝트 리더로서 일정과 기술적 의사결정을 주도했습니다."
              linkUrl="https://hr.copykiller.com"
              skills={['Java', 'Spring Boot', 'MySQL', 'JPA', 'QueryDSL', 'AWS', 'Docker', 'JUnit']}
            >
              <BulletItem highlight>서비스 기획 → 런칭 전 과정 참여, <Mark>프로젝트 리더</Mark></BulletItem>
              <BulletItem>코드 리팩토링 + 테스트 도입으로 <Mark>QA 에러 60% 감소</Mark> (30건 → 5건 미만)</BulletItem>
              <BulletItem>대용량 데이터 처리 최적화 — <Mark>처리시간 90% 단축</Mark> (2.37s → 80.4ms)</BulletItem>
              <BulletItem>이벤트 기반 설계로 비관심사 분리, 확장성 강화</BulletItem>
              <BulletItem>PG사 연동 주문/결제 시스템 설계·개발, 비관적 락 동시성 제어</BulletItem>
              <BulletItem>GitHub Actions 버저닝 자동화, 구글챗 장애 알람 시스템 도입</BulletItem>
            </ProjectBlock>

            {/* Monster */}
            <ProjectBlock
              title="Monster"
              subtitle="AI 면접 서비스"
              period="2022.09 ~ 2023.09"
              description="AI 면접 서비스의 백엔드 시스템 운영 및 개발. 인증/인가 모듈 관리와 백오피스를 담당했습니다."
              linkUrl="https://service.prism.work/monster"
              skills={['Java', 'Spring Boot', 'MariaDB', 'Kafka', 'JPA', 'QueryDSL', 'AWS']}
              last
            >
              <BulletItem>AI 면접 서비스 백엔드 시스템 운영 및 개발, 인증/인가 모듈 관리</BulletItem>
              <BulletItem>JPA N+1 해결 및 쿼리 튜닝으로 <Mark>1,000개 → 5개 쿼리</Mark> (90%+ 개선)</BulletItem>
              <BulletItem>인증/인가 앱과 비즈니스 로직 앱 분리, Spring Cloud Gateway 적용</BulletItem>
              <BulletItem>Spring Batch 대량 이메일 발송 시스템 구축</BulletItem>
            </ProjectBlock>
          </div>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Personal Project ═══ */}
      <FadeIn delay={0.2}>
        <ResumeSection number="03" title="Personal Project">
          <ProjectBlock
            title="콘서트 예약 시스템"
            subtitle="대규모 트래픽 처리"
            period="2024.10 ~ 2024.11"
            description="대규모 트래픽을 고려한 콘서트 예약 서비스. 동시성 제어, 대기열, 이벤트 아키텍처를 종합적으로 설계했습니다."
            skills={['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Redis', 'JPA', 'Docker', 'K6', 'Grafana']}
            last
          >
            <BulletItem>비관적·낙관적·분산락(Redisson) 상황별 적용으로 <Mark>동시성 제어</Mark></BulletItem>
            <BulletItem>Redis 기반 대기열 시스템 구축, DB Index로 <Mark>쿼리 성능 14배 향상</Mark> (295ms → 21ms)</BulletItem>
            <BulletItem>Kafka + Outbox Pattern 이벤트 기반 아키텍처, K6 + Grafana 모니터링 구축</BulletItem>
          </ProjectBlock>
        </ResumeSection>
      </FadeIn>

      {/* ═══ How I Work ═══ */}
      <FadeIn delay={0.25}>
        <ResumeSection number="04" title="How I Work">
          <FadeInStagger className="space-y-2">
            <BulletItem>확장 가능하고 <Mark>유지 보수하기 용이한 구조</Mark>를 중요하게 생각합니다.</BulletItem>
            <BulletItem>개발 과정에서의 <Mark>고민과 의사결정 사항</Mark>들을 문서로 기록합니다.</BulletItem>
            <BulletItem><Mark>동료들과 함께 고민하고, 적극적으로 피드백</Mark>을 주고 받는 것을 선호합니다.</BulletItem>
            <BulletItem>정해진 기한은 반드시 지키려고 노력합니다.</BulletItem>
            <BulletItem>모르는 것은 빠르게 질문하고, 자신의 의견을 명확하게 표현합니다.</BulletItem>
            <BulletItem><Mark>AX(AI Transformation)</Mark>를 적극 활용하며, AI가 효과적으로 코드를 작성할 수 있도록 프로젝트 구조와 컨텍스트를 설계합니다.</BulletItem>
          </FadeInStagger>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Activities ═══ */}
      <FadeIn delay={0.3}>
        <ResumeSection number="05" title="Activities">
          <div className="space-y-8">
            {/* 항해 플러스 */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <h4 className="text-[14px] font-semibold text-text-primary">항해 플러스 백엔드 6기</h4>
                <span className="text-[11.5px] text-text-muted">2024.09 ~ 2024.11</span>
              </div>
              <FadeInStagger className="space-y-1.5">
                <BulletItem>과제 ALL PASS, <Mark>우수 과제 5회 선정</Mark></BulletItem>
                <BulletItem>TDD와 클린 아키텍처 기반 서버 구축</BulletItem>
                <BulletItem>비관적 락, 낙관적 락, 분산락(Redisson) 활용 동시성 제어</BulletItem>
                <BulletItem>테스트 컨테이너를 활용한 테스트 코드 작성</BulletItem>
              </FadeInStagger>
            </div>

            {/* 사내 스터디 */}
            <div>
              <h4 className="text-[14px] font-semibold text-text-primary mb-2">사내 스터디</h4>
              <FadeInStagger className="space-y-1.5">
                <BulletItem>MSA 강의 수강 — Spring Boot + Axon Framework + Kafka, Event Sourcing & CQRS 패턴 학습 (<a href="https://github.com/rueun/myFastcampusPay" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline">GitHub</a>)</BulletItem>
                <BulletItem>미션 기반 코드 리뷰 스터디 — POJO 기반 미션 수행, 코드 리뷰 경험 (<a href="https://github.com/talmood/mission-based-code-review-study" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline">GitHub</a>)</BulletItem>
              </FadeInStagger>
            </div>

            {/* 사내 세미나 */}
            <div>
              <h4 className="text-[14px] font-semibold text-text-primary mb-2">사내 개발 세미나</h4>
              <FadeInStagger className="space-y-1.5">
                <BulletItem>인증/인가 발표 — 웹에서의 인증/인가 방식 및 Spring Cloud Gateway 기반 API Gateway 설명</BulletItem>
              </FadeInStagger>
            </div>
          </div>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Education ═══ */}
      <FadeIn delay={0.35}>
        <ResumeSection number="06" title="Education" last>
          <div className="space-y-5">
            <TimelineRow period="2017–22" title="안양대학교" sub="소프트웨어 전공 · 학과 수석 졸업 · GPA 4.17 / 4.5" />
            <TimelineRow period="2021" title="SQLD" sub="한국데이터진흥원" />
            <TimelineRow period="2020" title="정보처리기사" sub="한국산업인력공단" />
          </div>
        </ResumeSection>
      </FadeIn>
    </div>
  )
}

/* ── Building Blocks ── */

function ResumeSection({ number, title, children, last }: { number: string; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className={last ? '' : 'mb-20'}>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-[13px] font-bold text-text-muted tabular-nums">{number}</span>
        <h2 className="text-[15px] font-bold text-text-primary uppercase tracking-[0.06em]">{title}</h2>
        <div className="flex-1 h-px bg-border mt-1" />
      </div>
      {children}
    </section>
  )
}

function ProjectBlock({ title, subtitle, period, description, linkUrl, skills, children, last }: {
  title: string; subtitle: string; period: string; description?: string; linkUrl?: string; skills: string[]; children: React.ReactNode; last?: boolean
}) {
  return (
    <div className={last ? '' : 'mb-10 pb-10 border-b border-border-muted'}>
      <div className="flex items-baseline gap-2 mb-1">
        {linkUrl ? (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-1 text-[14px] font-semibold text-text-primary hover:text-[#a78bfa] transition-colors">
            {title}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        ) : (
          <h4 className="text-[14px] font-semibold text-text-primary">{title}</h4>
        )}
        <span className="text-[11.5px] text-text-muted">{subtitle} · {period}</span>
      </div>
      {description && (
        <p className="text-[12.5px] text-text-secondary leading-[1.6] mb-2">{description}</p>
      )}
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.map((s) => (
          <span key={s} className="text-[10.5px] text-[#a78bfa]/70 border border-[#a78bfa]/30 rounded px-1.5 py-0.5">{s}</span>
        ))}
      </div>
      <FadeInStagger className="space-y-2">
        {children}
      </FadeInStagger>
    </div>
  )
}

function BulletItem({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <FadeInItem>
      <div className="flex items-start gap-2.5 text-[13.5px] leading-[1.65] text-text-secondary">
        <span className={`mt-[7px] w-1 h-1 rounded-full shrink-0 ${highlight ? 'bg-[#10b981]' : 'bg-text-muted'}`} />
        <span>{children}</span>
      </div>
    </FadeInItem>
  )
}

function IntroItem({ children }: { children: React.ReactNode }) {
  return (
    <FadeInItem>
      <div className="flex items-start gap-2.5 text-[13.5px] leading-[1.7] text-text-secondary">
        <span className="mt-[7px] w-1 h-1 rounded-full shrink-0 bg-[#a78bfa]" />
        <span>{children}</span>
      </div>
    </FadeInItem>
  )
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-text-primary">{children}</span>
}

function SkillCard({ label, items }: { label: string; items: { name: string; level: 'main' | 'interest' }[] }) {
  return (
    <div className="rounded-xl border border-border p-5">
      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s.name}
            className={`inline-flex items-center gap-1.5 text-[12px] rounded-full px-3 py-1 border ${
              s.level === 'interest'
                ? 'text-[#a78bfa] border-[#a78bfa]/20 bg-[#a78bfa]/5'
                : 'text-text-secondary border-border bg-surface'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              s.level === 'interest' ? 'bg-[#a78bfa]' : 'bg-[#10b981]'
            }`} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ValueCard({ text }: { text: string }) {
  return (
    <FadeInItem>
      <div className="rounded-lg bg-surface border border-border-muted p-4">
        <p className="text-[13px] text-text-secondary leading-[1.6]">{text}</p>
      </div>
    </FadeInItem>
  )
}

function TimelineRow({ period, title, sub }: { period: string; title: string; sub: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-4">
      <span className="text-[12px] text-text-muted tabular-nums pt-0.5">{period}</span>
      <div>
        <p className="text-[14px] font-semibold text-text-primary leading-snug">{title}</p>
        <p className="text-[12.5px] text-text-secondary mt-0.5 leading-relaxed">{sub}</p>
      </div>
    </div>
  )
}

function ContactIcon({ href, label, icon, external }: { href: string; label: string; icon: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-text-muted hover:text-text-primary hover:border-text-muted transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  )
}
