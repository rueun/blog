---
title: "Kubernetes 입문 - Pod, Service, Deployment 이해하기"
date: 2026-02-20
description: "Kubernetes의 핵심 오브젝트인 Pod, Service, Deployment의 개념과 사용법을 정리합니다."
categories:
  - DevOps
  - Kubernetes
tags:
  - Kubernetes
  - Container
  - DevOps
  - Pod
  - Deployment
---

## Kubernetes란?

Kubernetes(K8s)는 컨테이너화된 애플리케이션의 배포, 스케일링, 관리를 자동화하는 오픈소스 플랫폼입니다.

## 핵심 오브젝트

### Pod

Pod는 K8s에서 가장 작은 배포 단위입니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:1.0
      ports:
        - containerPort: 8080
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:1.0
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

## 기본 명령어

```bash
kubectl get pods
kubectl get services
kubectl apply -f deployment.yaml
kubectl logs my-app-pod
```

## 정리

Kubernetes의 핵심 오브젝트를 이해하면 컨테이너 오케스트레이션의 기본을 갖출 수 있습니다.
