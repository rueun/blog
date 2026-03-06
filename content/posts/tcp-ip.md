---
title: "TCP/IP 프로토콜과 3-Way Handshake"
date: 2026-02-08
description: "TCP/IP 프로토콜 스택의 구조와 TCP 연결 수립 과정인 3-Way Handshake를 정리합니다."
categories:
  - CS
  - Network
tags:
  - TCP
  - Network
  - Protocol
  - CS
---

## TCP/IP 프로토콜 스택

| 계층 | 프로토콜 |
|------|----------|
| 애플리케이션 | HTTP, FTP, DNS |
| 전송 | TCP, UDP |
| 네트워크 | IP, ICMP |
| 데이터 링크 | Ethernet, Wi-Fi |

## TCP vs UDP

| 구분 | TCP | UDP |
|------|-----|-----|
| 연결 | 연결 지향 | 비연결 |
| 신뢰성 | 보장 | 미보장 |
| 순서 | 보장 | 미보장 |
| 속도 | 상대적 느림 | 빠름 |

## 3-Way Handshake

TCP 연결 수립 과정:

1. **SYN**: 클라이언트 → 서버 (연결 요청)
2. **SYN+ACK**: 서버 → 클라이언트 (요청 수락)
3. **ACK**: 클라이언트 → 서버 (확인)

## 4-Way Handshake (연결 종료)

1. **FIN**: 클라이언트 → 서버
2. **ACK**: 서버 → 클라이언트
3. **FIN**: 서버 → 클라이언트
4. **ACK**: 클라이언트 → 서버

## 정리

TCP의 연결 수립과 종료 과정을 이해하면 네트워크 문제를 진단하는 데 큰 도움이 됩니다.
