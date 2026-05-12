# 🏃‍♂️ Runners Gear

**Github Actions & AWS Amplify를 활용한 배포 자동화 프로젝트**

> 본 프로젝트는 **생성형 AI를 활용**하여 React 웹 시스템을 구축하고, **Github Actions**와  
**AWS Amplify** 기반의 **CI/CD** 환경을 구현하는 데 중점을 둔 **배포 자동화 실습 과제**입니다.



## 1. 시스템 소개

**Runners Gear**는 러너들을 위한 러닝 용품 쇼핑몰 시스템입니다.

### 주요 기능

* **상품 목록:** AI가 생성한 가상의 러닝 용품 목록 전시

* **장바구니:** 사용자 편의를 위한 장바구니 담기 기능

* **반응형 화면:** 모바일과 PC 어디서든 최적화된 쇼핑 경험



## 2. 기술 스택

* **Frontend:** React, JavaScript

* **CI/CD:** GitHub Actions, AWS S3, AWS Amplify



## 3. Github Actions 환경 

### **Github Actions로 CI/CD 환경 구축**

* **경로:** `.github/workflows/deploy.yml`  

* **워크플로우 순서**

  **1. 소스 코드 체크아웃:** Github 저장소의 최신 코드를 실행 환경으로 가져오기

  **2. Node.js 환경 구축:** React 빌드에 필요한 Node.js 설치 및 패키지 캐시 설정 수행

  **3. 의존성 패키지 설치:** 프로젝트 실행에 필요한 라이브러리 설치

  **4. 프로젝트 빌드:** React 소스 코드를 배포 가능한 정적 파일(HTML/CSS/JS)로 변환

  **5. AWS 인증 설정:** Github Secrets를 통해 AWS Access Key 및 세션 토큰 권한 획득

  **6. AWS S3:** 빌드된 파일을 지정된 AWS S3 버킷으로 전송하여 배포



## 4. 시연

### **AWS 배포 URL** (⚠️ 세션 4시간만 유효)

* **AWS S3:** http://mybucket-20263588.s3-website-us-east-1.amazonaws.com/

* **AWS Amplify:** https://main.djqqs3k0c431n.amplifyapp.com/

### **시연 영상**

* **Github Actions 🔗** [YouTube 링크](https://youtu.be/EjI-ZRL-WVQ)

* **AWS Amplify 🔗** [YouTube 링크](https://youtu.be/uF4v6xhw4cg)



## 5. 실행 방법 (Local)

```
# 리포지토리 복제
git clone https://github.com/msethrc/dmu-react-to-aws-s3.git

# 도구 설치
npm install

# 로컬 서버 실행
npm start
```
