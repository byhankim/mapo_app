# [Joy Of Mapo](https://joyofmapo.site)

---

### 작업로그

#### 4월

- 11, 14~22: 기본 html, css
- 24:
  - 카카오 지도API 적용
  - Python, Selenium 크롤링(마포구청 문화관광 홈페이지)
- 26:
  - 크롤링 완성
  - 4개 페이지에 대한 데이터 전처리(pandas)
  - Geocoder-Xr 툴 사용한 주소->위경도 값 구하기
  - .shp 파일 인코딩 변환(euc-kr) 및 json 파일로 내보내기 (pandas, geopandas)
- 28:
  - title hover 효과
  - 마포구 음식점리스트 array 로 불러오기

#### 5월

- 3:
  - 단일 지도 화면에서 싱글페이지 웹으로 재구성 작업
  - 로딩시 첫화면 full page video 임베딩 및 글씨 무한 출력
- 4:
  - 첫화면 글씨 사라질시 translateY(-50%) 로 인해 커서 아래로 내려가는 문제 해결
  - 글씨 지우기 효과
  - 흥국생명 - 이서윤체 적용
  - 구조 수정 및 지도부분 내용 추가, css 추가 및 여백 설정
  - footer 처리
- 5:
  - 첫화면 아래 화살표 추가 및 애니메이션 적용
  - navbar 오프셋 보정용 scroll-margin-top 처리

### TODO

- [ ] 걷고싶은 마포
- [ ] 놀고싶은 마포
- [ ] 지도 pagination
- [ ] kakao map api로 마커 출력
- [x] (opt) 싱글페이지로 변신 & 헤더푸터 추가
