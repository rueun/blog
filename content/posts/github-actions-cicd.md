---
title: "GitHub Actions로 CI/CD 파이프라인 구축하기"
date: 2026-02-22
description: "GitHub Actions를 활용하여 Spring Boot 프로젝트의 빌드, 테스트, 배포를 자동화하는 방법을 알아봅니다."
categories:
  - DevOps
  - CI/CD
tags:
  - GitHub Actions
  - CI/CD
  - Spring Boot
  - DevOps
  - Docker
---

## GitHub Actions란?

GitHub Actions는 GitHub에서 제공하는 CI/CD 플랫폼으로, 코드 푸시, PR 생성 등의 이벤트에 반응하여 자동화된 워크플로우를 실행합니다.

## Workflow 작성

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Build with Gradle
        run: ./gradlew build

      - name: Run tests
        run: ./gradlew test

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to server
        run: echo "Deploying..."
```

## 정리

GitHub Actions를 통해 코드 품질을 유지하면서 빠르게 배포할 수 있는 파이프라인을 구축할 수 있습니다.
