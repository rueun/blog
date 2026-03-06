---
title: "Spring Boot 예외 처리 전략 - @ExceptionHandler와 @ControllerAdvice"
date: 2026-03-04
description: "Spring Boot에서 전역 예외 처리를 구현하는 방법을 정리합니다. 커스텀 예외와 에러 응답 표준화를 다룹니다."
categories:
  - Development
  - Spring
tags:
  - Spring Boot
  - Exception Handling
  - REST API
  - Backend
---

## 예외 처리가 중요한 이유

일관된 에러 응답은 API 사용자 경험과 디버깅 효율성을 크게 향상시킵니다.

## 커스텀 예외

```java
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}

public enum ErrorCode {
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다"),
    INVALID_INPUT(400, "잘못된 입력입니다"),
    INTERNAL_ERROR(500, "서버 오류가 발생했습니다");

    private final int status;
    private final String message;
}
```

## 전역 예외 처리

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        return ResponseEntity
            .status(e.getErrorCode().getStatus())
            .body(new ErrorResponse(e.getErrorCode()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        return ResponseEntity
            .badRequest()
            .body(ErrorResponse.of(e.getBindingResult()));
    }
}
```

## 정리

전역 예외 처리와 표준화된 에러 응답은 안정적인 API 서비스의 기본입니다.
