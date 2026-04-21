'use client'

import Image from 'next/image'
import FadeIn from '@/components/profile/FadeIn'
import { FadeInStagger, FadeInItem } from '@/components/profile/FadeIn'
import PdfDownloadButton from '@/components/PdfDownloadButton'

export default function ResumePage() {
  return (
    <div id="resume-content" className="max-w-[920px] mx-auto px-6 pt-16 pb-28">
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
              <div className="w-px h-5 bg-border mx-1" />
              <PdfDownloadButton />
            </div>
          </div>

          <FadeInStagger className="space-y-2.5">
            <IntroItem>
              안녕하세요😃 4년차 백엔드 개발자 신은정입니다. 저는 서비스의 <Mark>기획부터 런칭까지 전 과정에 참여</Mark>한 경험이 있으며, 프로젝트 리더로서 일정과 의사결정을 주도한 경험이 있습니다.
            </IntroItem>
           <IntroItem>
              기술적 역량은 물론 <Mark>비즈니스 목표를 함께 고려</Mark>하여 문제를 해결하려 노력합니다.
            </IntroItem>
            <IntroItem>
              <Mark>도메인 주도 설계(DDD)</Mark>와 <Mark>클린 아키텍처</Mark>를 실무에 적용하며, 확장 가능하고 유지보수하기 좋은 구조를 설계합니다.
            </IntroItem>
            <IntroItem>
              <Mark>누구나 읽고 이해하기 쉬운 코드가 좋은 코드</Mark>라 생각하며, 가독성과 유지보수성을 고려한 코딩 스타일을 지향합니다.
            </IntroItem>
            <IntroItem>
              최근에는 <Mark>AX(AI Transformation)</Mark>에 관심을 갖고 있으며, AI가 코드를 잘 작성할 수 있도록 프로젝트를 구조화하고 컨텍스트를 설계하는 방법을 탐구하고 있습니다.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <SkillCard label="AI / AX" items={[
                { name: 'Claude Code', level: 'main' },
                { name: 'OpenAI Codex', level: 'main' },
                { name: 'GitHub Copilot', level: 'main' },
              ]} />
          </div>
        </ResumeSection>
      </FadeIn>

      {/* ═══ Experience ═══ */}
      <FadeIn delay={0.15}>
        <ResumeSection number="02" title="Experience">
          <div className="relative pl-6 border-l border-border">
            <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-[#10b981] ring-2 ring-base" />
            <div className="mb-1 flex items-center gap-3 flex-wrap">
              <h3 className="text-[15px] font-semibold text-text-primary">
                <a
                  href="https://www.muhayu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1 hover:text-[#a78bfa] transition-colors"
                >
                  무하유
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-1px]">
                    <path d="M7 17L17 7"/>
                    <path d="M7 7h10v10"/>
                  </svg>
                </a>
              </h3>
              <span className="text-[10px] font-semibold text-[#10b981] bg-[#10b981]/10 rounded px-1.5 py-0.5 leading-none">
                현재 재직중
              </span>
            </div>
            <p className="text-[13px] text-text-muted mb-6">백엔드 개발자 — 2022.09 ~ 현재</p>

            {/* CK TMS */}
            <ProjectBlock
              title="한양사이버대학교 논문지도시스템"
              subtitle="논문 심사 관리"
              period="2025.12 ~ 2026.03"
              description="대학교 논문 심사 프로세스를 관리하는 시스템을 클린 아키텍처 기반으로 설계·개발했습니다."
              skills={['Java', 'Spring Boot', 'Oracle', 'MyBatis', 'Spring Security', 'OpenFeign', 'Testcontainers']}
              achievements={[
                { title: '아키텍처', items: [
                  '**도메인 엔티티와 영속성 엔티티 완전 분리**로 기술 스택 변경 시 도메인 레이어 오염 없이 대응',
                  '**Port & Adapter 패턴**으로 Oracle/MyBatis 의존성을 인프라 계층에 격리',
                ]},
                { title: 'AX (AI Transformation)', items: [
                  '**Claude Code 스킬 및 CLAUDE.md** 파일을 팀 회의를 통해 정의하고 프로젝트에 적용',
                  'GitHub Actions + Claude 연동 **자동 코드 리뷰 파이프라인** 구축',
                  'AI가 효과적으로 코드를 작성할 수 있도록 **프로젝트 구조와 컨텍스트를 설계**',
                ]},
                { title: 'DDD 설계', items: [
                  'User 인터페이스 기반 **다형성**으로 Admin/Manager/Professor/Student 역할 모델링',
                  '**Value Object**와 **Collection VO** 활용',
                  '**@Builder(toBuilder=true)** 패턴으로 불변 객체 + 상태 변경 구현',
                ]},
                { title: '인프라 · 배포', items: [
                  '**WAR 빌드** 후 고객사 서버 Tomcat에 직접 배포',
                  '**GitHub Actions CI/CD** (빌드 → WAR 전송 → Tomcat 재기동 → Health Check)',
                  '**Testcontainers(Oracle)** 기반 통합 테스트 환경 구축',
                ]},
              ]}
            />

            {/* CopyKiller Lite */}
            <ProjectBlock
              title="CopyKiller Lite"
              subtitle="표이미지 표절검사"
              period="2025.09 ~ 2025.10"
              description="기존 텍스트 표절검사 서비스에 표·이미지·차트 등 시각 자료 표절검사 기능을 신규 개발하여 출시했습니다."
              linkUrl="https://www.copykiller.com/"
              skills={['Java', 'Spring Boot', 'MariaDB', 'Redis Streams', 'JPA', 'QueryDSL', 'Ceph S3']}
              achievements={[
                { title: '아키텍처', items: [
                  '**클린 아키텍처 + DDD** 기반 멀티모듈 구조 설계',
                  '**Port & Adapter 패턴**으로 외부 의존성 분리',
                ]},
                { title: '비동기 파이프라인', items: [
                  '**Redis Streams + Consumer Group** 기반 at-least-once 보장 비동기 처리',
                  '**Transactional Outbox 패턴**으로 데이터 일관성 보장',
                ]},
                { title: '서비스 안정성', items: [
                  'Dead Letter + Google Chat 알림으로 분석 실패 즉시 대응',
                  '**Presigned URL** 방식 파일 처리로 서버 부하 최소화',
                ]},
              ]}
            />

            {/* CK FactChecker */}
            <ProjectBlock
              title="CK FactChecker"
              subtitle="뉴스 기사 팩트체크 서비스"
              period="2025.08"
              description="의미적 유사도를 활용한 뉴스 기사 팩트체크 서비스를 출시했습니다."
              linkUrl="https://facts.copykiller.com/"
              skills={['Java', 'Spring Boot', 'MariaDB', 'JPA', 'QueryDSL', 'Spring WebFlux']}
              achievements={[
                { title: '아키텍처', items: [
                  '**클린 아키텍처 + DDD** 기반 멀티모듈 구조 설계',
                  '**Port & Adapter 패턴**으로 외부 API 의존성 분리',
                  '**UseCase 단위**의 명확한 비즈니스 흐름 관리',
                ]},
                { title: '안정성', items: [
                  '**AOP 기반** 관리자 권한 검증 및 IP 화이트리스트 적용',
                ]},
              ]}
            />

            {/* CopyKiller HR */}
            <ProjectBlock
              title="CopyKiller HR"
              subtitle="ATS (Applicant Tracking System)"
              period="2023.08 ~ 2025.07"
              description="채용 관리 시스템 신규 서비스를 기획부터 런칭까지 전 과정에 참여하고, 프로젝트 리더로서 일정과 의사결정을 주도했습니다."
              linkUrl="https://hr.copykiller.com"
              skills={['Java', 'Spring Boot', 'MySQL', 'JPA', 'QueryDSL', 'AWS', 'Docker', 'JUnit']}
              achievements={[
                { title: '코드 품질', items: [
                  { text: '코드 리팩토링과 테스트 도입을 통해 QA 에러 발생 건수를 약 30건에서 5건 미만으로 줄여 **QA 에러 60% 이상 감소**', sub: [
                    'Entity와 Value Object를 구분하고, 애그리거트별 JPA 관계를 최적화하여 도메인의 복잡성 완화',
                  ]},
                ]},
                { title: '성능 최적화', items: [
                  { text: '**대용량 데이터 처리 성능 최적화**를 통해 **처리 시간 90% 이상 단축** (2.37s → 80.4ms)', sub: [
                    'parallelStream 기반 병렬 처리 아키텍처 구현',
                    '트랜잭션 범위 최적화 및 쿼리 최적화를 통한 DB 커넥션 연결 횟수 최소화',
                  ]},
                ]},
                { title: '이벤트 아키텍처', items: [
                  'Spring Event를 활용해 **비관심사 분리**, 코드 가독성 및 확장성 강화',
                  '요구사항 추가/변경 시 메인 로직 수정 없이 리스너 추가/삭제로 대응',
                ]},
                { title: '결제 시스템', items: [
                  'PG사 연동 **주문/결제 시스템 설계·개발**',
                  '비관적 락을 활용한 동시성 제어 및 데이터 정합성 보장',
                ]},
                { title: '인프라', items: [
                  'GitHub Actions를 활용한 **애플리케이션 버저닝 자동화**',
                  '구글챗 알람 시스템 도입으로 장애 발생 시 평균 대응 시간 단축',
                  'Servlet Filter 인증 처리 & Spring Interceptor를 활용하여 복잡한 ATS **권한 체계 단순화**',
                  'AWS Presigned URL 도입으로 네트워크 부하 감소 및 응답 시간 단축',
                ]},
              ]}
            />

            {/* Monster */}
            <ProjectBlock
              title="Monster"
              subtitle="AI 면접 서비스"
              period="2022.09 ~ 2023.09"
              description="AI 면접 서비스의 백엔드 시스템 운영 및 개발. 인증/인가 모듈 관리와 백오피스를 담당했습니다."
              linkUrl="https://service.prism.work/monster"
              skills={['Java', 'Spring Boot', 'MariaDB', 'Kafka', 'JPA', 'QueryDSL', 'AWS']}
              achievements={[
                { title: '성능', items: [
                  'JPA N+1 문제 해결 및 쿼리 튜닝을 통해 약 1,000개의 쿼리를 5개로 줄이며 **성능을 90% 이상 개선**',
                  '외부 TTS API 연동 시, 동일 질문에 대한 캐싱 처리를 구현하여 반복적인 호출 최소화',
                ]},
                { title: '아키텍처', items: [
                  '인증/인가 애플리케이션과 비즈니스 로직 애플리케이션을 분리하여 **유지보수성 향상**, 독립적으로 관리 및 운영',
                  'Spring Cloud Gateway 기반 **API Gateway 패턴** 적용',
                ]},
                { title: '팀 기여', items: [
                  'Spring Batch를 활용해 다량의 데이터를 처리하는 **이메일 발송 시스템** 구축',
                  '신규 입사자들이 서비스를 빠르게 이해할 수 있도록 **온보딩 문서를 작성**하여 팀 내 지식 공유와 효율적인 온보딩 프로세스 지원',
                ]},
              ]}
              last
            />
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
            achievements={[
              { title: '다양한 락을 이용한 동시성 제어', items: [
                '비관적 · 낙관적 · 분산락(Redisson)을 상황에 맞게 적용하여 **동시성 문제 해결**',
                '낙관적 락(Optimistic Lock)을 활용해 좌석 예약 시스템의 데이터 정합성 확보',
                '**동시성 통합 테스트**로 안정성 검증',
              ]},
              { title: '대용량 트래픽과 데이터 처리', items: [
                '**Redis 기반 대기열** 시스템으로 트래픽 유량 제어',
                '**DB Index 적용을** 통해 대규모 데이터 처리 시 쿼리 성능 최적화(295ms -> 21ms, **14배 이상 성능 향상**)',
              ]},
              { title: '이벤트 기반 아키텍처 적용', items: [
                'Spring Event를 활용해 비관심사 분리',
                '**Kafka 및 Outbox Pattern을 적용**해 이벤트 기반 아키텍처 구현 및 이벤트 발행 보장',
                '**K6 부하 테스트 + Grafana** 실시간 모니터링 구축',
              ]},
              { title: '성능 테스트 및 모니터링 체계 구축', items: [
                'K6를 활용하여 **유저 시나리오 기반 부하 테스트 수행**',
                'Grafana 대시보드를 이용한 실시간 시스템 매트릭 모니터링',
              ]},
            ]}
            last
          />
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
              <FadeInStagger className="space-y-2">
                <BulletItem sub={[
                  'Spring Boot + Axon Framework + Kafka 프로젝트를 통한 MSA 학습',
                  'Event Sourcing & CQRS 패턴 학습',
                ]}>
                  MSA 강의 수강 (<a href="https://github.com/rueun/myFastcampusPay" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline">GitHub</a>)
                </BulletItem>
                <BulletItem sub={[
                  'POJO 기반의 미션 수행으로 프로그래밍 역량 향상',
                  '코드 리뷰 과정 경험',
                  '테스트 코드 작성 실습',
                ]}>
                  미션 기반 스터디를 통해 동료들과 함께 성장 (<a href="https://github.com/talmood/mission-based-code-review-study" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:underline">GitHub</a>)
                </BulletItem>
              </FadeInStagger>
            </div>

            {/* 사내 세미나 */}
            <div>
              <h4 className="text-[14px] font-semibold text-text-primary mb-2">사내 개발 세미나</h4>
              <FadeInStagger className="space-y-2">
                <BulletItem sub={[
                  '웹에서의 인증/인가 방식 설명',
                  'API Gateway 설명 — Spring Cloud Gateway',
                ]}>
                  인증/인가 발표
                </BulletItem>
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

interface AchievementItem {
  text: string
  sub?: string[]
}

interface Achievement {
  title: string
  items: (string | AchievementItem)[]
}

// **bold** 구문을 Mark 컴포넌트로 변환
function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <Mark key={i}>{part}</Mark> : part
  )
}

function ProjectBlock({ title, subtitle, period, description, linkUrl, skills, achievements, children, last }: {
  title: string
  subtitle: string
  period: string
  description?: string
  linkUrl?: string
  skills: string[]
  achievements?: Achievement[]
  children?: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={last ? 'pb-6' : 'mb-10 pb-10 border-b border-border-muted'}>
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
      <div className="flex flex-wrap gap-1 mb-4">
        {skills.map((s) => (
          <span key={s} className="text-[10.5px] text-[#a78bfa]/70 border border-[#a78bfa]/30 rounded px-1.5 py-0.5">{s}</span>
        ))}
      </div>
      {achievements && achievements.length > 0 ? (
        <div className="space-y-4">
          {achievements.map((a) => (
            <div key={a.title}>
              <h5 className="text-[11.5px] font-bold text-text-primary uppercase tracking-[0.06em] mb-2">
                {a.title}
              </h5>
              <FadeInStagger className="space-y-1.5">
                {a.items.map((item, i) => {
                  const text = typeof item === 'string' ? item : item.text
                  const sub = typeof item === 'string' ? undefined : item.sub
                  return (
                    <BulletItem key={i} sub={sub}>{renderBold(text)}</BulletItem>
                  )
                })}
              </FadeInStagger>
            </div>
          ))}
        </div>
      ) : (
        <FadeInStagger className="space-y-2">
          {children}
        </FadeInStagger>
      )}
    </div>
  )
}

function BulletItem({ children, highlight, sub }: { children: React.ReactNode; highlight?: boolean; sub?: string[] }) {
  return (
    <FadeInItem>
      <div className="flex items-start gap-2.5 text-[13.5px] leading-[1.65] text-text-secondary">
        <span className={`mt-[7px] w-1 h-1 rounded-full shrink-0 ${highlight ? 'bg-[#10b981]' : 'bg-text-muted'}`} />
        <div className="flex-1">
          <span>{children}</span>
          {sub && sub.length > 0 && (
            <ul className="mt-1.5 ml-3 space-y-1 border-l border-border-muted pl-3">
              {sub.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[12.5px] text-text-muted leading-[1.6]">
                  <span className="mt-[8px] w-[4px] h-px shrink-0 bg-text-muted/60" />
                  <span>{renderBold(item)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
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

const skillColors: Record<string, string> = {
  Backend: '#6b9bd2',
  Database: '#5bae8d',
  DevOps: '#c9a84c',
  Test: '#c97070',
  Tools: '#9a85c4',
  'AI / AX': '#e07a5f',
}

function SkillCard({ label, items }: { label: string; items: { name: string; level: 'main' | 'interest' }[] }) {
  const color = skillColors[label] || '#6b7280'
  return (
    <div className="rounded-xl border border-border p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-1.5 text-[12px] rounded-full px-3 py-1 border text-text-secondary border-border bg-surface"
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
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
