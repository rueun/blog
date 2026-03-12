---
title: "JPA 엔티티 매핑 - 연관관계 설정과 영속성 컨텍스트"
date: 2026-02-25
description: "JPA의 엔티티 매핑과 연관관계 설정 방법을 정리합니다. 영속성 컨텍스트의 동작 원리를 이해합니다."
categories:
  - Development
  - JPA
tags:
  - JPA
  - Spring Boot
  - Hibernate
  - ORM
  - Database
---

## JPA란?

JPA(Java Persistence API)는 자바 ORM 기술의 표준 인터페이스입니다.

## 엔티티 매핑

```java
@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;
}
```

## 연관관계

### 다대일 (ManyToOne)

가장 많이 사용하는 연관관계입니다. 외래 키가 있는 쪽이 연관관계의 주인입니다.

### 일대다 (OneToMany)

```java
@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Member> members = new ArrayList<>();
}
```

## 영속성 컨텍스트

- **1차 캐시**: 같은 트랜잭션 내에서 동일한 엔티티 보장
- **변경 감지(Dirty Checking)**: 엔티티 수정 시 자동 UPDATE
- **지연 로딩(Lazy Loading)**: 실제 사용 시점에 쿼리 실행

## 정리

JPA의 연관관계와 영속성 컨텍스트를 이해하면 효율적인 데이터 접근 계층을 구현할 수 있습니다.
