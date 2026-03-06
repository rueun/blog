---
title: "Spring Security + JWT 인증 구현하기"
date: 2026-03-02
description: "Spring Security와 JWT를 활용하여 토큰 기반 인증을 구현합니다. Access Token과 Refresh Token 전략을 다룹니다."
categories:
  - Development
  - Spring
tags:
  - Spring Security
  - JWT
  - Spring Boot
  - Authentication
  - Backend
---

## JWT란?

JWT(JSON Web Token)는 당사자 간 정보를 JSON 객체로 안전하게 전송하기 위한 토큰입니다.

### JWT 구조

```
Header.Payload.Signature
```

- **Header**: 알고리즘, 토큰 타입
- **Payload**: 클레임 (사용자 정보)
- **Signature**: 서명 (위변조 방지)

## Spring Security 설정

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

## 토큰 생성

```java
public String createToken(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 3600000))
        .signWith(secretKey, SignatureAlgorithm.HS256)
        .compact();
}
```

## 정리

JWT 기반 인증은 무상태(Stateless) 환경에서 효과적인 인증 방식입니다.
