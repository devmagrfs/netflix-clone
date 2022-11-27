# 유튜브 클론코딩 미니 프로젝트
## [배포 사이트](https://deft-souffle-bf11f5.netlify.app)

<br>

## 소개
- 유튜브 클론코딩 미니 프로젝트

<br>

## 기술 스택
- React.js with TypeScript (Create React App with yarn)
- [Style] TailwindCSS
- [Router] react-router-dom
- [Icon] react-icons
- [Date] timeago.js
- [Deploy] Netlify

<br>

## 구현 사항
### 라우팅
- [x] Youtube 아이콘 클릭 시, 메인 페이지로 이동
- [x] 검색 시, 키워드를 이용. `/videos/keyword` 로 이동
- [x] 비디오 카드 클릭 시, 해당 비디오 디테일 페이지로 이동
- [x] 관련 영상 카드 클릭 시, 해당 비디오 디테일 페이지로 이동

### 헤더
- [x] 아이콘 클릭 시, 메인 페이지로 이동
- [x] 검색 기능 구현
  - [x] Youtube Data API를 이용해서 검색 기능 구현

### 메인 페이지 & 검색 결과 페이지
- [x] 유튜브 데이터 받아와서 페이지에 보여주기
- [x] Skeleton UI 구현하기
  - [x] 데이터 받아오는 도중
  - [x] 이미지 로딩중
- [x] 검색 결과물을 데이터 받아와서 검색 결과 페이지에 보여주기 (메인 페이지와 동일한 레이아웃)

### 비디오 카드 디테일 페이지
- [x] 유튜브 비디오 데이터 받아와서 보여주기
- [x] 해당 비디오와 관련된 연관 비디오 리스트 보여주기
- [x] Skeleton UI 구현하기
  - [x] 데이터 받아오는 도중
  - [x] 비디오 로딩중

### 반응형
- [x] 특정 화면 크기에 따라서 반응형 구현하기

### 스크롤
- [x] 페이지 이동 시, 최상단으로 스크롤 이동

