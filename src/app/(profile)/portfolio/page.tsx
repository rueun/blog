'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/profile/FadeIn'
import PdfDownloadButton from '@/components/PdfDownloadButton'

type Tab = 'work' | 'personal'

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const isPrint = searchParams.get('print') === 'true'
  const [tab, setTab] = useState<Tab>('work')
  const [allOpen, setAllOpen] = useState(isPrint)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'work', label: '회사 프로젝트' },
    { key: 'personal', label: '개인 프로젝트' },
  ]

  return (
    <div id="portfolio-content" className="max-w-[920px] mx-auto px-6 pt-16 pb-28">
      <FadeIn>
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight mb-2">
              Portfolio
            </h1>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-[480px]">
              각 프로젝트를 클릭하면 담당 업무와 주요 성과를 확인할 수 있습니다.
            </p>
          </div>
          <PdfDownloadButton onBeforePrint={() => setAllOpen(true)} />
        </div>

        {/* 탭 */}
        <div className="flex items-center gap-1 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="relative px-3 py-1.5 text-[13px] font-medium transition-colors"
            >
              <span className={tab === t.key ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}>
                {t.label}
              </span>
              {tab === t.key && (
                <motion.div
                  layoutId="portfolio-tab"
                  className="absolute inset-x-1 -bottom-[1px] h-[2px] bg-[#a78bfa] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="space-y-5">
        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="01"
            title="한양사이버대학교 논문지도시스템"
            subtitle="논문 심사 관리"
            period="2025.12 ~ 2026.03"
            type="회사 프로젝트"
            description="대학교 논문 심사 프로세스를 관리하는 시스템을 클린 아키텍처 기반으로 설계·개발했습니다. 도메인 엔티티와 영속성 엔티티를 분리하여 기술 스택 변경 시 최소한의 코드 수정으로 대응할 수 있는 구조를 구현했습니다."
            skills={['Java', 'Spring Boot', 'Oracle', 'MyBatis', 'Spring Security', 'Junit', 'AssertJ', 'OpenFeign', 'Testcontainers']}
            roles={[
              '백엔드 아키텍처 설계 및 개발',
              '클린 아키텍처 기반 멀티 레이어 구조 설계',
              'WAR 패키징 및 고객사 Tomcat 직접 배포',
              'Claude Code 기반 AX 워크플로우 구축 및 팀 적용',
            ]}
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
            reflection={[
              'AX를 팀 단위로 적용하면서, AI와 협업하기 위해서는 **프로젝트 구조 자체가 잘 정리**되어 있어야 한다는 것을 깨달았습니다.',
              '팀원들과 함께 CLAUDE.md와 스킬을 정의하면서 **코딩 컨벤션과 아키텍처 규칙을 자연스럽게 문서화**할 수 있었습니다.',
            ]}
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="02"
            title="CopyKiller Lite"
            subtitle="표이미지 표절검사"
            period="2025.09 ~ 2025.10"
            type="회사 프로젝트"
            description="기존 텍스트 표절검사 서비스에 표·이미지·차트 등 시각 자료 표절검사 기능을 신규 개발하여 출시했습니다. 문서 업로드부터 AI 기반 분석, 결과 조회까지 전체 백엔드 파이프라인을 설계·구현했습니다."
            skills={['Java', 'Spring Boot', 'MariaDB', 'Redis Streams', 'JPA', 'QueryDSL', 'Ceph S3', 'Docker']}
            linkUrl="https://www.copykiller.com/"
            image="/images/portfolio/copykiller-lite.png"
            roles={[
              '표이미지 표절검사 백엔드 전체 설계 및 개발',
              '비동기 분석 파이프라인 설계 (Redis Streams)',
              'Ceph S3 연동 파일 업로드/다운로드 시스템 구축',
              'JWT(Ed25519) 기반 인증/인가 구현',
            ]}
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
            reflection={[
              '클린 아키텍처 시리즈 블로그 포스팅으로 설계 과정을 정리하며, **도메인 상태 머신·Port & Adapter·Redis Streams 파이프라인** 등 핵심 설계를 체계적으로 문서화했습니다.',
            ]}
            reflectionLink={{ label: '클린 아키텍처 시리즈 보기', url: '/posts/clean-arch-01-intro' }}
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="03"
            title="CK FactChecker"
            subtitle="뉴스 기사 팩트체크 서비스"
            period="2025.08"
            type="회사 프로젝트"
            description="의미적 유사도를 활용한 뉴스 기사 팩트체크 서비스를 출시했습니다."
            skills={['Java', 'Spring Boot', 'MariaDB', 'JPA', 'QueryDSL', 'Spring WebFlux', 'Docker']}
            linkUrl="https://facts.copykiller.com/"
            image="/images/portfolio/ck-factchecker.png"
            roles={[
              '팩트체크 서비스 백엔드 설계 및 개발',
              '관리자 API 및 모니터링 시스템 구현',
              'Dead Letter 기반 장애 알림 시스템 구축',
            ]}
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
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="04"
            title="CopyKiller HR"
            subtitle="ATS (Applicant Tracking System)"
            period="2023.08 ~ 2025.07"
            type="회사 프로젝트"
            description="채용 관리 시스템 신규 서비스를 기획부터 런칭까지 전 과정에 참여하고, 프로젝트 리더로서 일정과 의사결정을 주도했습니다."
            skills={['Java', 'Spring Boot', 'MySQL', 'JPA', 'QueryDSL', 'AWS', 'Docker', 'JUnit']}
            roles={[
              '서비스 기획, 개발, 테스트, 출시까지 전 과정 참여',
              '프로젝트 리더 역할로 일정 및 진척도 관리',
              'PG사 연동 주문/결제 시스템 설계·개발',
              'GitHub Actions 기반 CI/CD 구축',
              '구글챗 장애 알람 시스템 도입',
            ]}
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
            reflection={[
              '프로덕트에 대한 의견을 많이 내게 되면서, 개발자도 **비즈니스적인 사고**를 갖고 참여하는 것이 중요하다는 점을 깨달았습니다.',
              '이벤트를 활용해 비관심사를 분리하면서 중요성을 알게 되었습니다. 요구사항 추가/변경 시, 메인 로직은 변경하지 않고 이벤트에 대한 리스너들을 추가/삭제함으로써 **변경에 용이한 구조**의 가치를 경험할 수 있었습니다.',
              '대용량 데이터 처리 최적화 과정에서 **성능 병목점을 식별**하고 병렬 처리를 통해 해결하는 경험을 통해, 시스템 성능 개선에 대한 **체계적인 접근법**을 습득했습니다.',
            ]}
            image="/images/portfolio/copykiller-hr.png"
            linkUrl="https://hr.copykiller.com"
          />
        </div>

        <div className={tab !== 'personal' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="05"
            title="콘서트 예약 시스템"
            period="2024.10 ~ 2024.11"
            type="개인 프로젝트"
            description="대규모 트래픽을 고려한 콘서트 예약 서비스. 동시성 제어, 대기열, 이벤트 아키텍처를 종합적으로 설계했습니다."
            skills={['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Redis', 'JPA', 'QueryDsl', 'Docker', 'K6', 'Grafana', 'Junit', 'AssertJ', 'Testcontainers']}
            roles={[
              '서비스 아키텍처 전체 설계 및 구현',
              '다양한 락을 이용한 동시성 제어',
              'Redis 기반 대기열 시스템 구축',
              'Kafka 이벤트 기반 아키텍처 설계',
              'K6 + Grafana 성능 테스트 및 모니터링',
            ]}
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
            githubUrl="https://github.com/rueun/hhplus-concert-reservation"
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard defaultOpen={allOpen}
            number="06"
            title="Monster"
            subtitle="AI 면접 서비스"
            period="2022.09 ~ 2023.09"
            type="회사 프로젝트"
            description="AI 면접 서비스의 백엔드 시스템 운영 및 개발 담당. 인증/인가 모듈 관리와 백오피스 개발을 통해 면접 응시 데이터의 전처리부터 결과 도출까지 데이터 플로우 관리에 기여했습니다."
            skills={['Java', 'Spring Boot', 'MariaDB', 'Kafka', 'JPA', 'QueryDSL', 'AWS', 'Docker']}
            linkUrl="https://service.prism.work/monster"
            roles={[
              'AI 면접 서비스 백엔드 시스템 운영 및 개발',
              '인증/인가 모듈 관리',
              '백오피스 개발 (데이터 전처리~결과 도출)',
              'Spring Batch 이메일 발송 시스템 구축',
            ]}
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
            reflection={[
              'Spring Cloud Gateway를 활용하여 API Gateway 패턴을 적용한 앱들을 관리하며, **API 관리 및 효율적인 라우팅 방식**을 익혔습니다.',
              '불필요한 JPA 관계가 시스템에 악영향을 미칠 수 있음을 깨닫고, 논리적인 관계를 유지하는 방식이 유지보수에 유리하다는 점을 배웠습니다. 이를 통해 **도메인 주도 설계(DDD)**의 중요성을 인식하고, 응집도 높은 도메인 모델을 만들기 위한 방법을 이해하게 되었습니다.',
            ]}
            image="/images/portfolio/ai-interview.jpg"
          />
        </div>
      </div>
    </div>
  )
}
