'use client'

import Image from 'next/image'
import FadeIn from '@/components/profile/FadeIn'
import { FadeInStagger, FadeInItem } from '@/components/profile/FadeIn'

export default function ResumePage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 pt-16 pb-28">
      {/* ═══ Hero ═══ */}
      <FadeIn>
        <section className="mb-20">
          <div className="flex items-start gap-5 mb-8">
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
            </div>
          </div>

          <p className="text-[15px] text-text-secondary leading-[1.75] max-w-[580px]">
            서비스의 기획부터 런칭까지 리드한 경험이 있는 3년차 백엔드 개발자입니다.
            도메인 주도 설계와 이벤트 기반 아키텍처를 실무에 적용하며,
            대용량 데이터 처리 최적화와 코드 품질 개선에 집중합니다.
          </p>

          <div className="flex items-center gap-6 mt-6">
            <ContactLink href="mailto:rueun0302@gmail.com" label="rueun0302@gmail.com" />
            <ContactLink href="https://github.com/rueun" label="github.com/rueun" external />
          </div>
        </section>
      </FadeIn>

      {/* ═══ Experience ═══ */}
      <FadeIn delay={0.1}>
        <ResumeSection number="01" title="Experience">
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

      {/* ═══ Skills ═══ */}
      <FadeIn delay={0.15}>
        <ResumeSection number="02" title="Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillCard label="Backend" items={[
              { name: 'Java', level: 'main' },
              { name: 'Spring Boot', level: 'main' },
              { name: 'Spring MVC', level: 'main' },
              { name: 'Spring Batch', level: 'main' },
              { name: 'Spring Cloud Gateway', level: 'main' },
              { name: 'JPA', level: 'main' },
              { name: 'QueryDSL', level: 'main' },
              { name: 'WebFlux', level: 'interest' },
              { name: 'Kotlin', level: 'interest' },
            ]} />
            <SkillCard label="Database" items={[
              { name: 'MySQL', level: 'main' },
              { name: 'MariaDB', level: 'main' },
              { name: 'Redis', level: 'main' },
              { name: 'Kafka', level: 'interest' },
            ]} />
            <SkillCard label="DevOps" items={[
              { name: 'AWS EC2 / S3', level: 'main' },
              { name: 'Docker', level: 'main' },
              { name: 'GitHub Actions', level: 'main' },
              { name: 'GitLab', level: 'interest' },
            ]} />
            <SkillCard label="Tools" items={[
              { name: 'IntelliJ', level: 'main' },
              { name: 'VS Code', level: 'main' },
              { name: 'Git', level: 'main' },
              { name: 'Notion', level: 'main' },
              { name: 'Jira', level: 'interest' },
              { name: 'Confluence', level: 'interest' },
            ]} />
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
            skills={['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Redis', 'JPA', 'Docker', 'K6', 'Grafana']}
            last
          >
            <BulletItem>비관적·낙관적·분산락(Redisson) 상황별 적용으로 <Mark>동시성 제어</Mark></BulletItem>
            <BulletItem>Redis 기반 대기열 시스템 구축, DB Index로 <Mark>쿼리 성능 14배 향상</Mark> (295ms → 21ms)</BulletItem>
            <BulletItem>Kafka + Outbox Pattern 이벤트 기반 아키텍처, K6 + Grafana 모니터링 구축</BulletItem>
          </ProjectBlock>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Values ═══ */}
      <FadeIn delay={0.25}>
        <ResumeSection number="04" title="Values">
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ValueCard text="확장 가능하고 유지 보수하기 용이한 구조를 설계합니다." />
            <ValueCard text="고민과 의사결정 과정을 문서로 기록합니다." />
            <ValueCard text="동료와 적극적으로 피드백을 주고 받습니다." />
            <ValueCard text="모르는 것은 빠르게 질문하고 명확하게 표현합니다." />
          </FadeInStagger>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Activities ═══ */}
      <FadeIn delay={0.3}>
        <ResumeSection number="05" title="Activities">
          <div className="space-y-5">
            <TimelineRow period="2024" title="항해 플러스 백엔드 6기" sub="과제 ALL PASS · 우수 과제 5회 선정 · TDD, 클린 아키텍처, 동시성 제어" />
            <TimelineRow period="사내" title="스터디 & 세미나" sub="MSA 강의 수강 · 코드 리뷰 스터디 · 인증/인가 세미나 발표" />
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
    <section className={last ? '' : 'mb-16'}>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-[11px] font-semibold text-text-muted tabular-nums">{number}</span>
        <h2 className="text-[13px] font-semibold text-text-primary uppercase tracking-[0.08em]">{title}</h2>
        <div className="flex-1 h-px bg-border mt-1" />
      </div>
      {children}
    </section>
  )
}

function ProjectBlock({ title, subtitle, period, skills, children, last }: {
  title: string; subtitle: string; period: string; skills: string[]; children: React.ReactNode; last?: boolean
}) {
  return (
    <div className={last ? '' : 'mb-8'}>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <div className="flex items-baseline gap-2">
          <h4 className="text-[14px] font-semibold text-text-primary">{title}</h4>
          <span className="text-[11.5px] text-text-muted">{subtitle}</span>
        </div>
        <span className="text-[11.5px] text-text-muted tabular-nums shrink-0">{period}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.map((s) => (
          <span key={s} className="text-[10.5px] text-[#a78bfa] border border-[#a78bfa] bg-[#a78bfa]/5 rounded px-1.5 py-0.5">{s}</span>
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

function ContactLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-[13px] text-text-muted hover:text-text-primary transition-colors"
    >
      {label}
    </a>
  )
}
