---
title: "Java Stream API 활용 가이드"
date: 2026-02-28
description: "Java Stream API의 핵심 기능과 실전 활용 패턴을 정리합니다. 중간 연산, 최종 연산, Collector를 다룹니다."
categories:
  - Development
  - Java
tags:
  - Java
  - Stream API
  - Functional Programming
  - Programming
---

## Stream API란?

Java 8에서 도입된 Stream API는 컬렉션 데이터를 선언적으로 처리할 수 있게 해줍니다.

## 중간 연산

```java
List<String> names = members.stream()
    .filter(m -> m.getAge() > 20)       // 필터링
    .map(Member::getName)                // 변환
    .sorted()                            // 정렬
    .distinct()                          // 중복 제거
    .collect(Collectors.toList());
```

## 최종 연산

```java
// 개수
long count = members.stream().filter(m -> m.getAge() > 20).count();

// 합계
int totalAge = members.stream().mapToInt(Member::getAge).sum();

// 그룹핑
Map<String, List<Member>> byTeam = members.stream()
    .collect(Collectors.groupingBy(Member::getTeamName));
```

## flatMap 활용

```java
List<String> allTags = posts.stream()
    .flatMap(post -> post.getTags().stream())
    .distinct()
    .collect(Collectors.toList());
```

## 주의사항

- Stream은 한 번만 사용 가능 (재사용 불가)
- 병렬 스트림(`parallelStream()`)은 신중하게 사용
- 무한 스트림 사용 시 `limit()` 필수

## 정리

Stream API를 활용하면 코드의 가독성과 표현력을 크게 향상시킬 수 있습니다.
