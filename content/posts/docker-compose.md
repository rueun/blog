---
title: "Docker Compose로 멀티 컨테이너 환경 구성하기"
date: 2026-02-18
description: "Docker Compose를 활용하여 여러 컨테이너를 한 번에 관리하는 방법을 알아봅니다. Spring Boot + MySQL 환경을 예제로 구성합니다."
categories:
  - DevOps
  - Docker
tags:
  - Docker
  - Docker Compose
  - MySQL
  - Spring Boot
---

## Docker Compose란?

Docker Compose는 여러 컨테이너를 정의하고 한 번에 실행할 수 있게 해주는 도구입니다.

## docker-compose.yml 작성

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/mydb

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

## 주요 명령어

```bash
# 컨테이너 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f app

# 컨테이너 중지 및 제거
docker-compose down
```

## 정리

Docker Compose를 사용하면 복잡한 멀티 컨테이너 애플리케이션을 쉽게 관리할 수 있습니다.
