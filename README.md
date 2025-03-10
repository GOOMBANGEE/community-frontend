# Community

## 개요

게시글, 댓글작성 게시판

## 환경

- 리액트 18.2
- 스프링부트 3.2
- MySQL 8.0

## 프로젝트 구조

| 디렉토리명              | 역할       | 비고 |
|--------------------|----------|----|
| community.frontend | 리액트 소스   |
| community.backend  | 스프링부트 소스 |

### 시작하기

```shell
npm install
npm run dev
```

### 프론트엔드 구성

- 인증(JWT)
- 계정 관리 기능
    - 닉네임 변경
    - 비밀번호 변경
    - 비밀번호 찾기
    - 탈퇴
- 게시글, 댓글 관리 기능
    - 게시글, 댓글 CRUD
    - 게시글 추천
    - 게시글 검색
    - 게시글, 댓글 페이지
- 모바일, 태블릿, 데스크탑 사이즈별 css
