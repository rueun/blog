---
title: "JPA N+1 문제 해결과 쿼리 최적화"
date: 2026-02-27
description: "JPA에서 자주 발생하는 N+1 문제의 원인과 해결 방법을 정리합니다. Fetch Join, EntityGraph, BatchSize를 활용한 최적화 전략을 알아봅니다."
categories:
  - Development
  - JPA
tags:
  - JPA
  - Spring Boot
  - Hibernate
  - Performance
  - Database
---

## N+1 문제란?

연관된 엔티티를 조회할 때 1번의 쿼리로 N개의 엔티티를 가져온 후, 각 엔티티의 연관 데이터를 조회하기 위해 N번의 추가 쿼리가 발생하는 문제입니다.

## 해결 방법

### 1. Fetch Join

```java
@Query("SELECT m FROM Member m JOIN FETCH m.team")
List<Member> findAllWithTeam();
```

### 2. EntityGraph

```java
@EntityGraph(attributePaths = {"team"})
@Query("SELECT m FROM Member m")
List<Member> findAllWithTeamGraph();
```

### 3. BatchSize

```yaml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 100
```

## 쿼리 로그 확인

```yaml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
logging:
  level:
    org.hibernate.SQL: DEBUG
```

## 정리

N+1 문제를 인지하고 적절한 전략을 선택하는 것이 JPA 성능 최적화의 핵심입니다.
