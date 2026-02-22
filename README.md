# 울산상사 USCOMPANY - 리폼 서비스 랜딩

낡은 레자, 수거 없이 현장에서 당일 즉시 리폼을 강조하는 랜딩 페이지입니다.  
Matter.js 기반 중력 낙하 효과와 드래그/던지기 인터랙션을 적용했습니다.

## 구성

- `index.html` - 메인 마크업
- `style.css` - 스타일 (딥 네이비 #001f3f, 오렌지 포인트)
- `script.js` - Matter.js 물리 엔진, 메뉴/네비 동작
- `image/` - 시공사례 갤러리 이미지 (01.jpg ~ 06.jpg 등 원하시는 이름으로 추가)

## 시공사례 이미지

`image/` 폴더에 아래 파일명으로 사진을 넣어주세요.

- `01.jpg`, `02.jpg`, `03.jpg`, `04.jpg`, `05.jpg`, `06.jpg`

이미지 개수를 바꾸려면 `index.html`의 갤러리 그리드 부분을 수정하면 됩니다.  
갤러리 이미지는 `object-fit: contain`으로 원본 비율을 유지합니다.

## 카카오 오픈채팅 링크

`index.html`에서 `btn-kakao` 링크의 `href`를 실제 오픈채팅 URL로 변경해주세요.

```html
<a href="https://open.kakao.com/o/실제링크" class="btn-kakao" ...>
```

## 로컬 실행

프로젝트 루트에서 로컬 서버로 열어보세요.

```bash
npx serve .
# 또는
python -m http.server 8080
```

## GitHub + Vercel 배포

1. 이 프로젝트를 GitHub 저장소에 푸시합니다.
2. [Vercel](https://vercel.com)에 로그인 후 **Add New Project**에서 해당 저장소를 선택합니다.
3. Framework Preset은 **Other**로 두고 **Deploy**합니다.
4. 배포 후 생성된 URL로 접속하면 됩니다.

정적 파일만 사용하므로 별도 빌드 설정 없이 배포됩니다.
