'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/profile/FadeIn'

type Tab = 'work' | 'personal'

export default function PortfolioPage() {
  const [tab, setTab] = useState<Tab>('work')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'work', label: '회사 프로젝트' },
    { key: 'personal', label: '개인 프로젝트' },
  ]

  return (
    <div className="max-w-[920px] mx-auto px-6 pt-16 pb-28">
      <FadeIn>
        <div className="mb-10">
          <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight mb-2">
            Portfolio
          </h1>
          <p className="text-[14px] text-text-secondary leading-relaxed max-w-[480px]">
            각 프로젝트를 클릭하면 담당 업무와 주요 성과를 확인할 수 있습니다.
          </p>
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
          <ProjectCard
            number="01"
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
                '클린 아키텍처 + DDD 기반 멀티모듈 구조 설계 (visual, analysis-processor, core, support)',
                'Port & Adapter 패턴으로 Ceph 스토리지·외부 AI API 의존성 분리',
                '도메인 상태 머신으로 분석 단계(추출 → 후보탐색 → 표절판정) 전이 규칙 캡슐화',
              ]},
              { title: '비동기 파이프라인', items: [
                'Redis Streams + Consumer Group 기반 at-least-once 보장 비동기 처리',
                'visual(API 서버)과 analysis-processor(워커) 이중 애플리케이션 구조로 역할 분리',
                '트랜잭션 커밋 후 이벤트 발행으로 데이터 일관성 보장',
              ]},
              { title: '서비스 안정성', items: [
                'Dead Letter + Google Chat 알림으로 분석 실패 즉시 대응',
                'Soft Delete 적용으로 데이터 복원 가능성 확보',
                'Presigned URL 방식 파일 처리로 서버 부하 최소화',
              ]},
            ]}
            reflection="클린 아키텍처 시리즈 블로그 포스팅으로 설계 과정을 정리하며, 도메인 상태 머신·Port & Adapter·Redis Streams 파이프라인 등 핵심 설계를 체계적으로 문서화했습니다."
            reflectionLink={{ label: '클린 아키텍처 시리즈 보기', url: '/posts/clean-arch-01-intro' }}
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard
            number="02"
            title="CK FactChecker"
            subtitle="뉴스 기사 팩트체크 서비스"
            period="2025.08"
            type="회사 프로젝트"
            description="지식 트리플 기반 의미적 유사도를 활용한 뉴스 기사 팩트체크 서비스를 기획부터 출시까지 개발했습니다. 기존 문장 간 거리 기반 유사도가 아닌 지식 트리플 기반 팩트체크 기술을 제품화했습니다."
            skills={['Java', 'Spring Boot', 'MariaDB', 'JPA', 'QueryDSL', 'Spring WebFlux', 'Docker']}
            linkUrl="https://facts.copykiller.com/"
            image="/images/portfolio/ck-factchecker.png"
            roles={[
              '팩트체크 서비스 백엔드 설계 및 개발',
              'Synthy API 연동 파이프라인 구축',
              '관리자 API 및 모니터링 시스템 구현',
              'Dead Letter 기반 장애 알림 시스템 구축',
            ]}
            achievements={[
              { title: '아키텍처', items: [
                '클린 아키텍처 + DDD 기반 멀티모듈 구조 설계 (facts, dsu, core, support)',
                'Port & Adapter 패턴으로 외부 API(Synthy) 의존성 분리',
                'UseCase 단위의 명확한 비즈니스 흐름 관리',
              ]},
              { title: '팩트체크 파이프라인', items: [
                '뉴스 기사 → 문장 분할 → 개체명 인식 → 지식 트리플 구축 → 유사도 비교 파이프라인 구현',
                '세그먼트별 유사·모순·근거 없는 주장 판별 로직 개발',
              ]},
              { title: '안정성', items: [
                'Dead Letter + Google Chat 알림으로 장애 대응 시간 단축',
                'AOP 기반 관리자 권한 검증 및 IP 화이트리스트 적용',
              ]},
            ]}
            reflection="처음 시도하는 팩트체크 기술을 제품 수준으로 출시한 프로젝트로, 범위를 좁혀 가능성을 검증한 뒤 확장하는 접근 방식의 가치를 깨달았습니다."
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard
            number="03"
            title="CopyKiller HR"
            subtitle="ATS (Applicant Tracking System)"
            period="2023.08 ~ 2025.07"
            type="회사 프로젝트"
            description="채용 관리 시스템 신규 서비스를 기획부터 런칭까지 전 과정에 참여하고, 프로젝트 리더로서 일정과 기술적 의사결정을 주도했습니다."
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
                'Entity와 Value Object를 구분하고 애그리거트별 JPA 관계 최적화',
                '코드 리팩토링과 테스트 도입으로 QA 에러 60% 이상 감소 (30건 → 5건 미만)',
              ]},
              { title: '성능 최적화', items: [
                'parallelStream 기반 병렬 처리 아키텍처 구현',
                '트랜잭션 범위 + 쿼리 최적화로 처리 시간 90% 단축 (2.37s → 80.4ms)',
              ]},
              { title: '이벤트 아키텍처', items: [
                'Spring Event를 활용해 비관심사 분리, 코드 확장성 강화',
                '요구사항 변경 시 메인 로직 수정 없이 리스너 추가/삭제로 대응',
              ]},
              { title: '결제 시스템', items: [
                'PG사 연동 주문/결제 시스템 설계 · 개발',
                '비관적 락을 활용한 동시성 제어 및 데이터 정합성 보장',
              ]},
              { title: '인프라', items: [
                'GitHub Actions 버저닝 자동화',
                '구글챗 알람 시스템으로 장애 대응 시간 단축',
                'Presigned URL로 네트워크 부하 감소',
              ]},
            ]}
            reflection="개발자도 비즈니스적인 사고를 갖고 참여하는 것이 중요하다는 점을 깨달았습니다. 이벤트 기반 설계를 통해 변경에 용이한 구조의 가치를 실감했습니다."
            image="/images/portfolio/copykiller-hr.png"
            linkUrl="https://hr.copykiller.com"
          />
        </div>

        <div className={tab !== 'personal' ? 'hidden' : ''}>
          <ProjectCard
            number="04"
            title="콘서트 예약 시스템"
            period="2024.10 ~ 2024.11"
            type="개인 프로젝트"
            description="대규모 트래픽을 고려한 콘서트 예약 서비스. 동시성 제어, 대기열, 이벤트 아키텍처를 종합적으로 설계했습니다."
            skills={['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Redis', 'JPA', 'Docker', 'K6', 'Grafana']}
            roles={[
              '서비스 아키텍처 전체 설계 및 구현',
              '다양한 락을 이용한 동시성 제어',
              'Redis 기반 대기열 시스템 구축',
              'Kafka 이벤트 기반 아키텍처 설계',
              'K6 + Grafana 성능 테스트 및 모니터링',
            ]}
            achievements={[
              { title: '동시성 제어', items: [
                '비관적 · 낙관적 · 분산락(Redisson)을 상황에 맞게 적용',
                '낙관적 락으로 좌석 예약 데이터 정합성 확보',
                '동시성 통합 테스트로 안정성 검증',
              ]},
              { title: '트래픽 처리', items: [
                'Redis 기반 대기열 시스템으로 유량 제어',
                'DB Index 적용으로 쿼리 성능 14배 향상 (295ms → 21ms)',
              ]},
              { title: '이벤트 · 모니터링', items: [
                'Kafka + Outbox Pattern으로 이벤트 발행 보장',
                'K6 부하 테스트 + Grafana 실시간 모니터링 구축',
              ]},
            ]}
            githubUrl="https://github.com/rueun/hhplus-concert-reservation"
          />
        </div>

        <div className={tab !== 'work' ? 'hidden' : ''}>
          <ProjectCard
            number="05"
            title="Monster"
            subtitle="AI 면접 서비스"
            period="2022.09 ~ 2023.09"
            type="회사 프로젝트"
            description="AI 면접 서비스의 백엔드 시스템 운영 및 개발. 인증/인가 모듈 관리와 백오피스를 담당했습니다."
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
                'JPA N+1 해결 및 쿼리 튜닝으로 1,000개 → 5개 쿼리 (90%+ 개선)',
                '외부 TTS API 캐싱 처리로 반복 호출 최소화',
              ]},
              { title: '아키텍처', items: [
                '인증/인가 앱과 비즈니스 로직 앱 분리로 유지보수성 향상',
                'Spring Cloud Gateway 기반 API Gateway 패턴 적용',
              ]},
              { title: '팀 기여', items: [
                'Spring Batch 대량 이메일 발송 시스템 구축',
                '온보딩 문서 작성으로 팀 내 지식 공유 체계 구축',
              ]},
            ]}
            reflection="불필요한 JPA 관계가 시스템에 미치는 악영향을 경험하며, 도메인 주도 설계(DDD)의 중요성을 깊이 인식하게 되었습니다."
            image="/images/portfolio/ai-interview.jpg"
          />
        </div>
      </div>
    </div>
  )
}
