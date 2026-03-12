---
title: "Spring Boot 시작하기"
date: 2026-03-05
series: "Spring Boot 완전 정복"
cover: "https://dl.dropboxusercontent.com/scl/fi/w0zho4wlgq6m8db5mvn9k/hugo-00-cover.webp?rlkey=et2tlzgb0h6blgf8klzbqjxem&raw=1"
description: "Spring Boot로 웹 애플리케이션을 시작하는 방법을 소개합니다. 프로젝트 생성부터 간단한 API 구현까지 다룹니다."
summary: |
  Spring Boot는 Spring Framework 기반의 경량 프레임워크로, 자동 설정과 내장 서버를 제공하여 빠르게 웹 애플리케이션을 구축할 수 있습니다.
  - **자동 설정**: 최소한의 설정으로 애플리케이션 실행 가능
  - **내장 서버**: Tomcat, Jetty 등 별도 서버 설치 불필요
  - **스타터 의존성**: 필요한 라이브러리를 한 번에 관리
categories:
  - Development
  - Spring
tags:
  - Spring Boot
  - Java
  - Backend
---



## Spring Boot란?

Spring Boot는 Spring Framework를 기반으로 한 프레임워크로, 최소한의 설정으로 독립적인 Spring 애플리케이션을 만들 수 있습니다.

### 장점

- 자동 설정 (Auto Configuration)
- 내장 서버 (Embedded Server)
- 스타터 의존성 (Starter Dependencies)
- 프로덕션 준비 기능

## 프로젝트 생성

Spring Initializr를 사용하여 프로젝트를 생성할 수 있습니다.

### 기본 구조

```
src/
├── main/
│   ├── java/
│   │   └── com/example/demo/
│   │       └── DemoApplication.java
│   └── resources/
│       └── application.yml
└── test/
```

## 간단한 API 만들기

```java
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

## 실행

```bash
./gradlew bootRun
```

브라우저에서 `http://localhost:8080/api/hello`로 접속하면 결과를 확인할 수 있습니다.

## 다음 단계

- JPA와 데이터베이스 연동
- REST API 설계
- 테스트 작성
