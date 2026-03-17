---
title: "MySQL 인덱스 원리와 쿼리 최적화"
date: 2026-02-10
description: "MySQL 인덱스의 동작 원리를 이해하고 실행 계획을 분석하여 쿼리를 최적화하는 방법을 알아봅니다."
categories:
  - Development
  - Database
tags:
  - MySQL
  - Database
  - Index
  - Performance
  - SQL
---

## 인덱스란?

인덱스는 데이터베이스 테이블의 검색 속도를 향상시키기 위한 자료구조입니다. B-Tree 기반으로 동작합니다.

## 인덱스 종류

### 클러스터형 인덱스

Primary Key에 자동 생성되며, 데이터가 물리적으로 정렬됩니다.

### 보조 인덱스

```sql
CREATE INDEX idx_member_name ON members(name);
CREATE INDEX idx_member_name_age ON members(name, age);
```

## 실행 계획 분석

```sql
EXPLAIN SELECT * FROM members WHERE name = '홍길동';
```

| type | 설명 |
|------|------|
| const | PK 또는 Unique로 1건 조회 |
| ref | 인덱스를 통한 동등 비교 |
| range | 인덱스 범위 스캔 |
| ALL | 풀 테이블 스캔 |

## 커버링 인덱스

```sql
-- 인덱스만으로 쿼리를 처리 (Extra: Using index)
SELECT name FROM members WHERE name = '홍길동';
```

## 정리

적절한 인덱스 설계와 실행 계획 분석은 데이터베이스 성능의 핵심입니다.
