# Coding 컨벤션

## 버전 표기 설명

버전은 Major.Minor.Patch 형태로 구성됩니다.  
ex) 1.7.2 -> Major.Minor.Maintenance(or Build) 을 의미

- Major: 전체 구조나 기능에 큰 변화가 있을 때 증가
- Minor: 기능 추가나 수정이 있을 때 증가
- Patch: 버그 수정이나 코드 보완 시 증가

참고: Patch가 10이 되면 Minor가 1 증가합니다.

------------------
## 1. HTML

### 1-1. Syntax
- 들여쓰기는 2개의 공백 문자(소프트탭)을 사용. 다른 규칙으로 통일하여 작성해도 된다.
- 모든 엘리먼트 명과 애트리뷰트 명은 케밥 표기법(kebab-case)으로 작성.
- 모든 애트리뷰트 값은 큰 따옴표(")로 감싸기.
- 주석 `<!--  --->` 처럼 기본 표기 하고 
> note : 수정사항 등을 기재하기 위한 주석 ( 주석에 년도날짜 / 수정내용 표기는 반드시 해야 한다 )
```
<!-- start: 20200330 수정 및 추가 --> 
<div> ......중략....... </div>
<!-- end : 20200330 수정 및 추가 --> 
``` 
혹은  
``` 
<!-- 20200330 수정 및 추가 -->
<div> ......중략....... </div> 
<!-- // 20200330 수정 및 추가 -->
 ```

### 1-2. Doctype
- Doctype 은 HTML5 DTD 로 선언.
`<!DOCTYPE html>`  html5 로 지정 
- `<html>` 엘리먼트에 문서의 주 언어를 `lang` 애트리뷰트로 반드시 지정. ( 스크린 리더 발음, 번역, 맞춤법 검사에 사용 )
`<html lang="ko">`

이어서 자기 마침 태그(Self-Closing Tags)에 후행 슬래시(/)를 사용금지.
```
<!-- Bad -->
<input />
<br />

<!-- Good -->
<input>
<br>
```

### 1-3. Metadata
```<head>```  엘리먼트의 자식 엘리먼트는 아래의 순서대로 작성.

1. Charset
2. Viewport
3. Title
4. Meta
5. Style
6. JavaScript

```
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hello, World!</title>
<meta name="description" content="">
<meta content="" property="og:title">
<meta content="" property="og:url">
<meta content="" property="og:description">
<meta content="" property="og:image">
<meta content="website" property="og:type">
<meta content="" property="og:site_name">
<link rel="stylesheet" href="foo.css">
<script src="bar.js" defer></script>
```

A. Charset
문서의 언어셋은 UTF-8으로 선언. 
```
<meta charset="utf-8">
```

B. X-UA-Compatible ( 사용하지 않음 )
- IE 문서모드를 지정하던 메타 태그. IE 는 2022년 6월 지원 종료되었고 최신 브라우저는 이 태그를 무시하므로 **선언하지 않는다**.

C.Viewport
모바일 기기에서 실제 렌더링되는 영역과 뷰포트의 크기를 조절. 또한 줌 레벨도 조정 가능.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

> note : `user-scalable=no`, `maximum-scale=1.0` 처럼 **사용자의 확대/축소를 막지 않는다.**  
> 저시력 사용자가 화면을 확대할 수 없게 되어 웹 접근성 지침(WCAG 1.4.4 텍스트 크기 조절) 위반이 된다. ( iOS Safari 는 해당 값을 무시하기도 한다. )

- width=device-width : 페이지의 너비를 기기의 스크린 너비로 설정합니다. 즉, 렌더링 영역을 기기의 뷰포트의 크기와 같게 만들어 준다.
- initial-scale=1.0 : 처음 페이지 로딩시 확대/축소가 되지 않은 원래 크기를 사용하도록 합니다. 0~10 사이의 값을 가진다.
- minimum-scale : 줄일 수 있는 최소 크기를 지정. 0~10 사이의 값을 가진다.
- maximum-scale : 늘릴 수 있는 최대 크기를 지정. 0~10 사이의 값을 가진다.
- user-scalable : yes 또는 no 값을 가지며 사용자가 화면을 확대/축소  지정.

위의 줌 레벨은 1이 원래크기이고, 0.5 라면 50% 축소를 뜻한다.


### 1-4. Elements
a. 스타일 제어가 어려운 엘리먼트
  자식 엘리먼트 태그가 한정적이거나(ex. ```<table>```) 스타일 제어에 한계를 가진 엘리먼트(ex. ```<select>```)가 컴포넌트의 루트 역할로 쓰일 땐 
  나중에 발생할 유지보수를 고려해 ```<div>```나 ```<span>``` 엘리먼트로 감싸는 것을 추천.
```
<!-- Not Bad -->
<table class="table"></table>
<select class="combobox"></select>

<!-- Good -->
<div class="table">
  <table></table>
</div>
<span class="combobox">
  <select></select>
</span>
```

b. 테이블 제목
- ```<caption>``` 엘리먼트의 뷰를 숨길 때는 새로운 엘리먼트로 감싸서 숨긴다..  ```<caption>```을 바로 숨긴다면 브라우저에 따라 스타일이 깨질 수도 있다. 
테이블의 제목이 필요없거나 이미 제공되었다면 생략. 컨텐츠를 중복 제공 X 

```
<!-- Bad -->
<table>
  <caption class="blind">My Caption</caption>
</table>

<!-- Good -->
<table>
  <caption>
    <div class="blind">My Caption</div>
  </caption>
</table>
```

c. 입력 필드
회원가입 폼의 입력 필드처럼 너비, 높이가 유동적이라면 인라인 스타일로 제어. 이렇게 하면 불필요한 클래스 생성을 막을 수 있다.
```
<!-- Bad -->
<input type="text" class="input input--width-120">
<input type="text" class="input input--width-180">

<!-- Good -->
<input type="text" class="input" style="width:120px">
<input type="text" class="input" style="width:180px">
```

### 1-5. Attributes
- 애트리뷰트는 변하지 않는 것부터 먼저 선언. 애트리뷰트의 순서가 비슷한 엘리먼트끼리 통일되므로 검색하기 좋다.
-  id는 하나의 페이지 안에서 이름이 유일해야하고, name 은 중복될 수 있다.  
   따라서 따로따로 접근할 때는 id 값을 이용하고, 그룹으로 접근하고 할 때는  name 을 활용하는 식으로 편의성을 가질 수 있다. 
   하지만 대체적으로 ajax 통신을 직접하지 않고 마크업 기준으로만 작업한다면 id만 쓰는 것을 추천. 다수 선택은 class 로 사용하길~~
   (  name은 주로 form 요소로써 서버와 통신하는 목적으로 주 사용. )

```
<input class="input" type="text" id="userId" name="userId" title="아이디" style="width:100px">
<input class="input" type="password" id="userPw" name="userPw" title="비밀번호" style="width:120px">
```

a. Boolean 애트리뷰트
- HTML5에서는 Boolean 애트리뷰트를 선언하는 것 만으로도 true 값을 가진다. 필요하지 않다면 값을 작성 하지 않는게 좋다.

```
<!-- Not Bad -->
<button disabled="true"></button>

<!-- Good -->
<button disabled></button>
```

c. name 애트리뷰트
- name 애트리뷰트 값은 비즈니스 로직을 작성하는 언어의 네이밍 규칙에 맞게 작성(캐멀케이스로 작성)하는 것을 권장.
- name 이 없을시는 id 값을 캐멀케이스로 작성.
```
<!-- camelCase -->
<form class="form-group" id="myForm" name="myForm">
  <input class="input" type="text" id="myUserName" name="myUserName">
</form>
```

### 1-6. Import
- HTML5 에서 CSS 와 JS 파일을 불러올 때 type 애트리뷰트는 이미 기본값을 가진다. 필요하지 않다면 선언 X. ( 단, ES 모듈은 `type="module"` 지정 )
- 웹브라우저는 일반 `<script>` 엘리먼트를 만나면 다운로드와 실행이 끝날 때까지 HTML 파싱을 멈춘다.  
  예전에는 `<body>` 마지막에 두었지만, 지금은 `<head>` 안에 **`defer`** 를 붙여 선언하는 것을 권장한다.

| 방식 | 다운로드 | 실행 시점 | 용도 |
|------|------|------|------|
| `<script>` | 파싱 중단 | 즉시 | 사용 지양 |
| `<script defer>` | 병렬 | HTML 파싱 완료 후, 선언 순서대로 | 일반적인 페이지 스크립트 ( 권장 ) |
| `<script async>` | 병렬 | 다운로드 완료 즉시, 순서 보장 X | 광고, 애널리틱스 등 독립 스크립트 |
| `<script type="module">` | 병렬 | defer 와 동일 | ES 모듈 ( import / export ) |

```
<!-- bad  -->
<script type="text/javascript">
    // Javascript code
</script>

<!-- good -->
<script>
    // Javascript code
</script>
```


- `<head></head>`태그 내에 로드 순서 지키기( CSS 태그를 자바스크립트 태그 앞에 두기 )
- 자바스크립트 전에 CSS 태그를 두면 브라우저의 렌더링 속도를 높이는 병렬 다운로드가 가능해 진다.

```
<!-- Not recommended -->
<script src="vendor.js"></script>
<script src="foo.js"></script>
<link rel="stylesheet" href="foo.css">

<!-- Recommended -->
<link rel="stylesheet" href="foo.css">
<script src="vendor.js" defer></script>
<script src="foo.js" defer></script>
```

## 2. CSS

> note: CSS 코드의 작성 및 규칙사항
> - CSS 파일을 압축하고, 최종 파일에서 주석, 공백, 줄바꿈을 제거한다. ( 유지 보수 및 수정 사항 전달 등에 있어서 주석 처리 예외 )
> - CSS 파일을 압축하면 클라이언트에게 더 적은 데이터를 전송하게 되며, 콘텐츠가 더 빨리 로드. 
> - CSS 파일을 압축하는 것은 중요한 이유는 대역폭과 리소스 사용을 줄이고자 하는 모든 부분에 있어서 도움이 된다.

### preload
- preload 를 통해 브라우저가 페이지의 콘텐츠를 보여지기 전에 CSS 파일을 로드할 수 있다.
- rel 속성의 값을 preload 로 주고, as="style" 를 `<link>` 태그에 넣는다.
- 참고 URL : [중요한 애셋을 미리 로드하여 로딩 속도 개선](https://web.dev/articles/preload-critical-assets?hl=ko)
- 웹폰트처럼 늦게 발견되는 리소스에 특히 효과적이다. ( 폰트는 `crossorigin` 애트리뷰트 필수 )

```
<link rel="preload" href="/fonts/pretendard.woff2" as="font" type="font/woff2" crossorigin>
```

```
<link rel="preload" href="style.min.css" as="style" onload="this.rel='stylesheet'">
```



### 2-1. Syntax
- Lint 의 사용을 권장!
- css class 이름은 케밥 표기법 ( kebab-case )으로 작성. 알파벳(대소문자)로 시작하되 숫자/특수문자로 시작하여선 안된다.
- css id 는 캐멀 케이스 ( Camel case )방식으로 이름을 명기한다.
- 들여쓰기는 2개의 공백 문자(소프트탭)을 사용. 다른 규칙으로 통일하여 작성해도 된다.
- 프로퍼티는 되도록 한 줄에 하나씩 작성. 
- 프로퍼티는 영문 소문자로 작성.
- 일반적으로 작은 따옴표(')를 사용하지만 @charset 선언과 타입 선택자는 큰 따옴표(")를 사용. 가능하다면 생략하는 것이 가장 좋다.
- 사용되지 않는 CSS 선택자는 제거

### 2-2. Charset
- 문서의 언어셋은 UTF-8으로 최상위에 선언. 
- 언어셋이 정해진 번들링 파일이라면 선언하지 않는다.

```
@charset "UTF-8";
```

### 2-3. Selectors
- 태그이름과 선택자는 가급적 중첩하지 않는다. 
- Indentation Depth 는 3 Depth 까지, 가급적 1 Depth 만을 사용하는 것을 권장한다.


### 2-4. z-index
- z-index 스택을 0부터 규칙 없이 쌓는다면 순서가 꼬인다. 엘리먼트의 특성에 맞게 계층을 분리하여 체계적으로 관리하는 것이 좋은 방법.
- CSS 전처리기의 믹스인을 활용한다면 간편하게 작성할 수 있다.

```
/* scss */
.foo {
  position: absolute;
  @include layer-index('floating', 3000);
}

/* css */
.foo {
  z-index: 16203000
}
```


### 2-5. Import
CSS 의 기본 문법인 @import 는 성능 문제를 가지고 있다. 사용 X.

- 여러개의 ```<link>``` 엘리먼트로 작성하기
- 하나의 CSS 파일로 작성하기
  - CSS 전처리기의 @import 문법을 사용하기
  - 번들러 등의 도구를 이용하여 하나의 CSS 파일로 병합하기

```
  <!-- Too Bad -->
  <style>
    @import url("one.css");
    @import url("two.css");
    @import url("three.css");
  </style>
  
  <!-- Good -->
  <link rel="stylesheet" href="one.css">
  <link rel="stylesheet" href="two.css">
  <link rel="stylesheet" href="three.css">
  
  <!-- Very Nice -->
  <link rel="stylesheet" href="bundle.css"> <!-- one.css, .. in bundle.css -->
```

### 2-6. Media Query
- 미디어 쿼리는 컴포넌트 단위로 분류하여 관련 규칙 바로 뒤에 작성.
혹은 문서의 마지막에 모아서 작성.

```
.foo-a {}
.foo-b {}
@media (min-width: 768px) {
  .foo-a {}
  .foo-b {}
}

.bar {}
.foo-a {}
.foo-b {}

.bar {}

@media (min-width: 768px) {
  .foo-a {}
  .foo-b {}
}
```

- 최신 브라우저는 **범위 문법(Range syntax)** 을 지원하므로 min/max 대신 비교 연산자로 작성할 수 있다.

```
@media (width >= 768px) {}
@media (768px <= width < 1280px) {}
```

- **컨테이너 쿼리** : 뷰포트가 아닌 **부모 컨테이너의 크기**에 따라 스타일을 바꾼다. 여러 위치에 재사용되는 컴포넌트(카드, 위젯 등)에 적합하다.

```
.card-list {
  container-type: inline-size;
}

@container (width >= 480px) {
  .card {
    display: flex;
  }
}
```

### 2-7. Nesting(중첩)
- 너무 많은 선택자의 중첩은 피해야 하므로, CSS 전처리기가 지원하는 Nesting 문법은 주의해서 사용해야 한다!
- 2023년부터 모든 주요 브라우저가 **CSS 네이티브 중첩**을 지원하므로 전처리기 없이도 중첩을 사용할 수 있다. 동일하게 깊이를 최소화한다.

```
/* 네이티브 CSS 중첩 */
.card {
  padding: 16px;

  &:hover {
    background-color: #f5f5f5;
  }

  .card-title {
    font-size: 18px;
  }
}
```


```
/* Bad */
.foo {
  .bar {
    color: #abc;
  }
}

/* Good */
.foo__bar {
  color: #abc;
}
```

### 2-8. Extend
- CSS 전처리기가 지원하는 Extend 문법은  사용하지 X.  Mixin 으로 대체!

### 2-9. Reset
- 초기화 스타일은 서비스에 맞게 정의. 만약 normalize.css 또는 Bootstrap 등의 프레임워크를 사용한다면 초기화를 생략.

### 2-10. Vendor Prefix
- 벤더 프리픽스는 직접 작성하지 않고 **Autoprefixer(PostCSS)** 로 빌드 시 자동 추가한다. 지원 브라우저 범위는 `package.json` 의 `browserslist` 로 지정한다.  
  ( Vite 는 PostCSS 설정 파일(`postcss.config.js`)을 자동으로 읽는다. )

```
// package.json
"browserslist": ["> 0.5%", "last 2 versions", "not dead"]
```

- 부득이하게 직접 작성할 경우 벤더 프리픽스 프로퍼티는 일반 프로퍼티보다 먼저 선언.


```
/* Bad */
.foo {
  box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
}
/* Good */
.foo {
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
}
```


### 2-11. Naming
- 접두사가 2개 이상 중복 시 기능적인 접두사가 맨 앞부분에 위치할 수 있도록 한다.
- 단독사용 클래스는 지양하며 접두사를 조합한 형태로 작성한다.
- on 클래스인 경우, 단일 특정요소에 상태변화 클래스를 적용한다면 접미사로서 적용한다.

| ClassName	   |     | Description          |     |
| :-----------------|-----|----------------------|-----|
| wrap / cnt  |     | 일반 영역의 묶음 - ex) btn-cnt / btn-wrap  |     |
| group  |     | 같은 엘리먼트 묶음 - ex) btn 3개를 묶는 경우 ```<div class="btn-group"><button class="btn">버튼</button><button class="btn">버튼</button><button class="btn">버튼</button></div>``` |     |
| inner |     | 부모 wrapper 가 존재하며 자식 묶음이 단독으로 사이즈가 필요한 경우 |     |
| img-cnt  |     | 이미지를 감싸는 경우 |     |
| txt-cnt  |     | 텍스트를 감싸는 경우 |     |
| m-tit |     | 메인페이지 타이틀(중) 텍스트 |     |
| s-tit  |     | 메인페이지 타이틀(소) 텍스트 |     |
| tit-sub   |     | 서브페이지 타이틀(대) 텍스트 |     |
| m-tit-sub   |     | 서브페이지 타이틀(중) 텍스트 |     |
| s-tit-sub   |     | 서브페이지 타이틀(소) 텍스트 |     |
| tit  |     | 타이틀 텍스트 |     |
| desc |     | 상세 내용 |     |
| txt-date  |     | 날짜 |     |
| btn-cnt |     | 버튼을 감싸는 경우 |     |
| list-cnt |     | 리스트를 감싸는 경우(ul) |     |
| tab |     | 탭 메뉴 |     |


### 2-12. 유용한 tip

```
html {
-webkit-touch-callout:none;
-webkit-tap-highlight-color:rgba(0, 0, 0, 0);
user-select:none;
}
```


- `webkit-touch-callout` 는 아이폰에서만 적용된다. 롱프레스시 새로운탭에서 열기, 읽기목록 추가, 복사하기, 공유 등 하단에 나오는 ios 네이티브 메뉴바 설정. none 으로 할 때 나오지 않게 됨.
- `user-select` 는 엘리먼트 드래그(텍스트 선택) 방지용. 표준 프로퍼티이므로 `-webkit-` 접두어 없이 작성하고 필요한 접두어는 Autoprefixer 에 맡긴다.  
  ( 본문 텍스트 복사까지 막으면 사용성이 떨어지므로 버튼 등 필요한 요소에만 적용 )
- `webkit-tap-highlight-color` 는 롱프레스시에 해당 엘리먼트가 파랗게 선택되어 보여지는 것을 방지.

### 2-13. 모던 CSS ( 적극 활용 )
- 아래 기능은 모든 주요 브라우저에서 지원된다. ( 지원 여부는 [caniuse](https://caniuse.com/) / [Baseline](https://web.dev/baseline?hl=ko) 으로 확인 )

| 기능 | 설명 |
|------|------|
| CSS 변수 ( `--color-primary` / `var()` ) | 런타임에 변경 가능한 디자인 토큰. 다크모드, 테마 전환에 사용 |
| `clamp()` | 최소/권장/최대 값 지정. 반응형 폰트 크기에 사용 ( `font-size: clamp(16px, 2vw, 20px)` ) |
| `gap` | flex / grid 아이템 간격. 자식 margin 계산 불필요 |
| `aspect-ratio` | 비율 유지 박스. padding-top 트릭 대체 ( `aspect-ratio: 16 / 9` ) |
| 논리 속성 | `margin-inline`, `padding-block` 등 방향(LTR/RTL)에 독립적인 속성 |
| `:is()` / `:where()` | 선택자 그룹화. `:where()` 는 명시도(specificity)가 0 |
| `:has()` | 자식 상태로 부모 선택 ( `.form:has(input:invalid)` ) |
| `@layer` | 캐스케이드 레이어로 reset / 라이브러리 / 컴포넌트 스타일 우선순위 관리 |

```
:root {
  --color-primary: #2f4dc9;
  --space-md: 16px;
}

.btn {
  padding-block: 8px;
  padding-inline: var(--space-md);
  background-color: var(--color-primary);
}

.form:has(input:invalid) .btn-submit {
  opacity: 0.5;
}
```

- **`aspect-ratio` 로 비디오 비율 지정** : 너비만 정하면 높이가 비율에 맞춰 자동 계산된다. 예전처럼 `padding-top: 56.25%` 와 `position: absolute` 를 조합할 필요가 없다.
- 높이가 고정되어 있으면 비율이 무시되므로 `height: auto` 로 둔다.

```
/* Bad : padding-top 트릭 ( 16:9 = 9 / 16 = 56.25% ) */
.video-container {
  position: relative;
  padding-top: 56.25%;
}

.video-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Good : aspect-ratio */
.video-container {
  position: relative;
  width: 100%;
  text-align: center;

  /* 유튜브 영상이 활성화된 경우 3:2 비율 */
  &.youtube-active {
    height: auto;
    aspect-ratio: 3 / 2;
  }

  /* 영상(iframe / video)이 컨테이너를 꽉 채우도록 */
  iframe,
  video {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* video 태그는 비율이 달라도 잘리거나 늘어나지 않게 */
  video {
    object-fit: cover;
  }
}

/* 자주 쓰는 비율 */
.ratio-16x9 { aspect-ratio: 16 / 9; } /* 유튜브 기본, 가로형 영상 */
.ratio-4x3  { aspect-ratio: 4 / 3; }
.ratio-1x1  { aspect-ratio: 1; }      /* 정사각형 썸네일 */
.ratio-9x16 { aspect-ratio: 9 / 16; } /* 쇼츠 / 릴스 세로형 영상 */

/* 화면이 넓어지면 비율 변경 */
@media (width >= 768px) {
  .video-container.youtube-active {
    aspect-ratio: 16 / 9;
  }
}
```

```
<div class="video-container youtube-active">
  <iframe
    src="https://www.youtube.com/embed/영상ID"
    title="영상 제목"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

> note : `<iframe>` 에는 스크린 리더용 `title` 을 꼭 넣고, 첫 화면 밖 영상은 `loading="lazy"` 로 지연 로딩한다.

### 2-14. 2022년 이후 추가된 CSS
- 2-13 에 정리한 기능( 범위 문법, 컨테이너 쿼리, 네이티브 중첩, `:has()`, `@layer` ) 외에 2022년 이후 브라우저에 추가된 기능을 지원 범위별로 정리한다.
- 지원 범위는 [Baseline](https://web.dev/baseline?hl=ko) 기준이다. ( 2026년 11월 web-features 데이터 기준 / 실제 적용 전 [caniuse](https://caniuse.com/) 로 프로젝트 지원 브라우저와 비교 )
  - **Baseline 널리 사용 가능** : 모든 주요 브라우저( 크롬, 엣지, 파이어폭스, 사파리 )에서 지원된 지 30개월 이상 → 바로 사용
  - **Baseline 신규** : 최근 모든 주요 브라우저 최신 버전에서 지원 → 구형 브라우저 지원이 필요하면 대체 스타일과 함께 사용
  - **일부 브라우저만 지원** : 미지원 브라우저에서 무시되어도 문제없는 곳에만 사용 ( 점진적 향상 / `@supports` 로 분기 )

**1. Baseline 널리 사용 가능 ( 바로 사용 )**

| 기능 | 설명 |
|------|------|
| `dvh` / `svh` / `lvh` | 모바일 주소창 높이를 고려한 뷰포트 단위. `100vh` 가 화면을 넘치는 문제 해결 |
| `oklch()` / `oklab()` | 사람 눈에 균일한 밝기 기준의 색상 함수. 명도만 바꾼 색 단계 만들기에 유리 |
| `color-mix()` | 두 색상을 비율로 섞기. hover / disabled 색을 변수 하나로 파생 |
| `subgrid` | 자식 grid 가 부모 grid 의 행/열 라인을 공유. 카드 목록의 제목 / 버튼 높이 정렬 |
| `translate` / `rotate` / `scale` | transform 을 개별 속성으로 분리. 서로 덮어쓰지 않고 따로 애니메이션 가능 |
| `:user-valid` / `:user-invalid` | 사용자가 입력을 마친 뒤에만 유효성 스타일 적용. 페이지 진입 시 빨간 테두리 문제 해결 |
| `align-content` ( block ) | flex / grid 없이 일반 블록에서 세로 가운데 정렬 ( `align-content: center` ) |
| `:focus-visible` | 키보드로 포커스한 경우에만 포커스 링 표시 ( `:focus` 대신 사용 ) |
| `sin()` / `cos()` 등 삼각함수 | 원형 배치 등 계산 값을 CSS 에서 바로 사용 |

**2. Baseline 신규 ( 지원 범위 확인 후 사용 )**

| 기능 | Baseline 시점 | 설명 |
|------|------|------|
| `text-wrap: balance` | 2024.05 | 제목의 줄 길이를 균등하게 맞춤. 한 단어만 다음 줄로 넘어가는 문제 해결 |
| `light-dark()` | 2024.05 | `color-scheme` 과 함께 라이트/다크 색상을 한 줄로 지정 |
| `round()` / `mod()` / `rem()` | 2024.05 | CSS 에서 반올림 / 나머지 계산 |
| `@property` | 2024.07 | CSS 변수에 타입 지정. 그라데이션 각도 등 변수 값을 애니메이션 가능 |
| `font-size-adjust` | 2024.07 | 대체 폰트로 바뀌어도 글자 크기(x-height) 유지 |
| `@starting-style` | 2024.08 | 요소가 처음 나타날 때의 시작 스타일 지정. JS 없이 등장 애니메이션 |
| 상대 색상 문법 | 2024.09 | 기존 색에서 채널만 바꾸기 ( `oklch(from var(--c) l c h / 50%)` ) |
| `scrollbar-gutter` / `scrollbar-width` | 2024.12 | 스크롤바 생김에 따른 레이아웃 밀림 방지 / 스크롤바 두께 지정 |
| `scrollbar-color` | 2025.12 | 스크롤바 색상 지정. `::-webkit-scrollbar` 대체 |
| `content-visibility` | 2025.09 | 화면 밖 영역의 렌더링을 건너뛰어 긴 페이지 성능 개선 |
| `::details-content` | 2025.09 | `<details>` 펼침 영역 스타일링 |
| View Transitions ( 같은 문서 ) | 2025.10 | `document.startViewTransition()` 으로 화면 상태 전환 애니메이션 |
| `@scope` | 2026.03 | 스타일 적용 범위를 특정 영역 안으로 제한 ( BEM 없이 컴포넌트 스타일 격리 ) |
| 컨테이너 스타일 쿼리 | 2026.05 | 부모의 CSS 변수 값에 따라 스타일 분기 ( `@container style(--theme: dark)` ) |
| `field-sizing: content` | 2026.06 | input / textarea 가 입력 내용에 맞춰 자동으로 늘어남 |
| `sibling-index()` / `sibling-count()` | 2026.08 | 형제 요소 중 순서 / 개수를 값으로 사용. 순차 애니메이션 딜레이 등 |
| 스크롤 기반 애니메이션 | 2026.10 | `animation-timeline: scroll()` / `view()` 로 JS 없이 스크롤 연동 애니메이션 |

**3. 일부 브라우저만 지원 ( 점진적 향상 )**

| 기능 | 미지원 | 설명 |
|------|------|------|
| `text-wrap: pretty` | 파이어폭스 | 본문 마지막 줄에 단어 하나만 남는 문제 방지 |
| `display: none` 전환 애니메이션 | 파이어폭스 | `transition-behavior: allow-discrete` 로 사라질 때도 애니메이션 |
| View Transitions ( 페이지 간 ) | 파이어폭스 | `@view-transition { navigation: auto; }` 로 MPA 페이지 이동 애니메이션 |
| `text-box` | 파이어폭스 | 폰트의 위/아래 여백을 잘라 텍스트 세로 정렬을 정확하게 맞춤 |
| 앵커 포지셔닝 | 파이어폭스 | 툴팁 / 드롭다운을 기준 요소에 붙여서 배치 ( `anchor-name` / `position-anchor` ) |
| 커스텀 select | 파이어폭스 | `appearance: base-select` 로 기본 `<select>` 디자인 변경 |
| `interpolate-size` / `calc-size()` | 파이어폭스, 사파리 | `height: auto` 로 펼치는 애니메이션 |
| `if()` | 파이어폭스, 사파리 | CSS 안에서 조건 분기 |

```
/* 모바일 주소창을 고려한 전체 높이 ( 미지원 브라우저는 100vh 사용 ) */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
}

/* 색상 : oklch / color-mix / 상대 색상 */
:root {
  --color-primary: oklch(55% 0.2 265);
  --color-primary-hover: color-mix(in oklch, var(--color-primary), black 15%);
  --color-primary-alpha: oklch(from var(--color-primary) l c h / 20%);
}

/* 다크모드 : 시스템 설정에 따라 자동 전환 */
:root {
  color-scheme: light dark;
}

body {
  color: light-dark(#222, #eee);
  background-color: light-dark(#fff, #121212);
}

/* subgrid : 카드마다 제목 길이가 달라도 설명 / 버튼 줄 위치를 맞춤 */
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}

/* 제목 / 본문 줄바꿈 ( 미지원 브라우저는 무시되므로 그대로 사용 가능 ) */
h1, h2, h3 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

/* 입력을 마친 뒤에만 에러 스타일 */
input:user-invalid {
  border-color: #d93025;
}
```

```
/* @starting-style : 요소가 나타날 때 페이드인 */
.toast {
  opacity: 1;
  transition: opacity 0.3s;

  @starting-style {
    opacity: 0;
  }
}

/* display: none 전환 : 미지원 브라우저( 파이어폭스 )는 애니메이션 없이 바로 열리고 닫힌다 */
.dropdown {
  display: none;
  opacity: 0;
  transition: opacity 0.2s, display 0.2s allow-discrete;
}

.dropdown.is-open {
  display: block;
  opacity: 1;
}

@starting-style {
  .dropdown.is-open {
    opacity: 0;
  }
}
```

```
/* @property : 타입을 지정한 변수는 애니메이션 가능 */
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.gradient-border {
  background: conic-gradient(from var(--angle), #2f4dc9, #8f5cff, #2f4dc9);
  animation: rotate-angle 3s linear infinite;
}

@keyframes rotate-angle {
  to {
    --angle: 360deg;
  }
}

/* @scope : .card 안에만 적용하고 .card-content 내부( 에디터 본문 등 )는 제외 */
@scope (.card) to (.card-content) {
  img {
    border-radius: 8px;
  }
}

/* 스크롤 진행률 바 ( JS 없음 ) */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #2f4dc9;
  transform-origin: 0 50%;
  animation: grow-progress linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* 일부 브라우저만 지원하는 기능은 @supports 로 분기 */
@supports (anchor-name: --trigger) {
  .tooltip-trigger {
    anchor-name: --trigger;
  }

  .tooltip {
    position: absolute;
    position-anchor: --trigger;
    position-area: top;
  }
}
```

> note : 움직임이 큰 애니메이션( 스크롤 연동, 화면 전환 등 )은 `@media (prefers-reduced-motion: reduce)` 에서 끄거나 줄인다. ( 웹접근성 )

### 2-15. CSS 변수 ( Custom Properties ) 활용
- `--` 로 시작하는 이름으로 선언하고 `var()` 로 사용한다. 이름은 **대소문자를 구분**한다. ( `--Color` 와 `--color` 는 다른 변수 )
- 일반 CSS 속성처럼 **상속되고 캐스케이드** 된다. `:root` 에 선언하면 전역, 특정 선택자에 선언하면 그 요소와 자식에서만 적용된다.
- Sass 변수와 달리 **브라우저에서 실행 중에 값을 바꿀 수 있다.** ( 미디어쿼리, 클래스, JS 로 변경 → 사용하는 곳 전체에 즉시 반영 )

**1. 기본 사용법 / 기본값( fallback )**

```
:root {
  --color-primary: #2f4dc9;
  --radius: 8px;
}

.btn {
  /* 두 번째 인자는 변수가 선언되지 않았을 때의 기본값 */
  color: var(--btn-color, #fff);
  background-color: var(--color-primary);
  border-radius: var(--radius);

  /* 기본값 안에 다른 변수를 중첩할 수 있다 */
  border-color: var(--btn-border, var(--color-primary));
}
```

**2. 디자인 토큰 2단계 구성**
- 실제 색상 값( 원시 토큰 )과 용도( 의미 토큰 )를 분리하면, 테마를 바꿀 때 의미 토큰만 다시 연결하면 된다.
- 컴포넌트에서는 의미 토큰만 사용한다.

```
:root {
  /* 원시 토큰 : 실제 값 */
  --blue-500: #2f4dc9;
  --blue-600: #2440b0;
  --gray-50: #f8f9fa;
  --gray-900: #212529;

  /* 의미 토큰 : 용도 */
  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-600);
  --color-bg: var(--gray-50);
  --color-text: var(--gray-900);

  /* 간격 / 폰트 크기도 토큰으로 관리 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
}
```

**3. 다크모드 / 테마 전환**
- 시스템 설정( `prefers-color-scheme` )을 따르고, 사용자가 직접 고른 테마( `data-theme` )가 있으면 그것을 우선한다.
- 컴포넌트 CSS 는 수정할 필요 없이 변수 값만 바뀐다. ( 라이트/다크 2가지만 필요하면 2-14 의 `light-dark()` 도 사용 가능 )

```
:root {
  --color-bg: #fff;
  --color-text: #222;
  --color-border: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #121212;
    --color-text: #eee;
    --color-border: #333;
  }
}

:root[data-theme="dark"] {
  --color-bg: #121212;
  --color-text: #eee;
  --color-border: #333;
}

body {
  color: var(--color-text);
  background-color: var(--color-bg);
}
```

```
// 테마 변경 버튼 ( 선택값은 localStorage 에 저장해서 다음 방문 시 유지 )
const toggleTheme = () => {
  const root = document.documentElement;
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

  root.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
};
```

**4. 컴포넌트 변형( variant )을 변수로 처리**
- 기본 스타일은 한 번만 작성하고, 변형 클래스에서는 **변수 값만 바꾼다.** 같은 속성을 반복해서 덮어쓰지 않아도 된다.

```
.btn {
  --btn-bg: var(--color-primary);
  --btn-color: #fff;
  --btn-padding: var(--space-sm) var(--space-md);

  padding: var(--btn-padding);
  color: var(--btn-color);
  background-color: var(--btn-bg);
  border: 1px solid var(--btn-bg);
  border-radius: var(--radius);

  &:hover {
    --btn-bg: var(--color-primary-hover);
  }
}

.btn-outline {
  --btn-color: var(--color-primary);

  background-color: transparent;
}

.btn-lg {
  --btn-padding: var(--space-md) var(--space-lg);
}
```

**5. 반응형 : 미디어쿼리에서는 변수 값만 변경**

```
:root {
  --header-height: 56px;
  --container-padding: var(--space-md);
}

@media (width >= 1024px) {
  :root {
    --header-height: 80px;
    --container-padding: var(--space-lg);
  }
}

.header {
  height: var(--header-height);
}

.main {
  padding-top: var(--header-height);
  padding-inline: var(--container-padding);
}
```

**6. HTML / JS 와 연동**
- `style` 속성으로 요소마다 다른 값을 넘길 수 있다. 진행률, 순서별 애니메이션 딜레이처럼 값만 다른 경우에 클래스를 여러 개 만들 필요가 없다.
- 단위가 없는 숫자를 넘긴 경우 `calc()` 로 단위를 붙인다. ( `var(--i)px` 처럼 붙여 쓰는 것은 동작하지 않는다 )

```
<div class="progress" style="--progress: 40%">
  <span class="progress-bar"></span>
</div>

<ul class="list">
  <li style="--i: 0">항목 1</li>
  <li style="--i: 1">항목 2</li>
  <li style="--i: 2">항목 3</li>
</ul>
```

```
.progress-bar {
  display: block;
  width: var(--progress, 0%);
  height: 8px;
  background-color: var(--color-primary);
  transition: width 0.3s;
}

.list li {
  animation: fade-in 0.4s both;
  animation-delay: calc(var(--i) * 100ms);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
}
```

```
const root = document.documentElement;
const progress = document.querySelector('.progress');

// 값 변경
progress.style.setProperty('--progress', '75%');

// 값 읽기 ( 앞뒤 공백이 포함될 수 있으므로 trim )
const primaryColor = getComputedStyle(root).getPropertyValue('--color-primary').trim();

// 값 제거 ( CSS 에 선언된 값으로 돌아감 )
progress.style.removeProperty('--progress');
```

**7. Sass / Vue 에서 사용**

```
// Sass 변수 값을 CSS 변수에 넣을 때는 #{} 보간이 필요하다
$primary: #2f4dc9;

:root {
  --color-primary: #{$primary};
}
```

```
<!-- Vue : 컴포넌트 상태 값을 CSS 변수로 전달 -->
<template>
  <div class="progress" :style="{ '--progress': `${percent}%` }">
    <span class="progress-bar"></span>
  </div>
</template>

<!-- 또는 style 안에서 v-bind() 사용 ( 내부적으로 CSS 변수로 변환된다 ) -->
<style scoped>
.progress-bar {
  background-color: v-bind(barColor);
}
</style>
```

**8. 주의 사항**

| 상황 | 설명 |
|------|------|
| 미디어쿼리 조건에는 사용 불가 | `@media (width >= var(--bp))` 는 동작하지 않는다. 브레이크포인트는 Sass 변수 등 빌드 시점 상수로 관리 |
| 잘못된 값이 들어간 경우 | 변수가 선언은 되어 있지만 속성에 맞지 않는 값이면 fallback 이 아닌 **상속값 / 초기값**이 적용된다. ( 예: `--size: red` 를 `width` 에 사용 ) |
| 선택자 / 속성 이름에는 사용 불가 | 값 위치에만 사용할 수 있다. ( `var(--prop): 10px` 불가 ) |
| 애니메이션 | 일반 CSS 변수는 중간값 없이 한 번에 바뀐다. 변수 자체를 부드럽게 애니메이션하려면 `@property` 로 타입을 지정한다. ( 2-14 참고 ) |
| 남용 금지 | 한 곳에서만 쓰는 값까지 변수로 만들지 않는다. 재사용되거나 바뀔 수 있는 값( 색상, 간격, 테마, 컴포넌트 변형 )에 사용 |


-------

## 3. SCSS
> note :
> - 컴파일러는 **Dart Sass(`sass` 패키지)** 를 사용한다. `node-sass`(LibSass)는 지원 종료되었다. ( Vite 는 `npm i -D sass` 만 설치하면 .scss 를 바로 import 할 수 있다. )
> - 중첩( Nesting )은 웬만하면 4depth 이하로 작성.
> - 모듈 : 공통 파일을 기능 별로 나누어 _(언더스코어) 붙여서 분할된 파일( partial ) 로 구성하고 **`@use` / `@forward`** 로 불러온다. ( `@import` 는 deprecated, Dart Sass 3.0 에서 제거 예정 )
> - extend : 되도록이면 mixin 으로 사용하는 게 좋다.
> - 함수 : 자주 사용하는 계산 값에 대해 사용.

1. 기능 별 분리
- _component.scss 의 경우 공통 컴포넌트의 집합체이기에 많은 수의 컴포넌트가 존재한다.
기능 별로 분리할 필요가 있다. 대표적으로 _variable(공통 변수), _button, _input, _form


### 3-1. Variables (변수)
- sass에서 변수라는 기능을 제공하는 이유는 재사용성을 위함이다. 변수로 등록된 스타일은 쉽게 다른 코드에서 사용할 수 있기 때문이다.

```

    $font-stack : Helvetica, sans-serif;
    $primary-color : #333;


    body{
        font : 100% $font-stack;
        color: $primary-color;
    }

```

- Sass 변수는 컴파일 시점에 값이 고정된다. 다크모드/테마처럼 **런타임에 바뀌어야 하는 값은 CSS 변수**( `--color-primary` )로 정의하고, Sass 변수는 브레이크포인트처럼 컴파일 시점 상수에 사용한다.

### 3-2. Nesting (중첩)
- 부모 요소를 반복적으로 작성하던 불편함을 해결한다.
- 대부분의 스타일 가이드는 최대 깊이를 4로 설정. 가급적 4depth 이내의 중첩 구조를 갖도록 하는 것이 좋다.


### 3-3. Partials (파일분할)
- 공식문서에 따르면, scss의 파일 구조를 모듈화 할 수 있다. 하지만, 아까 처음 명령어를 통해서 모듈화된 코드가 있다고 가정했을 때 이를 나누어 모듈화 시킬 scss를 제외하고 scss만 컴파일 하기에는 상당히 고생할 수도 있다. 
따라서 ***   _partial.scss 처럼 파일 명 앞에 언더 스코어 바를 통해서 빌드에서 제외 시킬 수 있다.   ***

- partial 은 `@import` 대신 **`@use`** 로 불러온다. `@use` 는 파일을 한 번만 로드하고, 멤버를 **네임스페이스**( 파일명 )로 구분하므로 변수/믹스인 이름 충돌이 없다.
- 여러 partial 을 묶어서 내보낼 때는 `_index.scss` 에서 **`@forward`** 를 사용한다.

```
// abstracts/_variables.scss
$primary-color: #333;

// abstracts/_mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// abstracts/_index.scss
@forward 'variables';
@forward 'mixins';
```

```
// components/_button.scss
// 아래 세 가지 방식 중 하나를 선택한다.
// @use '../abstracts' as a;    -> 별칭 지정 : a.$primary-color
// @use '../abstracts' as *;    -> 네임스페이스 생략 : $primary-color ( 이름 충돌 주의 )
@use '../abstracts';            // 기본 : 파일명이 네임스페이스 ( abstracts.$primary-color )

.btn {
  @include abstracts.flex-center;
  color: abstracts.$primary-color;
}
```

> note : 기존 `@import` 코드는 공식 마이그레이션 도구로 변환할 수 있다. `npx sass-migrator module --migrate-deps main.scss`


### 3-4. Mixins (재활용)
- 믹스 인을 통해서, 사이트 전체에서 재사용할 CSS declarations를 만들 수 있다. 또한, 값들을 믹스인을 통해서 집어 넣을 수 있으며(파라미터), 이를 통해서 좀더 유연하고 동적인 CSS 구조를 만들 수 있다.

```
/* _mixin.scss */
    @mixin transform($property) {		      
        -webkit-transform: $property;
        -ms-transform: $property;
        transform: $property;
    }

/* _ex.scss */
    .box { @include transform(rotate(30deg)); } 
```

```
/* _mixin.scss */
    @mixin columnWidth( $selector ){          
        &[data-column="2"]{
            #{$selector}{width:50%;}
        }
        &[data-column="3"]{
        #{$selector}{width:33.33333%;}
        }
    }

/* _button.scss */
    .btn-group[data-column]{			     
          width:100%;
          display: flex;
          flex-wrap: wrap;
          @include columnWidth('.btn');
    
         &[data-column="2"]{
            @include rowChild( 2, '.btn');
          }
         &[data-column="3"]{
           @include rowChild( 3, '.btn');
         }
     }
```

믹스인을 만들기 위해 해야 되는 절차는 다음과 같다.
> - @mixin 지시문을 앞에 사용,
> - 함수의 파라미터처럼 ($변수) 이름 정의
> - mixin 지시문을 사용하고 이름을 지정
> - 이를 사용할때에는 @include를 통해서 사용할 수 있다. (반응형을 위한 미디어 쿼리 작성 또한 이를 통해서 진행 할 수 있다. )


### 3-5. Function (함수)

- 자신의 함수를 정의하여 사용할 수 있다.
- 함수와 Mixins은 거의 유사하지만 반환되는 내용이 다르다.
- Mixin은 지정한 스타일(Style)을 반환하는 반면, 함수는 보통 연산된(Computed) 특정 값을 @return 지시어를 통해 반환한다.

```

// Mixins
@mixin 믹스인이름($매개변수) {
  스타일;
}

// Functions
@function 함수이름($매개변수) {
  @return 값
}

```

함수는 함수이름으로 바로 사용한다. (Mixin은 @include 지시어를 사용)

```

// Mixin
@include 믹스인이름(인수);

// Functions
함수이름(인수)

```

아래 예시와 같이 함수는 @include 같은 별도의 지시어 없이 사용하기 때문에 내가 지정한 함수와 내장 함수(Built-in Functions)의 이름이 충돌할 수 있다. 따라서 내가 지정한 함수에는 별도의 접두어를 붙여주는 것이 좋다.

```

// SCSS:
@use 'sass:math';

$max-width: 980px;

// 나눗셈 연산자( / )는 deprecated 이므로 math.div() 를 사용한다.
@function columns($number: 1, $columns: 12) {
  @return $max-width * math.div($number, $columns);
}

.box_group {
  width: $max-width;

  .box1 {
    width: columns();  // 1
  }
  .box2 {
    width: columns(8);
  }
  .box3 {
    width: columns(3);
  }
}





// Compiled to:

.box_group {
  /* 총 너비 */
  width: 980px;
}
.box_group .box1 {
  /* 총 너비의 약 8.3% */
  width: 81.66667px;
}
.box_group .box2 {
  /* 총 너비의 약 66.7% */
  width: 653.33333px;
}
.box_group .box3 {
  /* 총 너비의 25% */
  width: 245px;
}

```

 예를 들어, 색의 빨강 성분을 가져오는 내장 함수로 이미 red()가 있다면, 접두어를 붙여 extract-red() 같은 이름을 만들 수 있다.
 ( 전역 내장 함수 `red()` 등은 deprecated 이므로 `sass:color` 같은 내장 모듈을 `@use` 해서 사용한다. )


```
@use 'sass:color';

@function extract-red($color) {
  // 내장 모듈 함수
  @return rgb(color.channel($color, 'red', $space: rgb), 0, 0);
}

div {
  color: extract-red(#D55A93);
}

```





### 3-6. If (조건문)

필요한 경우가 아니라면 괄호 없이 사용 한다.

```

// bad
@if ($support-legacy == true) {
  // …
}
@else {
  // …
}


// good
@if $support-legacy {
  // …
} @else {
  // …
}

```

거짓 값을 테스트 하는 경우에 false, null 대신에 not 키워드를 사용 한다.
```

// bad
@if index($list, $item) == null {
  // …
}

// good
@if not index($list, $item) {
  // …
}

```

언제나 변수 부분을 조건문의 왼쪽에, 기대되는 (혹은 기대되지 않는) 결과를 오른쪽에 배치 한다.
```

// bad
@if 42 == $value {
  // …
}

// good
@if $value == 42 {
  // …
}

```

조건에 따라 다른 결과를 반환하는 함수 안에서 조건문을 사용할 때는, 반드시 함수가 조건문 블록 밖에서도 @return문을 갖도록 해야 한다.
```

// bad
@function dummy($condition) {
  @if $condition {
    @return true;
  } @else {
    @return false;
  }
}

// good
@function dummy($condition) {
  @if $condition {
    @return true;
  }

  @return false;
}

```

### 3-7. For (반복문)
- @for는 스타일을 반복적으로 출력한다.
- 변수는 관례상 $i 를 사용한다.
- through를 사용하는 형식과 to를 사용하는 형식으로 나뉜다.

```
// SCSS

// through를 사용하는 경우(1부터 3번 이하 반복)
@for $i from 1 through 3 {
  .through:nth-child(#{$i}) {
    width : 20px * $i
  }
}



// Compiled to:

.through:nth-child(1) { width: 20px; }
.through:nth-child(2) { width: 40px; }
.through:nth-child(3) { width: 60px; }


```



```
// SCSS

// to를 사용하는 경우(1부터 3번 미만, 2번 반복)
@for $i from 1 to 3 {
  .to:nth-child(#{$i}) {
    width : 20px * $i
  }
}



// Compiled to:

.to:nth-child(1) { width: 20px; }
.to:nth-child(2) { width: 40px; }

```

ex)
```
// SCSS


$total:500;

@for $i from 0 through $total {
  // 0 은 단위 없이 출력 ( Sass 의 if() 함수는 deprecated 이므로 @if 사용 )
  $value: $i * 1px;
  @if $i == 0 {
    $value: 0;
  }

  .mgt-#{$i} {
    margin-top: $value !important;
  }
  .mgb-#{$i} {
    margin-bottom: $value !important;
  }
}



// Compiled to:

.mgt-0 {
  margin-top: 0 !important;
}

.mgb-0 {
  margin-bottom: 0 !important;
}

......중략.......


.mgt-500 {
  margin-top: 500px !important;
}

.mgb-500 {
  margin-bottom: 500px !important;
}

```



---------



## 4. Javascript
### 1. javascript Naming convention

#### 일관성을 유지
```
/* Bad */
const pages_count = 5
const shouldUpdate = true


/* Good */
const pageCount = 5
const shouldUpdate = true


/* Good as well */
const page_count = 5
const should_update = true
```


#### **S-I-D( Short - Intutitive - Descriptive )**
이름은 짧고 직관적이며 설명적이어야 한다.
* Short( 짧은 ). 이름을 입력하는 데 시간이 오래 걸리지 않으므로 기억해야 한다.
* Intutitive( 직관적 ). 이름은 가능한 한 일반적인 연설에 가깝게 자연스럽게 읽어야 한다.
* Descriptive( 설명 ). 이름은 가장 효율적인 방식으로 수행/소유하는 것을 반영해야 한다.

```
/* Bad */
const a = 5 // "a" could mean anything
const isPaginatable = a > 10 // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10 // Made up verbs are so much fun!


/* Good */
const postCount = 5
const hasPagination = postCount > 10
const shouldDisplayPagination = postCount > 10 // alternatively
```



#### **축소 방지 ( Avoid contractions )**
네이밍 축소. 즉 너무 짧게 줄여서 약어처럼 사용하지 않게 하기.
- 코드의 가독성을 떨어뜨리는 것 외에는 아무 것도 기여하지 않는다.


```
/* Bad */
const onItmClk = () => {}

/* Good */
const onItemClick = () => {}
```



#### **컨텍스트 중복 방지( Avoid context duplication )**
- 이름은 정의된 컨텍스트와 중복되어서는 안된다. 가독성이 떨어지지 않는다면 항상 이름에서 컨텍스트를 제거.

```
class MenuItem {
  /* 메서드 이름이 컨텍스트("MenuItem")와 중복.*/
  handleMenuItemClick = (event) => { ... }

  /*  `MenuItem.handleClick()` 처럼 쓰는게 훨씬 좋아보인다. */
  handleClick = (event) => { ... }
}
```

#### **예상 결과 반영 (Reflect the expected result)**
- 이름은 예상 결과를 반영해야 합니다.

```
/* Bad */
const isEnabled = itemCount > 3
return <Button disabled={!isEnabled} />

/* Good */
const isDisabled = itemCount <= 3
return <Button disabled={isDisabled} />
```




#### **Naming functions**
- 함수의 이름을 지정할 때 따라야 할 유용한 패턴.

**A/HC/LC Pattern**
- prefix? + action (A) + high context (HC) + low context? (LC)

Take a look at how this pattern may be applied in the table below.

| Name | Prefix | Action (A) | High context (HC) |	Low context (LC) |
|:---- |:---- |:---- |:---- |:---- |
| getPost		             |---| get | Post | --- |
| getPostData		         |---| get | Post | Data |
| handleClickOutside		 |---| handle |	Click | Outside |
| shouldDisplayMessage | should |	Display | Message | --- |	

> - Note: 참고: 컨텍스트의 순서는 변수의 의미에 영향을 준다.
> 예를 들어 shouldUpdateComponent 는 구성 요소를 업데이트하려고 함을 의미.
> shouldComponentUpdate 는 구성 요소가 자체적으로 업데이트된다는 것을 알려줍니다. 
> 업데이트해야 하는 시기를 제어하는 것 뿐이다. 즉, 상위 컨텍스트는 변수의 의미를 강조.

---------

##### **1. Actions**
- 함수 이름의 동사 부분이다. 함수가 하는 일을 설명하는 가장 중요한 부분.

**get** 
데이터에 즉시 액세스 (즉, 내부 데이터의 약식 getter).

```
function getFruitCount() {
  return this.fruits.length
}
```


**set**
- 값 A를 값 B로 사용하여 선언적 방식으로 변수를 설정한다.

```
let fruits = 0
function setFruits(nextFruits) {
  fruits = nextFruits
}
setFruits(5)
console.log(fruits) // 5
```

**reset**
- 변수를 초기 값 또는 상태로 다시 설정한다.

```
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function resetFruits() {
  fruits = initialFruits
}

resetFruits()
console.log(fruits) // 5
```

**fetch**
-  비동기 요청 즉, 불확실한 시간이 소요되는 일부 데이터 요청

```
async function fetchPosts(postCount) {
  const response = await fetch(`https://api.dev/posts?limit=${postCount}`)
  return response.json()
}
```

**remove**
- 무언가를 제거
예를 들어 검색 페이지에 선택된 필터 컬렉션이 있는 경우 컬렉션에서 필터 중 하나를 제거하는 것은 deleteFilter 가 아니라 removeFilter 이다.

```
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}
const selectedFilters = ['price', 'availability', 'size']
removeFilter('price', selectedFilters)
```



**delete**
- 무언가를 완전히 삭제.
없애고 싶은 게시물이 있을 때  "게시물 삭제" 버튼을 클릭시 메서드 네이밍 및 기능은 removePost 가 아닌 deletePost 작업을 수행해야 한다.

```
function deletePost(id) {
  return database.find({ id }).delete()
}
```


**compose**
- 기존 데이터에서 새 데이터를 생성한다. 주로 문자열, 개체 또는 함수에 적용할 수 있다.

```
function composePageUrl(pageName, pageId) {
  return `${pageName.toLowerCase()}-${pageId}`
}
```


**handle**
이벤트 handle 을 처리한다.  콜백 메서드의 이름을 지정할 때 자주 사용됩니다.

```
function handleLinkClick() {
  console.log('Clicked a link!')
}
link.addEventListener('click', handleLinkClick)
```


---------


##### **2. Context**
함수가 작동하는 도메인( 범위 ).
함수는 종종 무언가에 대한 작업이기에 작동 가능한 도메인이 무엇인지 또는 최소한 예상되는 데이터 유형을 명시하는 것이 중요.

```
/* 프리미티브로써 작동하는 순수 함수 */
function filter(predicate, list) {
  return list.filter(predicate)
}

/* 게시물에서만 정확히 작동하는 기능 */
function getRecentPosts(posts) {
  return filter((post) => post.date === Date.now(), posts)
}
```

일부 언어 특유적으로 컨텍스트를 생략할 수 있다. 예를 들어, JavaScript 에서는 필터가 Array 에서 작동하는 것이 일반적.
명시적 filterArray 와 같이 Array 를 추가할 필요가 없다.

-----------

##### **3. Prefixes**
- 접두사는 변수의 의미를 향상시킨다. 함수 이름에는 거의 사용되지 않는다.

**is**
- 현재 컨텍스트(일반적으로 boolean)의 특성 또는 상태를 설명.

```
const color = 'blue'
const isBlue = color === 'blue' // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log('Blue is present!')
}
```

**has**
- 현재 컨텍스트가 특정 값 또는 상태(보통 부울)를 소유하는지 여부를 설명.

```
/* Bad */
const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

/* Good */
const hasProducts = productsCount > 0
```

**should**
- 특정 작업과 결합된 긍정적인 조건문(보통 부울)을 반영.

```
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl
}
```


**min/max**
- 최소값 또는 최대값을 나타낸다. 경계 또는 한계를 설명할 때 사용.

```
/**
 * Renders a random amount of posts within
 * the given min/max boundaries.
 */
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts))
}
```

**prev/next**
- 현재 컨텍스트에서 변수의 이전/다음 상태 전환을 설명할 때 사용.


```
async function loadMorePosts() {
  const prevPosts = posts.value

  const fetchedPosts = await fetchPosts(10)
  const nextPosts = [...prevPosts, ...fetchedPosts]

  posts.value = nextPosts
}
```

#### **단수 / 복수 ( Singular and Plurals )**
- 접두사와 마찬가지로 변수 이름은 단일 값 또는 여러 값을 보유하는지 여부에 따라 단수 또는 복수로 만들 수 있다.

```
/* Bad */
const friends = 'Bob'
const friend = ['Bob', 'Tony', 'Tanya']

/* Good */
const friend = 'Bob'
const friends = ['Bob', 'Tony', 'Tanya']
```

### 2. 모던 JavaScript 작성 규칙

- `var` 는 사용하지 않는다. 재할당이 없으면 `const`, 있으면 `let` 을 사용한다.
- 비교는 항상 일치 연산자 `===` / `!==` 를 사용한다.
- 모듈은 ES Modules( `import` / `export` )로 작성한다. ( CommonJS `require` 지양 )
- 비동기 처리는 콜백이나 `.then()` 체인 대신 `async` / `await` + `try` / `catch` 로 작성한다.
- 값이 없을 수 있는 객체 접근은 옵셔널 체이닝 `?.`, 기본값은 `||` 대신 null 병합 연산자 `??` 를 사용한다. ( `||` 는 0, '' 도 기본값으로 바꿔버린다. )
- 객체/배열 복사는 스프레드 `...` ( 얕은 복사 ), 깊은 복사는 `structuredClone()` 을 사용한다. ( `JSON.parse(JSON.stringify())` 지양 )
- 반복은 `for` 문보다 `map` / `filter` / `find` / `some` 같은 배열 메서드를 우선 사용한다.

```
/* Bad */
var count = data && data.items && data.items.length || 10
fetchUser(id).then(function (user) { console.log(user) })

/* Good */
const count = data?.items?.length ?? 10

try {
  const user = await fetchUser(id)
  console.log(user)
} catch (error) {
  console.error(error)
}
```

- 코드 품질과 포맷은 사람이 아닌 도구로 통일한다. **ESLint**( flat config : `eslint.config.js` )로 문법 오류/규칙을 검사하고, **Prettier** 로 포맷을 자동 정리한다.

----------



## 5. Typescript

- 에러 or tip
- 중첩된 Scope 에 기존의 변수 이름을 사용하는 것을 Shadow
- api 통신하는 객체는 interface 로 구조를 잡는다.
- let 과 const 중 어떤 것을 사용할지 스스로 선택. 
- 최소 권한의 원칙(Principle of least privilege)을 적용하면 수정하려는 모든 선언은 const 를 사용한다.

- `tsconfig.json` 은 **`"strict": true`** 를 기본으로 사용한다. ( null 체크, 암시적 any 금지 등 엄격한 타입 검사 )
- 타입을 알 수 없는 값은 `any` 대신 **`unknown`** 으로 받고, 타입 가드로 좁혀서 사용한다.

- 조건 연산자 
`? -> Optional 이라고 한다. `
말그대로 필수값이 아닌 옵셔널한 값이라는 뜻. ( 타입은 `값 | undefined` 가 된다. )

`! -> Non-null 단언 / 확정 할당 단언`
- 값 뒤에 붙이면( `el!.focus()` ) 컴파일러에게 **null / undefined 가 아니라고 단언**한다. 타입 검사만 통과시킬 뿐 런타임 검사는 하지 않으므로 남용하지 않는다.
- 클래스 프로퍼티 뒤에 붙이면( `name!: string` ) 생성자 밖에서 초기화된다고 단언한다.
- 가능하면 `!` 대신 옵셔널 체이닝( `el?.focus()` )이나 조건문으로 좁혀서 사용한다.

------------


### **유니온(Union)타입**
유니온 타입은 하나의 프로퍼티에 다양한 변수가 올 수 있는 타입을 말한다.

```let someValue: number | string```

위에서 변수 someValue 는 숫자 값으로도 할당할 수 있고 문자열로도 할당할 수 있다.

```let someValue: "a" | "b" | "c"```

```
function padLeft(value: string, padding: string | number) {
  // ...
}
let indentedString = padLeft("Hello world", true); // 오류: boolean 은 string | number 에 할당할 수 없다.


interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// 오류: swim 은 두 개의 잠재적인 타입 중 Fish 에서만 사용할 수 있다.
pet.swim();

// 타입 가드( in 연산자 )로 좁힌 뒤에 사용한다.
if ("swim" in pet) {
  pet.swim();
}

```

------------

### **교차 타입 (Intersection Types)**

교차 타입은 유니언 타입과 밀접한 관련이 있지만, 사용 방법은 매우 다르다. 교차 타입은 여러 타입을 하나로 결합한다. 
기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있다. 
예를 들어, Person & Serializable & Loggable 은 Person 과 Serializable 그리고 Loggable 이다.
즉, 이 타입의 객체는 세 가지 타입의 모든 멤버를 갖게 됩니다.

예를 들어, 일관된 에러를 다루는 여러 네트워크 요청이 있다면 해당 에러 핸들링을 분리하여 하나의 응답 타입에 대응하는 결합된 자체 타입으로 만들 수 있다.

```
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 이 인터페이스들은
// 하나의 에러 핸들링과 자체 데이터로 구성됩니다.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

------------


### **교차를 통한 믹스인 (Mixins via Intersections)**

```
class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(name: string): void;
}
class ConsoleLogger implements Loggable {
  log(name: string) {
    console.log(`Hello, I'm ${name}.`);
  }
}

// 두 객체를 받아 하나로 합칩니다.
function extend<First extends {}, Second extends {}>(
  first: First,
  second: Second
): First & Second {
  const result: Partial<First & Second> = {};
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);
```

------------


### **상속 (Inheritance)**

```
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//아래 코멘트는 결과 
//Slithering...
//Sammy the Python moved 5m.
//Galloping...
//Tommy the Palomino moved 34m.
```


------------


### **기본적으로 공개 (Public by default)**

```
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

------------


### **비공개( private )**

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음.
```

> note : TypeScript 의 `private` 은 컴파일 시점에만 검사하고 JS 로 변환되면 일반 프로퍼티가 된다.  
> 런타임에서도 외부 접근을 막아야 한다면 JavaScript 표준 private 필드 **`#name`** 을 사용한다.

```
class Animal {
  #name: string;
  constructor(name: string) { this.#name = name; }
}
```

------------


### **멤버 공개 ( protected )**

- 아래 소스에서 Person 클래스의  name 은 사용할 수 없지만, Employee 클래스에서는 Person 에서 파생되었기 때문에 Employee 의 인스턴스 메서드 내에서는 사용 가능.

```
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류
```

생성자 또한 protected 로 표시될 수도 있다. 이는 클래스를 포함하는 클래스 외부에서 인스턴스화 할 수 없지만 확장 할 수 있음을 의미.

```
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee는 Person을 확장할 수 있다.
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 이다.
```

------------


### **읽기전용 (Readonly modifier)**

`readonly`키워드를 사용하여 프로퍼티를 읽기전용으로 만들 수 있다. 
읽기전용 프로퍼티들은 선언 또는 생성자에서 초기화해야 한다.

```
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 오류! name은 읽기전용.
```

------------


### **get/set 접근자 (Accessors)**
체의 멤버에 대한 접근을 가로채는 방식으로 getters/setters를 지원한다. 이를 통해 각 객체의 멤버에 접근하는 방법을 세밀하게 제어할 수 있다.

```
const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }
        this._fullName = newName;
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

------------


### **전역 프로퍼티 (Static Properties)**
인스턴스가 아닌 클래스 자체에서 보이는 전역 멤버를 생성할 수 있다. 
아래 예제에서 모든 grid 의 일반적인 값이기 때문에 origin 에 static 을 사용한다. 
각 인스턴스는 클래스 이름을 앞에 붙여 이 값에 접근할 수 있다. 
인스턴스 접근 앞에 this.를 붙이는 것과 비슷하게 여기선 전역 접근 앞에 Grid.를 붙인다.

```
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

------------


### **추상 클래스 (Abstract Classes)**
추상 클래스는 다른 클래스들이 파생될 수 있는 기초 클래스이다. 
추상 클래스는 직접 인스턴스화할 수 없다. **추상 클래스는 인터페이스와 달리 멤버에 대한 구현 세부 정보를 포함할 수 있다**. 
abstract 키워드는 추상 클래스뿐만 아니라 추상 클래스 내에서 추상 메서드를 정의하는데 사용된다.
```
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

추상 클래스 내에서 추상으로 표시된 메서드는 구현을 포함하지 않으며 반드시 파생된 클래스에서 구현되어야 한다. 
추상 메서드는 인터페이스 메서드와 비슷한 문법을 공유한다. 둘 다 메서드 본문을 포함하지 않고 메서드를 정의한다. 
그러나 **추상 메서드는 반드시 abstract 키워드를 포함해야 하며, 선택적으로 접근 지정자를 포함할 수 있다**.

```
abstract class Department {
    constructor(public name: string) {
    }
    printName(): void {
        console.log("Department name: " + this.name);
    }
    abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 합니다.
}
class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 합니다.
    }
    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // 추상 타입의 레퍼런스를 생성합니다
department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없습니다
department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당합니다
department.printName();
department.printMeeting();
department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않습니다
```

------------


### **열거형 (Enums)**
열거형으로 이름이 있는 상수들의 집합을 정의할 수 있다. 
열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있다. 
TypeScript 는 숫자와 문자열-기반 열거형을 제공한다.

- **숫자 열거형 (Numeric enums)**

```
//원한다면, 전부 초기화 하지 않을 수도 있다:
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}
//위 코드에서 Up이 1 로 초기화된 숫자 열거형을 선언. 
//그 지점부터 뒤따르는 멤버들은 자동으로-증가된 값을 갖는다. 
//즉 Direction.Up 은 1, Down 은 2, Left 는 3, Right 은 4 을 값으로 가진다.
```

- **문자열 열거형 (String enums)**
문자열 열거형은 유사한 개념이지만 아래 설명된 것과 같이 런타임에서 열거형의 동작이 약간 다르다.
문자열 열거형에서 각 멤버들은 문자열 리터럴 또는 다른 문자열 열거형의 멤버로 상수 초기화 해야 한다.

문자열 열거형은 숫자 열거형처럼 자동-증가하는 기능은 없지만, "직렬화"를 잘한다는 이점이 있다. 
다시 말해서 숫자 열거형을 이용해서 디버깅하고 있고 그 값을 읽어야 한다면, 종종 그 값이 불확실한 경우가 있다 - 숫자만으로는 이것이 어떤 의미인지 유의미한 정보를 제공해주지 않기 때문이다.
반면 문자열 열거형을 이용하면 코드를 실행할 때, 열거형 멤버에 지정된 이름과는 무관하게 유의미하고 읽기 좋은 값을 이용하여 실행할 수 있다.

```
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

> note: 기술적으로 열거형은 숫자와 문자를 섞어서 사용할 수 있지만 굳이 그렇게 할 이유는 없다.

> note : 최근에는 enum 대신 **유니온 리터럴 타입** 또는 **`as const` 객체**를 권장한다.  
> - enum 은 타입만 지우면 되는 다른 문법과 달리 런타임 코드를 생성하고, 숫자 enum 은 아무 숫자나 할당되는 등 타입 안전성이 약하다.  
> - Node.js 의 TypeScript 실행(타입 제거 방식)이나 `erasableSyntaxOnly` 옵션(TS 5.8+)에서는 enum 을 사용할 수 없다.

```
// 유니온 리터럴 타입
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// as const 객체 ( 값 목록이 런타임에도 필요할 때 )
const DIRECTION = {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION]; // 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
```

------------


### **다형성 this 타입 (Polymorphic this types)**

```
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... 다른 연산들은 여기에 작성 ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

//클래스가 this 타입을 사용하기 때문에, 이를 extend 할 수 있고 새로운 클래스가 아무 변경 없이 이전 메서드를 사용할 수 있다.
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... 다른 연산들은 여기에 작성 ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
// this 타입 없이, ScientificCalculator는 BasicCalculator를 extend 할 수 없을 것이고 유연한 인터페이스를 유지하지 못한다. 
// multiply는 sin 메서드를 가지지 않는 BasicCalculator를 반환한다. 하지만, this 타입으로, multiply는 this를 반환하고, 여기서는 ScientificCalculator 을 가르킨다.
```

------------


### **인덱스 타입 (Index types)**

일반적인 js 패턴 

```
function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
}
```
TypeScript 에서 인덱스 타입 패턴
- 인덱스 타입을 사용하면, 동적인 프로퍼티 이름을 사용하는 코드를 컴파일러가 검사할 수 있다.
- 인덱스 타입 쿼리와 인덱스 접근 연산자를 사용해서 TypeScript 에서 이 함수를 어떻게 작성하고 사용하는지 보여준다:

 ```
 function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
   return propertyNames.map(n => o[n]);
 }
 
 interface Car {
     manufacturer: string;
     model: string;
     year: number;
 }
 let taxi: Car = {
     manufacturer: 'Toyota',
     model: 'Camry',
     year: 2014
 };
 
 // Manufacturer과 model은 둘 다 문자열 타입.
 // 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있다.
 let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
 
 // 만약 model과 year를 끌어내려고 하면,
 // 유니언 타입의 배열: (string | number)[] 을 얻게 된다.
 let modelYear = pluck(taxi, ['model', 'year'])
```

------------


### **인덱스 타입과 인덱스 시그니처 (Index types and index signatures)**
keyof 와 T[K] 가 인덱스 시그니처와 상호 작용한다. 인덱스 시그니처 매개변수 타입은 'string' 혹은 'number' 이어야 한다. 
만약 문자열 인덱스 시그니처인 타입이 있으면, keyof T는 string | number 가 될 것이다 (그냥 string 이 아니고, JavaScript 에선 문자열 (object['42'])나 숫자 (object[42])를 사용해서 객체 프로퍼티에 접근할 수 있다). 
그리고 T[string]은 인덱스 시그니처의 타입이다.

```
interface Dictionary<T> {
    [key: string]: T;
}
let keys: keyof Dictionary<number>; // string | number
let value: Dictionary<number>['foo']; // number

-------------------------------

//숫자 인덱스 시그니처인 타입이 있으면, keyof T는 number일 것이다.
interface Dictionary<T> {
    [key: number]: T;
}
let keys: keyof Dictionary<number>; // 숫자
let value: Dictionary<number>['foo']; // 오류, 프로퍼티 'foo'는 타입 'Dictionary<number>'에 존재하지 않습니다.
let value: Dictionary<number>[42]; // 숫자
```


------------


### **매핑 타입 (Mapped types)**
- 기존 타입을 가져와 선택적 프로퍼티로 만드는 것은 일반적인 작업.

```
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}


//사용하기 위해선 아래와 같이
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```




```
interface Options{
   width:number;
   height: number;
   color: string;
   label: string;
}
interface OptionsUpdate{
   width? :number;
   height?: number;
   color?: string;
   label?: string;
}


// --> 매핑된 타입과 keyof 를 사용하면 Options 으로부터 OptionsUpdate 를 만들 수 있다.
type OptionsUpdate = { [K in keyof Options]?: Options[K] };

// 내장 유틸리티 타입 Partial 과 동일하다.
type OptionsUpdate = Partial<Options>;

```

------------


### **객체 순회 노하우**
  
```

const obj={
  one: 'uno',
  two: 'dos',
  three: 'tres'
}
for(const k in obj){
  const v=obj[k];
  // ~~~~~~~~~~~에러 :  obj 에 인덱스 시그니처가 없기 때문에 엘리먼트는 암시적으로 'any' 타입입니다. ( k 가 string 으로 추론됨 )
}

// k 타입을 구체적으로 명시하면 된다.
let k: keyof typeof obj;
for(k in obj){
  const v=obj[k];
}
```





```
interface ABC{
  a: string;
  b: string;
  c: string;
}

function foo(abc: ABC){
   for(const k in abc){
      const v=abc[k];
      // ~~~~~~~~~~~~~~ 'ABC' 타입에 인덱스 시그니처가 없기 때문에 엘리먼트는 암시적으로 'any'가 됩니다.
   }
}
// const x={ a:'a', b: 'b', c:2, d: new Date()} 
// foo(x); // 정상 처리 됨.
// foo 함수는 a,b,c 속성 외에 d 를 가지는 x 객체로 호출이 가능하다. 즉 foo 함수는 ABC 타입에 할당 가능한 어떠한 값이든 매개변수로 허용하기 때문

-> 다음과 같이 수정 ( Object.entries 는 for...of 로 순회 )
function foo(abc: ABC){
   for(const [k, v] of Object.entries(abc)){
      // k => string 타입 
      // v => any 타입 
   }
}
```
------------



### **type 별칭 및 interface 사용 구분** 
-Use an interface instead of a type literal.
타입은 리터럴 타입에서만 사용하고 Object 형태의 타입은 인터페이스를 쓰라는 소리다.
type 별칭은 리터럴 타입의 값에만 사용하고, Object 형태의 타입을 잡아줄 때는 Interface 를 사용하면 고민없이 행복해진다.

- **interface** : 객체 형태, 확장(`extends`)이 필요한 타입
- **type** : 유니온, 튜플, 함수 타입, 유틸리티 타입 조합 등 interface 로 표현할 수 없는 타입
- 이름 앞에 `I` / `T` 접두어( `IMember`, `TTier` )는 붙이지 않는다. ( TypeScript 공식 가이드 및 최근 컨벤션 )

```
export type MemberTier = "Basic" | "Premium" | "Admin";

export interface Member {
  name: string;
  age: number;
  address: string;
  tier: MemberTier;
}
```

- Destructuring
- 함수
```
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1, 2]);
```

- 객체
```	
({ a, b } = { a: "baz", b: 101 });
//
let { a, b }: { a: string, b: number } = o;
```

------------


### **값의 형태에 해당하는 타입을 정의하고 싶을때**

```
const INIT_OPTIONS={
   width: 640,
   height: 480,
   color: '#00FF00',
   label: 'VGA'
}

interface Options{
   width: number;
   height: number;
   color: string;
   label: string;
}

// 이런 경우 typeof 를 사용하면 된다.
type Options = typeof INIT_OPTIONS;
```


------------


### **타입스크립트에서 유용한 유틸** 

#### **Omit<T,K>**
- T에서 모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성.

```
// Example
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = Omit<Todo, 'description'>;
const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};
```

---------------


#### **Pick<T,K>**
T에서 프로퍼티 K의 집합을 선택해 타입을 구성.
```
// 예제 (Example)
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};
```

---------------


#### **keyof**
keyof 키워드는 타입 값에 존재하는 모든 프로퍼티의 키값을 union 형태로 리턴 받다.

```
interface Todo {
    id: number;
    text: string;
    due: Date;
}

// TodoKeys의 타입 = "id" | "text" | "due"
type TodoKeys = keyof Todo;
```

---------------


#### **Record<K,T>**
타입 T의 프로퍼티의 집합 K로 타입을 구성한다. 
이 유틸리티는 타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용될 수 있다.
Record<K, V>로 쓰인다. 여기서 K는 key 이고, V는 Value 다. 

```
//예제 (Example)

export type GlobalColors = 'Red' | 'Blue' | 'Green' | 'Black'
type ColorProperties = Record<GlobalColors, string>

//위 두줄 typescript는 아래와 같다
type ColorProperties = {
  Red: string
  Blue: string
  Green: string
  Black: string
}

——————

interface PageInfo {
    title: string;
}
type Page = 'home' | 'about' | 'contact';
const x: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    home: { title: 'home' },
};

```

---------------


#### **Partial<T>**
Partial 은 key 를 옵셔널하게 해준다.
T의 모든 프로퍼티를 선택적으로 만드는 타입을 구성한다. 
이 유틸리티는 주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환한다.

```
예제 (Example)

export type GlobalColors = 'Red' | 'Blue' | 'Green' | 'Black'
type ColorProperties = Record<GlobalColors, string>

//위 두줄 typescript는 아래와 같다
type ColorProperties = {
  Red: string
  Blue: string
  Green: string
  Black: string
}

// 이거는
type PartialColorProperties = Partial<ColorProperties>
// 이거와 같다.
type PartialColorProperties = { Red?: string, Blue?: string, Green?: string, Black?: string }

——————

interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
});
```

정리 

```
// 글로벌 색으로 4가지를 선언한다.
export type GlobalColors = 'Red' | 'Blue' | 'Green' | 'Black'

// 기본값으로 모든 색상을 선언한다. ( Record : 키 누락 시 오류 )
const GLOBAL_COLOR_SET: Record<GlobalColors, string> = {
  Red: '11, 11, 11',
  Blue: '22, 22, 22',
  Green: '33, 33, 33',
  Black: '44, 44, 44',
}

// 일부 색상만 덮어쓰고 싶다면 Partial 로 선택적 키를 허용한다.
const CUSTOM_COLORS: Partial<Record<GlobalColors, string>> = {
  Black: '55, 55, 55',
}

const colors = { ...GLOBAL_COLOR_SET, ...CUSTOM_COLORS }
```

---------------


#### **Parameters<T>**
함수 타입 T의 매개변수 타입들의 튜플 타입을 구성.

```
예제 (Example)
declare function f1(arg: { a: number, b: string }): void
type T0 = Parameters<() => string>;  // []
type T1 = Parameters<(s: string) => void>;  // [string]
type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
type T4 = Parameters<typeof f1>;  // [{ a: number, b: string }]
type T5 = Parameters<any>;  // unknown[]
type T6 = Parameters<never>;  // never
type T7 = Parameters<string>;  // 오류
type T8 = Parameters<Function>;  // 오류
```

---------------


#### **ReturnType<T>**
함수 T의 반환 타입으로 구성된 타입을 만듭니다.

```
예제 (Example)
declare function f1(): { a: number, b: string }
type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<(s: string) => void>;  // void
type T2 = ReturnType<(<T>() => T)>;  // unknown
type T3 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T4 = ReturnType<typeof f1>;  // { a: number, b: string }
type T5 = ReturnType<any>;  // any
type T6 = ReturnType<never>;  // never
type T7 = ReturnType<string>;  // 오류
type T8 = ReturnType<Function>;  // 오류
```



--------------------


#### **InstanceType<T>**
클래스 생성자의 인스턴스 타입을 구한다.

```
예제 (Example)
type A={new(): B}
type B={b: number}
type I= InstanceType<A> // {b: number}
```
 

--------------------


#### **ConstructorParameters<T>**
`ConstructorParameters<T>`타입은 생성자 함수 타입의 모든 매개변수 타입을 추출할 수 있게 해준다. 
모든 매개변수 타입을 가지는 튜플 타입(T가 함수가 아닌 경우 never)을 생성.

```
예제 (Example)
type T0 = ConstructorParameters<ErrorConstructor>;  // [(string | undefined)?]
type T1 = ConstructorParameters<FunctionConstructor>;  // string[]
type T2 = ConstructorParameters<RegExpConstructor>;  // [string, (string | undefined)?]
```

--------------------


#### **그 외 자주 쓰는 유틸리티 타입**

| 유틸리티 | 설명 |
|------|------|
| `Required<T>` | 모든 프로퍼티를 필수로 ( Partial 의 반대 ) |
| `Readonly<T>` | 모든 프로퍼티를 읽기전용으로 |
| `Exclude<T, U>` | 유니온 T 에서 U 에 해당하는 타입 제거 ( `Exclude<'a' \| 'b', 'a'>` → `'b'` ) |
| `Extract<T, U>` | 유니온 T 에서 U 에 해당하는 타입만 추출 |
| `NonNullable<T>` | T 에서 null, undefined 제거 |
| `Awaited<T>` | Promise 가 resolve 된 값의 타입 ( `Awaited<Promise<string>>` → `string` ) |


--------------------


### **최신 문법 ( satisfies / as const )**

**as const**
- 값을 가장 좁은 리터럴 타입으로 고정하고 모든 프로퍼티를 readonly 로 만든다.

```
const ROLES = ['admin', 'user', 'guest'] as const;

type Role = (typeof ROLES)[number]; // 'admin' | 'user' | 'guest'
```

**satisfies** ( TS 4.9 이상 )
- 값이 타입을 만족하는지 검사하면서도, 타입 단언(`as`)이나 타입 지정과 달리 **추론된 구체적인 타입을 유지**한다.

```
type Colors = Record<'primary' | 'secondary', string | number[]>;

// 타입 지정 : palette.primary 가 string | number[] 로 넓어진다.
const palette1: Colors = { primary: '#2f4dc9', secondary: [255, 0, 0] };
palette1.primary.toUpperCase(); // 오류

// satisfies : 키/값 검사는 하면서 primary 는 string 으로 유지된다.
const palette2 = { primary: '#2f4dc9', secondary: [255, 0, 0] } satisfies Colors;
palette2.primary.toUpperCase(); // ok
```


----------



## 6. Image 및 Font 구조
| Directory                 | Description  |
|:--------------------------|:-------------|
| dist/assets/images        | 이미지 경로       |
| dist/assets/images/common | 공통요소 이미지 경로  |
| dist/assets/images/main   | 메인페이지 이미지 경로 |
| dist/assets/images/pages  | 서브페이지 이미지 경로 |
| dist/assets/font          | 공통 폰트 경로     |

--------



## 7. Javascript 및 라이브러리 구조

| Directory                              | Description                        |
|:---------------------------------------|:-----------------------------------|
| dist/assets/js                         | javascript 경로                      |
| dist/assets/js/apps.js                 | gnb 활성화 변수( singleton 정의 js  )     |
| dist/assets/js/common.js               | gnb 및 공통 기능 정의 js                  |
| dist/assets/js/Utils.js                | 유틸 기능 정의 js                        |
| dist/assets/vendors/bootstrap          | 화면 레이아웃 및 요소 지원( 부트스트랩 라이브러리 )     |
| dist/assets/vendors/jquery             | 화면(dom) 컨트롤 지원 ( jquery js 라이브러리 ) |
| dist/assets/vendors/gsap               | 모션 컨트롤 지원 ( GSAP 3 js 라이브러리 )        |
| dist/assets/vendors/swiper/swiper      | 캐러셀 컨트롤 지원 ( css/js 라이브러리 )        |

> note : 라이브러리 선택 기준
> - **GSAP** : `TweenMax` 는 GSAP 2 이전 API 이다. GSAP 3 부터 `gsap.to()` 단일 API 로 통합되었고 플러그인 포함 무료로 사용할 수 있다.
> - **jQuery** : 신규 작업은 `querySelector`, `classList`, `fetch` 등 표준 DOM API 로 대체 가능하다. 사용해야 한다면 1.x 가 아닌 최신 버전을 사용한다. ( 1.x 는 보안 취약점 존재 )
> - 단순 전환/페이드 효과는 라이브러리 대신 CSS `transition` / `animation` 을 우선 사용한다.

## 8. Directory
### 8-1. 배포용 폴더 구성 
| Directory                 | Description   |
|:--------------------------|:--------------|
| dist/assets/images        | 이미지 경로        |
| dist/assets/images/common | 이미지 경로        |
| dist/assets/images/main   | 메인페이지 이미지 경로  |
| dist/assets/font          | 공통 폰트 경로      |
| dist/assets/js            | javascript 경로 |
| dist/assets/vendors       | 라이브러리         |
| dist/pages                | html          |

-------------------

### 8-2. 로컬 개발용 폴더 구성 
| Directory                | Description          |
|:-------------------------|:---------------------|
| src/assets/images        | 이미지 경로               |
| src/assets/images/common | 이미지 경로               |
| src/assets/images/main   | 메인페이지 이미지 경로         |
| src/assets/font          | 공통 폰트 경로             |
| src/assets/js            | javascript 경로        |
| src/assets/scss          | scss 경로              |
| src/assets/scss/default  | 공통 scss 경로           |
| src/assets/scss/pages    | 1depth 카테고리별 scss 경로 |
| src/assets/vendors       | 라이브러리                |
| src/pages                | html                 |

-------------------

### 8-3. SPA ( Vite + Vue ) 프로젝트 폴더 구성
- `npm create vue@latest` 로 생성한 프로젝트 기준. 빌드 결과물은 `dist/` 에 생성되며 직접 수정하지 않는다.

| Directory / File         | Description                          |
|:-------------------------|:-------------------------------------|
| public/                  | 빌드 시 그대로 복사되는 정적 파일 ( favicon 등 ) |
| src/assets/              | 이미지, 폰트, 전역 스타일 ( 빌드 시 최적화/해시 처리 ) |
| src/components/          | 재사용 컴포넌트                           |
| src/views/               | 라우트 단위 페이지 컴포넌트                    |
| src/composables/         | 재사용 로직 ( `useXxx.ts` )             |
| src/stores/              | Pinia 스토어                          |
| src/router/              | Vue Router 설정                       |
| src/api/                 | API 통신 모듈 ( axios 인스턴스 등 )        |
| src/types/               | 공통 타입 정의                           |
| index.html               | 앱 진입 HTML ( Vite 는 루트의 index.html 이 진입점 ) |
| vite.config.ts           | Vite 설정                            |
| .env / .env.production   | 환경 변수 ( `VITE_` 접두어만 클라이언트에 노출 ) |


--------------


## 9. 문서 구조
#### head 부분

```
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">
    <meta content="" property="og:title">
    <meta content="" property="og:url">
    <meta content="" property="og:description">
    <meta content="" property="og:image">
    <meta content="website" property="og:type">
    <meta content="" property="og:site_name">
    <meta content="" name="title">

    <!-- inject:css -->
    <link href="../assets/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/vendors/swiper/swiper-bundle.min.css" rel="stylesheet">
    <link href="../assets/css/common.css" rel="stylesheet">
    <link href="../assets/css/sub.css" rel="stylesheet">
    <!-- endinject -->


    <!-- inject:dependency:js -->
    <script src="../assets/vendors/bootstrap/js/bootstrap.bundle.min.js" defer></script>
    <script src="../assets/vendors/gsap/gsap.min.js" defer></script>
    <script src="../assets/vendors/swiper/swiper-bundle.min.js" defer></script>
    <!-- endinject -->

    <!-- inject:head:js -->
    <script src="../assets/js/apps.js" defer></script>
    <!-- endinject -->
</head>
```


### body 부분

> note :
> - 메인페이지일 경우 wrapper 부분은 div class="wrapper main" 라고 지정.
> - 서브페이지일 경우 wrapper 부분은 div class="wrapper sub" 라고 지정.
> - 서브페이지에서 추가 구분은 추가명칭 flag 가 붙는다. 회원가입 페이지 경우 div class="wrapper sub sign-up" 처럼 구분 된다.
> - 페이지 영역은 `<header>`, `<nav>`, `<main>`, `<footer>` 시맨틱 엘리먼트(랜드마크)로 구분한다. `<main>` 은 페이지당 하나만 사용한다. ( 스크린 리더의 영역 이동에 사용 )

```
<div class="wrapper sub sign-up">

    <!--start:skip -->
    <div id="skip">
        <a href="#gnb">주메뉴 바로가기</a>
        <a href="#contents">본문 바로가기</a>
        <a href="#footer">하단 바로가기</a>
    </div>
    <!--//end:skip -->

    <!-- start: header / gnb -->
    <header>
        <div class="header-container clearfix">

            <!--start: gnb full type -->
            <nav id="gnb">
                <div class="menu-container">
                    <h1><a class="top-logo" href="#" title="로고">..............</a></h1>
                    <p class="blind">주 메뉴시작</p>
                    <ul class="dep1-group local clearfix">
                        <li class="nv-item">
                        
                        .............................중략.............................

    </header>
    <!-- end: header / gnb -->

    <main class="container-fluid" id="contents">
        <div class="contents-inner">
             <!-- start: 컨텐츠 상단( 주로 타이틀/ stepper 요소등  ) -->
            <div class="sub-top">
                <h2 class="sub-tit">타이틀</h2>
               
            </div>
            <!-- start: 컨텐츠 상단( 주로 타이틀/ stepper 요소등  ) -->
           
            <!-- start: 컨텐츠 내용 -->
            <div class="sub-contents"> </div>
            <!-- end: 컨텐츠 내용 -->

            <!-- start: 컨텐츠 하단 내용 -->
            <div class="sub-btm"> </div>
             <!-- end: 컨텐츠 하단 내용 -->
        </div>

    </main>

    <footer id="footer"></footer>
</div>

```

----------



## 10. node 버전 관리
- 노드 기반 즉 의존성이 포함된 라이브러리를 많이 쓰는 경우에 협업자들끼리 node 버전을 맞추지 않으면 매번 의존성 라이브러리들을 설치하거나
깃에서 충돌이 날 것이다. 이럴때 간편하게 node 를 설치하고 버전관리를 해주는 것이 nvm 이라는 것이 있다.
- node 는 짝수 버전의 **LTS(Long Term Support)** 버전을 사용한다. ( 홀수 버전은 단기 지원 ) 지원 일정은 [Node.js Releases](https://nodejs.org/ko/about/previous-releases) 에서 확인.
- 프로젝트 루트에 **`.nvmrc`** 파일로 node 버전을 명시해서 협업자 간 버전을 맞춘다.

```
// .nvmrc
24
```

```
nvm use      # .nvmrc 에 적힌 버전으로 전환 ( 미설치 시 nvm install )
```

- `package.json` 의 `engines` 필드로 지원 node 버전을 명시할 수도 있다.

```
"engines": {
  "node": ">=22.12.0"
}
```

### 10-1. nvm 에서 자주 사용할 명령어

`nvm --version`   ( 설치된 nvm 버전 )

`node --version`  ( 설치된 node 버전 )

`nvm ls` ( 현재 설치된 버전을 보여준다. )

`nvm ls-remote --lts` ( 설치 가능한 LTS node 버전을 알려준다. )

`nvm install --lts`  ( 최신 LTS 버전을 설치한다. )

`nvm install 24`  ( node 24 버전대의 최신 버전을 설치한다. )

`nvm use 24`  ( 설치된 node 24 버전을 사용한다. )

`nvm alias default 24`  ( 새 터미널을 열 때 기본으로 사용할 버전 지정 )

----------------------
### 10-2. mac 환경에서 nvm 설치
- macOS 기본 쉘은 zsh 이므로 설정 파일은 `~/.zshrc` 를 사용한다. ( `.bash_profile` 은 bash 사용 시 )
- nvm 공식 설치 스크립트를 사용한다. **sudo 를 붙이지 않는다.** ( 권한 문제가 생긴다 / 버전은 [nvm releases](https://github.com/nvm-sh/nvm/releases) 확인 )

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash
```

- 설치 스크립트가 `~/.zshrc` 에 아래 내용을 자동으로 추가한다. 터미널을 새로 열거나 `source ~/.zshrc` 로 적용한다.

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- 설치 확인

```
nvm --version
```

> note : `nvm: command not found` 가 나오는 경우
> - `~/.zshrc` 파일이 없으면 설치 스크립트가 내용을 추가하지 못한다. `touch ~/.zshrc` 로 파일을 만든 뒤 설치 스크립트를 다시 실행한다.
> - Homebrew 로 설치한 nvm 은 공식적으로 지원하지 않으므로 공식 설치 스크립트를 권장한다.

> note : Apple Silicon(M 시리즈) mac 에서 `command not found: brew` 가 나오는 경우  
> Homebrew 가 `/usr/local` 이 아닌 `/opt/homebrew` 에 설치되기 때문이다. `~/.zshrc` 에 경로를 추가한다.  
> `eval "$(/opt/homebrew/bin/brew shellenv)"`


### 10-3. window 에서 nvm 설치 
1. NVM 설치 파일 다운로드
- [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
- 위 주소에 접속하여 최신 릴리스의 `nvm-setup.exe` 파일을 다운 받는다.

2. NVM 설치 방법
  - 설치 파일을 실행하여 nvm 을 install 한다.
  - windows 명령 프롬프트(cmd) 또는 PowerShell 을 **관리자 권한**으로 실행한다.
  - `nvm version` 을 입력하여 설치된 것을 확인한다.
  
3. nodejs & npm 설치 방법
  - `nvm install lts` 입력 설치 ( 또는 `nvm install 24` )
  - `nvm ls` 를 입력 > 버전을 확인.
  - `nvm use 24` 를 입력 > 해당 버전의 nodejs 활성

> note : nvm-windows 는 `.nvmrc` 를 자동으로 읽지 않는다. `.nvmrc` 를 자동 지원하는 크로스 플랫폼 대안으로 **fnm** 이나 **Volta** 를 사용할 수 있다.

----------------------

## 11. 개발 환경 설정.
- ES 모듈 / TypeScript / SCSS 파일 등을 컴파일 해서 최종 산출물을 전달한다.
- 빌드 도구는 **Vite** 를 사용한다. ( gulp / webpack 대비 설정이 거의 없고, 개발 서버가 빠르며 HMR(저장 시 즉시 반영)을 기본 지원 )
- Vite 는 TypeScript, SCSS, PostCSS, 정적 에셋 처리를 별도 플러그인 없이 지원한다.

> note : Vite 8 은 node `20.19` 이상 또는 `22.12` 이상이 필요하다. ( 10. node 버전 관리 참고 )

1. 프로젝트 생성. (프로젝트를 만들 상위 폴더로 터미널 경로를 이동되어 있어야 한다)

```
# 일반 웹 프로젝트 ( vanilla, vanilla-ts, vue, react 등 템플릿 선택 )
npm create vite@latest

# Vue 프로젝트 ( TypeScript, Router, Pinia, ESLint, Prettier, Vitest 등 선택 )
npm create vue@latest
```

2. 의존성 설치 및 개발 서버 실행

```
cd 프로젝트명
npm install
npm run dev
```

3. 필요한 도구 추가 설치

```
# SCSS
npm install -D sass

# 벤더 프리픽스 자동 추가 ( postcss.config.js 에 autoprefixer 플러그인 등록 )
npm install -D autoprefixer
```

4. package.json 스크립트

| 명령어 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 실행 ( 저장 시 브라우저 즉시 반영 ) |
| `npm run build` | 배포용 빌드 ( `dist/` 폴더에 압축/최적화된 결과물 생성 ) |
| `npm run preview` | 빌드 결과물을 로컬 서버로 미리보기 |

5. 환경 변수
- API 주소 등 환경마다 다른 값은 코드에 하드코딩하지 않고 `.env` 파일로 관리한다.
- `VITE_` 접두어가 붙은 변수만 클라이언트 코드에 노출되며 `import.meta.env.VITE_XXX` 로 사용한다.
- 비밀 키가 담긴 `.env.local` 등은 `.gitignore` 에 추가하고 커밋하지 않는다.

```
// .env.development
VITE_API_BASE_URL=http://localhost:8080

// .env.production
VITE_API_BASE_URL=https://api.example.com
```

> note : 이 가이드 문서 자체도 Vite 로 빌드한다. `README.md` 를 수정하고 `npm run dev` 로 확인, `npm run build` 로 index.html 을 생성한다.

--------

## 12. 형상관리 ( git )

> note : git 기반 - 원격 저장소는 GitHub / GitLab / Bitbucket 등 프로젝트에서 정한 곳을 사용한다.
> - 기본 브랜치 이름은 `master` 대신 **`main`** 을 사용하는 것이 표준이다. ( GitHub, GitLab 신규 저장소 기본값 / 아래 예시의 master 는 저장소에 맞게 바꿔서 사용 )
> - Git 2.23 부터 `git checkout` 의 기능이 브랜치 전환용 **`git switch`** 와 파일 복원용 **`git restore`** 로 분리되었다. 의도가 명확한 새 명령을 권장한다.

#### 12-1. 원격 저장소 연결
```git remote add origin <원격저장소 주소>```
- 원격저장소 등록

```git clone <저장소주소> [새로운 폴더명]```
- 복제하려다 실패하는 대부분의 이유는 폴더명을 생략하면 자동으로 프로젝트 이름과 같은 이름의 폴더가 새로 생성되는데 보통 이름이 이미 존재할 경우라 그런다.
- 에러 fatal: destination path ‘폴더명’ already exist and is not an empty directory. 

-----------------------
#### 12-2. 커밋 / 히스토리 상태 보기 

```git status```
- 현재 진행 상태 

```git log --oneline```
- 간단한 커밋해시와 제목만 보고 싶을때

```git log --oneline --graph --decorate```
- HEAD와 관련된 커밋들을 조금 더 자세히 보고 싶을 때

```git log --oneline --graph --all --decorate```
- 모든 브랜치들을 보고 싶을때 사용하는 명령

```git log --oneline -n5```
- 내 브랜치의 최신 커밋 5개만 보고 싶을때 사용

##### git blame
> note 특정 파일의 수정 이력을 확인할 수 있다. 각 라인별로 누가, 언제 마지막으로 수정 했는지 알 수 있다.

```git blame test.txt```
- test.txt 파일의 수정 이력을 확인

```git blame -L 5,10 test.txt```
- test.txt 파일의 5부터 10번 라인까지만 확인

```git blame -C newTest.txt```
- 파일명이 변경 되었다면, 변경전의 파일명과 함께 확인

```git blame -w test.txt```
- 공백 변경을 무시

```git gc``` 
- 저장소에 필요없는 파일을 삭제하고 남은 파일을 압축하는 “Garbage Collection” 명령이다. 직접 실행시켜도 되지만 Git이 자동으로 실행해준다.

```git fsck```
- Git 저장소의 오브젝트를 검사하여 손상된 파일이나 누락된 파일을 확인하는데 도움

-----------------------

#### 12-3. branch

```git branch```
- 현재 로컬 브랜치 목록 보기 

```git branch -r```
- 현재 원격 저장소 목록 보기 

```git checkout temp```
- 브랜치 이동  git checkout {새로운 로컬 Branch 이름}
- 권장 : `git switch temp`

```git checkout -b develop master```
- master을 기준으로 로컬에 새로운 브랜치를 생성합니다
- 권장 : `git switch -c develop main`

```git checkout -b  develop origin/develop```
- 브랜치 생성 및 체크아웃(이동)
원격 브런치가 이미 존재 할 경우 원격 브런치를 기준으로 로컬 브랜치를 만드는 방법 
checkout 명령에 -b 옵션을 넣으면 브랜치 작성과 체크아웃을 한꺼번에 실행 

 `git checkout -b {새로운 로컬 Branch 이름} {원격 저장소 별칭}/{원격 Branch 이름}`

- 권장 : `git switch develop` ( 같은 이름의 원격 브랜치가 있으면 자동으로 추적 브랜치를 만들어 이동 )


```git push origin develop```
- local 브랜치를 remote로 push하기

```git pull origin master```
- origin(원격)에서 가져오기

```git branch -m master mymaster```
- 브랜치이름 변경 git branch -m `[브랜치명] [새로운 브랜치명]`

```
git branch -d mybranch
git push origin -d mybranch
```

- mybranch 라는 브랜치 제거. 두번째 명령어는 삭제된 브렌치를 리모트 저장소에도 동기화 
> note : `git push origin -d mybranch` 삭제 명령 후에 git unable to delete remote ref does not exist 라는
> 메세지가 나온다면 remote 된 git 서버와의 최신 동기화가 이루어 지지 않아서 발생하는 문제이다.
> 깃허브나 비트버킷 사이트로 들어가서 정보를 조회해 보면 삭제된 것을 볼 수 있다. 
> 하지만 `git branch -r` 로 브랜치를 조회를 하면 삭제한 브랜치가 남아 있는 것을 볼 수 있을 것이다.
> 결론은 최신 동기화를 해주면 된다. `git fetch -p origin`  여기서 -p 옵션은 더 이상 존재하지 않는 remote 브랜치 정보는 삭제하는 것이다.

```git fetch -p origin```

- 서버와 최신 정보 동기화 시키고 삭제된 브랜치 내역 제거 


```
git branch -D mybranch
```
- `-D` 옵션은 강제 삭제를 의미한다. 만약 머지 중이거나 수정 중인 상태라면 error 를 띄울텐데 그래도 상관없이 지운다면 해당 옵션으로 지우면 된다.



-----------------------

#### 12-4 스테이징( 로컬 임시저장 ) 및 커밋 

```git add test.txt```
- test.txt  를 스테이지에 저장.

```git add . ```
- 폴더의 전체 변경 사항 지정 ( 현재 디렉토리의 모든 변경 내용을 스테이징 영역에 추가 )

```git add -A ```
- 폴더의 전체 변경 사항 지정 ( 작업 디렉토리 내의 모든 변경 내용을 몽땅 스테이징 영역에 추가 )

> note: 
> - `git add -A`는 작업 디렉토리 상에 어디에 위치하든 항상 동일하게 모든 변경 내용을 스테이징으로 넘긴다. 
> 반면에 `git add .`는 명령어를 실행한 디렉토리 이하에서 발생한 변경 내용만 포함하며, 
> 해당 디렉토리 기준으로 상위 디렉토리의 변경 내용을 포함하지 않는다. 
> 만약에 `git add .`를 프로젝트 최상위 디렉토리에서 실행한다면 `git add -A`와 동일한 효과를 낸다.

```git commit -m '기록할 메세지' ```
- 입력한 메세지와 함께 커밋 

```git commit -am '기록할 메세지' ```
- 스테이지와 커밋을 한번에 실행.

```git commit --amend```
- 이전 커밋에 변경사항을 추가할때 

``` git log```
- 커밋한 결과 확인 ( 주의 - 모든 목록이 나온다 )

```git show```
- 최근 커밋 확인( 주의 - 변경 내역까지 다 나옴 )

```git show --stat``` 
- 최근 커밋 요약해서 보기. ( 추천 )

```git log --graph```
- 에디터의 그래프 보듯 예쁘게 히스토리 보기.

--------------------------

#### 12-5 되돌리기.
코드를 작성하다보면 잘못된 코드를 추가하거나 merge한 경우 이를 취소할때,

a. git reset 으로 취소( 단 push 이전 상태이여야 함 )

```git reset```
-  add 한 파일 취소

```git reset --merge```
- merge 한 코드 취소

b.만약 commit만 취소하고, 작성한 코드는 남겨둘려면? reset --soft 명령어 사용

```git reset --soft HEAD^ ```
- commit 코드 되살리기

```git reset --hard HEAD^ ```
- commit 하기 이전 코드로 돌아가기


```git rebase <대상 브랜치>```
- 내 브랜치의 커밋들을 대상 브랜치에 재배치 ( 커밋 히스토리를 하나로 합치기에 주의 - 그룹 리더가 책임지고 해야함.)

 - git reset을 이용하여 작성한 코드를 초기화하고 서버로부터 다시 받아 오기.

```git revert <commit id>```
- commit을 유지하면서 내용을 Rollback하는 경우 ( 이미 push 하였을 경우 쓴다 )

```git restore <파일이름>```
- 로컬의 변경 내용을 되돌리기 ( 기존 `git checkout -- <파일이름>` 과 동일 )

```git stash```
- 이미 자신의 작업 내역이 있고 변경 내역을 불러와 계속 작업을 이어 나갈 경우

```git stash push -m "<저장할 목록 이름>"```
- 작업코드 임시저장하고 브랜치 바꾸기 ( `git stash save` 는 deprecated )
- `-u` 옵션을 붙이면 새로 추가한(untracked) 파일까지 저장한다.

```git stash pop```
- 마지막에 저장한 코드 불러오기.

```git stash apply```
- 가장 최근 저장한 stash 를 불러와 복원.

```git stash clear```
- 모든 stash 기록 제거.

```git stash list```
- stash로 저장한 목록 보기.

--------

.gitignore 에 제외할 파일 지정후 해당파일을 원격저장소 동기화하여 없애는 역활

```git rm -r --cached .```

```git add -A```

```git commit -m ‘기재할 내용’```

```git push```

> note 
> ```--cached``` 옵션은 git 저장소에만 파일을 지우고자 할때 적용
  ```-r``` 옵션은 재귀적 탐색 제거 허용

-------------
##### 단계별 취소 

**1. 로컬 변경 취소**

```git restore .```
- 기존 `git checkout .` 과 동일

>note 신규 추가한 파일에 관해서는 삭제되지 않으므로, 완전히 원래대로 되돌리려면 따로 삭제해야 한다.

```git clean -n ```
- git clean 으로 제거될 파일 미리보기

```git clean -f``` 
- 전체 untracked files 제거

```git clean -f <filename>```
- 한 개의 untracked files 제거

```git clean -d -f```
- 전체 untracked files 및 디렉터리까지 삭제


**2. add를 취소**

```git reset```
- 전체 파일 add 취소

```git restore --staged <filename>```
- 특정 파일의 add(스테이지) 취소 ( 기존 `git reset HEAD <filename>` 과 동일 )



**3. commit 취소**

```git reset HEAD^```
- 최근 commit 취소 ```git reset --mixed HEAD^``` 와 동일 

```git reset --soft HEAD^```
- commit 코드 되살리기( 코드는 살려두고 커밋 취소 )

```git reset --hard HEAD^```
- commit 하기 이전 코드로 돌아가기( 복구 불가 )

```git reset HEAD~2 ```
- 마지막 2개의 commit 을 취소


**4. push 취소**

```git revert <commit_Id>```
```git push origin <branch-name>```
이것은 undo한다는 느낌 보다, 변경 지점을 추가 commit 하는 것.


**5. merge 취소 방식** 

a. git 머지(병합) 했더니 충돌. 편집해서 수정하지 않을 경우 한정
 
```git merge --abort```
- 병합전의 상태로 되돌린다.

b. git 머지 후 충돌해서 수정하려고 시도했지만, 중간에 그만두고 싶을때! 편집한 내용도 머지(병합)도 모두 취소.

```git reset --hard HEAD```


c. 머지(병합) 모두 완료 후. 근데 역시 되돌리고 싶을때. 
revert 커맨드를 사용하여 Merge commit 을 취소.
```git revert <commit_Id>```


d. 머지(병합) 모두 완료 후 되돌리고 싶을때.( 추천하지 않음 - 이력이 남지 않는다. )
```git reset --hard ORIG_HEAD```
- 머지(병합)하기 전의 HEAD로 돌아갑니다. 이 방법은 한번 생긴 커밋을 취소하는 것. 이력이 남지 않는다.

e. reset, revert 후 저장소 강제 업데이트 
```git push --force-with-lease origin <브랜치이름>```
- `-f`( `--force` )는 다른 사람이 그 사이에 push 한 커밋까지 덮어쓴다. `--force-with-lease` 는 원격이 내가 마지막으로 받은 상태일 때만 덮어쓰므로 더 안전하다.
- `main` / `develop` 같은 공유 브랜치에는 강제 push 하지 않는다.


#### 12-7 동기화

```
git fetch origin
git reset --hard origin/master
```

- **로컬에 있는 모든 변경 내용과 확정본을 포기**. 원격 저장소의 최신 이력을 가져오고
 로컬 master브랜치의 상태를 가져온 최신이력으로 변경.


```git cherry-pick <commit id>```
- 다른 커밋 버전을 현재의 브렌치에 업데이트하기.

```git cherry-pick --continue```
- conflict 를 해결하고 `git add` 한 뒤 체리픽을 계속 진행한다.

```git cherry-pick -n <commit id>```
- 변경 내용만 가져오고 커밋은 하지 않는다.

```git cherry-pick --quit```
- 실패하는 경우 더 진행하지 않고 현재 상태를 빠져나온다.

```git cherry-pick --abort```
- 체리픽 이전 상태로 돌리고 취소한다.


#### 12-8 git 협업을 위한 flow.
1. 저장소와 자신의 로컬 연동. (git clone)
- 만약 최종 결정권자라면 원격 저장소생성하고 그 원격저장소와 로컬 연결. git remote
2. develop 브랜치를 가져와 자신의 브랜치 로컬 및 원격저장소에 생성. `git checkout -b develop origin/develop`
 ( 최종 결정권자는 develop 브랜치가 없다면 생성. )
3. develop 에서 분리된 자신작업 공간 브랜치 생성 그리고 아래와 같은 작업순으로 이루어진다.
- pull origin develop > add > commit > push 
4. 작업 완료 되면 pull request 요청 
5. 최종 결정권자는 오픈된 pull request 사항을 체크 후 develop 에 merge 혹은 decline 시킨다.
6. 최종 작업 마무리는  develop 의 모든 사항은 master 에 merge 

![./gitWorkFlow.jpg](./gitWorkFlow.jpg)


### 12-9 기타 주의 사항.
> note : package-lock.json 
> - package-lock.json 파일은 의존성 트리에 대한 정보를 가지고 있으며, 작성된 시점의 의존성 트리가 다시 생성될 수 있도록 보장해준다.
> - package-lock.json 파일은 저장소에 꼭 같이 커밋해야 한다.
> - package-lock.json 파일은 node_modules 없이 배포하는 경우 반드시 필요하다.
> - CI / 배포 환경에서는 `npm install` 대신 lock 파일 그대로 설치하는 `npm ci` 를 사용한다.

> note : `node_modules`, `dist`, `.env.local` 등은 `.gitignore` 에 추가하고 커밋하지 않는다.

### 12-10 커밋 메시지 규칙 ( Conventional Commits )
- 커밋 메시지를 `타입: 설명` 형태로 통일하면 이력을 읽기 쉽고, 변경 로그(CHANGELOG) 자동 생성에도 활용할 수 있다. [https://www.conventionalcommits.org/ko/](https://www.conventionalcommits.org/ko/v1.0.0/)

```
feat: 회원가입 폼 유효성 검사 추가
fix: 모바일 메뉴가 닫히지 않는 문제 수정
style: 버튼 여백 정리
docs: README 개발 환경 설정 내용 수정
refactor: 날짜 포맷 함수 분리
chore: vite 버전 업데이트
```

| 타입 | 설명 |
|------|------|
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷, 세미콜론 등 동작에 영향 없는 수정 |
| refactor | 동작 변경 없는 코드 구조 개선 |
| test | 테스트 추가 / 수정 |
| chore | 빌드 설정, 패키지 업데이트 등 기타 작업 |




-------

## 13. 기타 ( 오픈그래프 / 파비콘 / 아이콘 폰트 만들기 )

### 1. 오픈 그래프 
- 오픈그래프 프로토콜은 페이스북에서 처음 만들어졌으며, Dublin Core, link-rel canonical, Microformats, 그리고 RDFa로부터 영감을 받았다. 
오픈그래프는 어떤 HTML 문서의 메타정보를 쉽게 표시하기 위해서 메타정보에 해당하는 제목, 설명, 문서의 타입, 대표 URL 등 다양한 요소들에 대해서 사람들이 
통일해서 쓸 수 있도록 정의해놓은 프로토콜이며 페이스북에 의하여 기존의 다양한 메타 데이터 표기 방법을 참조하여 만들어졌다. 그 간편함으로 인하여 현재는 그 창시자인 페이스북은 물론이고, 네이버 블로그, 카카오톡 등에서도 널리 사용하고 있다.
미리보기를 통해 보는 제목, 설명, 이미지는 이렇게 HTML 문서의 head에 표기된 오픈그래프 프로토콜에 의해서 나타나고 있다. 그 구체적인 작동 원래는 아래와 같다.

1. 사용자가 링크를 입력창에 입력.
2. 페이스북, 네이버 블로그, 카카오톡은 입력창의 문자열이 "링크"라는 것을 파악한다. (흔히 말하는 정규표현식으로 해당 문자열이 링크라는 것을 알아낸다.)
3. 링크라는 것이 파악되면 페이스북, 네이버 블로그, 카카오톡의 크롤러는 미리 그 웹사이트를 방문해서 HTML head의 오픈그래프(Open Graph) 메타 데이터를 긁어온다.
4. 이중에서도 og:title, og:description, og:image 가 각각 제목, 설명, 이미지의 정보를 나타낸다.
5. 그리고 그 정보를 바탕으로 미리보기 화면을 생성해주게 된다.

아래는 예시 코드
```
<meta property="og:title" content="MINTIT UX">
<meta property="og:url" content="http://mintit.inition.kr/">
<meta property="og:description" content="Used Mobile Phone Upcycling Service Design">
<meta property="og:image" content="http://mintit.inition.kr/assets/images/mintit-sns2.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MINTIT UX">

<!-- X(트위터) 카드 : 미지정 시 og 값을 참고하지만 카드 형태는 지정해야 한다 -->
<meta name="twitter:card" content="summary_large_image">
```

> note : `og:url`, `og:image` 는 `https://` 로 시작하는 **절대 경로**로 작성한다. ( 상대 경로는 크롤러가 읽지 못한다 )

| Tag	           | Description              |
|:---------------|:-------------------------|
| og:url	        | 페이지의 표준 URL (데스크탑 URL)   |
| og:title	      | 콘텐츠 제목                   |                            
| og:description | 콘텐츠 설명. 미리보기에서 제목 아래에 표시 |
| og:image	      | 콘텐츠를 공유 시 표시되는 이미지의 URL  |
| og:site_name   | 웹 사이트의 이름 (주소 아님)        |

> note : 일반적인 og:image 권장 크기는 **1200x630 ( 1.91:1 )** 이다. ( 페이스북, X, 링크드인 등 대부분의 플랫폼 공통 )
> - 플랫폼마다 잘리는 영역이 다르므로 보여주고자 하는 아이콘 및 텍스트는 가로 세로 중앙정렬로 배치 되어야 한다.
> - 공유 미리보기 확인 : [Facebook 공유 디버거](https://developers.facebook.com/tools/debug/) / [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)

> note: 카카오 경우 아래와 같은 가이드로 진행됨( 디자인 가이드 )
 > - 스크랩 이미지의 권장 크기는 800px x 800px (*실제 컨텐츠 사이즈가 아니라 캔버스 사이즈)
 > - png 타입으로 15kb 내외
 > - 워드마크로 제작시 800px * 800px 이미지내 정중앙에 600px * 120px 크기의 이미지로 설정.
 > - 심볼로 만들때는 800px * 800px 이미지내 정중앙에 160px * 160px 크기의 이미지로 설정.


-----------------


### 2. 파비콘
- 파비콘은 웹페이지에 접속했을때, 상단 탭에 보여지는 아이콘을 일컫는다. 이 아이콘은 즐겨찾기에 웹페이지를 등록할때도 사용된다. 
웹사이트를 대표하는 로고(logo)의 개념과 비슷하며, 사이트의 성격을 드러내기도 한다.

- 예전처럼 사이즈별 png 를 여러 개 만들 필요 없이 아래 4가지면 대부분의 브라우저 / 기기를 지원한다.
- `shortcut` 은 비표준 값이므로 `rel="icon"` 만 사용한다.

```
<!-- 32x32 사이즈 .ico ( 구형 브라우저 / 루트 경로 favicon.ico 자동 요청 대응 ) -->
<link rel="icon" href="/favicon.ico" sizes="32x32">

<!-- svg 파비콘 ( 해상도 무관 / 미디어쿼리로 다크모드 대응 가능 ) -->
<link rel="icon" href="/icon.svg" type="image/svg+xml">

<!-- 180x180 사이즈 .png ( iOS 홈 화면 추가 ) -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- 안드로이드 홈 화면 / PWA 아이콘 ( manifest 안에 192x192, 512x512 png 지정 ) -->
<link rel="manifest" href="/manifest.webmanifest">
```

```
// manifest.webmanifest
{
  "name": "사이트 이름",
  "icons": [
    { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

------------------

### 3. 아이콘 폰트 만들기( svg icon font )

> note : 요즘은 아이콘 폰트보다 **SVG 를 직접 사용하는 방식**을 우선 권장한다.
> - 아이콘 폰트는 폰트 로딩 실패 시 깨진 글자(□)가 보이고, 스크린 리더가 의미 없는 문자를 읽는 등 접근성 문제가 있으며 여러 색을 쓸 수 없다.
> - 웹퍼블리싱 : **SVG 스프라이트** ( `<symbol>` 로 묶은 파일을 `<use href="sprite.svg#icon-search">` 로 사용 )
> - Vue / React : 아이콘 컴포넌트 라이브러리 사용 ( 예: [lucide](https://lucide.dev/) - `lucide-vue-next`, `lucide-react` / 사용한 아이콘만 번들에 포함됨 )
> - 장식용 아이콘은 `aria-hidden="true"`, 의미가 있는 아이콘은 `aria-label` 또는 숨김 텍스트를 함께 제공한다.

```
<!-- sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
</svg>

<!-- 사용 : fill / stroke 에 currentColor 를 쓰면 글자색(color)을 따라간다 -->
<button type="button" aria-label="검색">
  <svg class="icon" aria-hidden="true"><use href="/sprite.svg#icon-search"></use></svg>
</button>
```

- 기존 프로젝트 운영 등 아이콘 폰트가 꼭 필요한 경우 아래 icomoon 을 사용한다.

[https://icomoon.io/](https://icomoon.io/)

> note ( 무료 svg icon font )
> - [https://iconsvg.xyz/](https://iconsvg.xyz/)
> - [https://basicons.xyz/](https://basicons.xyz/)
> - [https://lucide.dev/](https://lucide.dev/)
> - [https://icons8.com/line-awesome?ref=toools](https://icons8.com/line-awesome?ref=toools)
> - [https://icons.theforgesmith.com/](https://icons.theforgesmith.com/)
> - [https://tabler-icons.io/](https://tabler-icons.io/)

1. 사이트 우측 상단에 IcoMoon App 버튼을 클릭

![1번](./docs/images/icomoon1.jpg)

----------


2. IcoMoon버튼을 눌러 아래와 같이 페이지가 이동되었다면  
그림처럼 좌측 상단 Import Icons 를 눌러 제작한 svg 파일을 임포트 하면 된다.  
( 만약 이미 아이콘 폰트를 발행한 적이 있으면서 환경 설정 json 파일을 가지고 있다면 svg 파일 대신 json 파일을 임포트 하면 된다. )  

![2번](./docs/images/icomoon2.jpg)


----------
 

3. svg파일을 올렸다면 아래 그림처럼 파일들이 보인다. 아이콘 폰트화 할 것들을 클릭해서 선택한다.   
그리고 맨 하단 3번째 Generate Font 버튼을 클릭하여 생성시킨다.

![3번](./docs/images/icomoon3.jpg)

----------
 

4. 아래 그림처럼 우측 하단에 Download 를 클릭하면 최종 생성된 아이콘 폰트 파일을 다운 받을 수 있다.  
생성된 아이콘 및 web에서 css에 적용할 수 있겠끔 코드가 적혀 있다. 코드 값은 사용자에 맞게 수정할 수 있다.   

![5번](./docs/images/icomoon5.jpg)


-------

5. 마지막으로 상단 우측에 프로젝트 네임이 보일 것이다.  <br/>   클릭해 보면 아래 그림처럼 프로젝트 리스트로 전환된다.  
우측 중단에 Download 클릭하면 프로젝트 설정한 환경 세팅  json 파일을 다운로드 받을 수 있다.  
그리고 다운로드 받는 위치를 잘 지정해야 한다.  svg 원본파일이 있는 폴더의 위치와 같은 경로로 지정해 주는 것이 가장 좋다.   
이 환경 설정 json 파일 잘 갖고 있어야지만 다시 세팅하게 되는 불필요한 작업을 방지할 수 있다.    
( json 파일 누락시 사이트에서 일일히 아이콘의 코드값을 입력해야 한다. )   

![4번](./docs/images/icomoon4.jpg)



---------------------


## 14. 프로젝트 초기 진행시 체크 사항 
- **font 종류** ( 폰트 종류는 2개를 넘지 않는게 좋다.) 

- **font 범위** ( 웹폰트 유무 체크 / 라이선스 체크 )
  - 웹폰트는 `woff2` 포맷을 사용하고, 한글 폰트는 용량이 크므로 서브셋 폰트 또는 가변(variable) 폰트를 검토한다. ( 예: Pretendard )
  - `font-display: swap` 으로 폰트 로딩 중에도 텍스트가 보이게 한다.

- 웹에선 **font-size 가 11px 이하**로 설정 되지 않게 해야 한다.
  - 사용자가 브라우저 글자 크기를 바꿀 수 있도록 font-size 는 `rem` 단위 사용을 권장한다.

- **웹접근성 체크**( 접근성 LEVEL 체크 - 수준 A(웹 접근성이 요구하는 최소한의 수준), 수준 AA ) 
  - 기준 지침 : 국제 표준 **WCAG 2.2** / 국내 **KWCAG 2.2** ( 한국형 웹 콘텐츠 접근성 지침 )
  - 키보드만으로 모든 기능 사용 가능 여부, 포커스 표시, 명도 대비( 텍스트 4.5:1 이상 ), 이미지 대체 텍스트 체크

- **반응형**( 태블릿까지 지원하는지 체크 ) / **적응형**( 태블릿까지 지원하는지 체크 ) 체크  - 모바일 버전까지 지원시 테스트 디바이스 체크 

- **크로스브라우징 체크** ( 크롬, 엣지, 사파리( iOS 포함 ), 파이어폭스, 삼성 인터넷 등 )
  - IE 는 지원 종료(2022)되었으므로 별도 계약이 없으면 지원 대상에서 제외한다.
  - 지원 범위는 `browserslist` 로 명시해서 빌드 도구( autoprefixer 등 )와 공유한다. ( 2-10 참고 )

- **성능 체크** ( Core Web Vitals )
  - **LCP** ( 가장 큰 콘텐츠 표시 시간, 2.5초 이하 ) / **INP** ( 입력 반응 속도, 200ms 이하 ) / **CLS** ( 레이아웃 밀림, 0.1 이하 )
  - 크롬 개발자도구 Lighthouse 또는 [PageSpeed Insights](https://pagespeed.web.dev/) 로 측정
  - 이미지는 `WebP` / `AVIF` 포맷 사용, `width` / `height` 속성 지정( CLS 방지 ), 첫 화면 밖 이미지는 `loading="lazy"` 적용

- **웹퍼블리싱 / SPA**( Single page application ) 둘 중 어느 타입의 프로젝트인지 체크 

- **라이브러리 및 프레임워크** 사용 체크 ( bootstrap, tailwindcss, jquery - 웹퍼블리싱만 하는 경우 / vue, react - spa 로 진행시 )

- **컴포넌트 단위의 라이브러리/플러그인 호환성 및 버전 체크**( date-picker, time-picker, calendar, rich text editor, chart 등)

- **max-width** / **min-width** 체크( 사이즈 수치값으로 1024 혹은 1280 로 작업. 그 결정하는 기준은 사이즈가 작은 랩탑까지도 지원해야 한다 했을 때 1024 을 선택 )

- 아이콘은 **SVG 스프라이트** 또는 **아이콘 컴포넌트**( Vue / React ) 방식을 우선 검토한다. ( 13. 기타의 3번 참고 ) 아이콘 폰트는 기존 프로젝트 운영 등 필요한 경우에만 제작 / png 이미지로 해야 하는 경우는 **image sprite 방식**으로 제작 ( 만약 수정이 잦아지거나 운영 맡게 된다면 해당 기법은 패스 )

- 간단하게 sprite image 제작 [image sprite 제작 바로가기](https://spritegen.website-performance.org/)



------------


## 15. vue3.x 정리

> 기준 버전 : vue 3.5 / vue-router 5 / pinia 4 / axios 1.x  
> vue2 는 2023년 12월 31일 지원 종료(EOL)되었으므로 신규 프로젝트는 vue3 + `<script setup>` + TypeScript 로 진행한다.

### 0. 프로젝트 생성

- vue-cli(webpack) 는 유지보수 모드이므로 공식 스캐폴딩 도구인 **create-vue(Vite 기반)** 를 사용한다.
- 생성 시 TypeScript, Vue Router, Pinia, ESLint, Prettier, Vitest 등을 선택해서 추가할 수 있다.

```
npm create vue@latest
```

- `new Vue()` 대신 `createApp()` 으로 앱 인스턴스를 생성한다. 플러그인은 전역(`Vue.use`)이 아닌 **앱 인스턴스 단위**로 등록한다.

```
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
```

**vue2 → vue3 주요 변경 사항**

| vue2 | vue3 |
|------|------|
| `new Vue({ el: '#app' })` | `createApp(App).mount('#app')` |
| `Vue.component()` 전역 등록 | `.vue` 파일(SFC) import 후 바로 사용 ( `<script setup>` ) |
| `Vue.prototype.$http` | `app.config.globalProperties.$http` ( 모듈 import 권장 ) |
| 이벤트 버스 `$on` / `$off` / `$once` | 제거됨 → props/emit, provide/inject, Pinia, mitt |
| 필터 `{{ msg \| upper }}` | 제거됨 → computed 또는 함수 호출 |
| `.native` 이벤트 수식어 | 제거됨 |
| `beforeDestroy` / `destroyed` | `onBeforeUnmount` / `onUnmounted` |
| `v-model` = `value` + `input` | `v-model` = `modelValue` + `update:modelValue` |
| 단일 루트 엘리먼트 필수 | 여러 루트 엘리먼트(Fragment) 허용 |
| Vuex | Pinia ( 공식 상태관리 ) |

### 1. 컴포넌트

- 컴포넌트는 SFC(`.vue`) 파일 단위로 작성하고 `<script setup lang="ts">` 를 사용한다.
- `<script setup>` 안에서 import 한 컴포넌트는 별도의 등록(`components: {}`) 없이 템플릿에서 바로 사용한다.
- 컴포넌트 파일명은 PascalCase 로 작성한다. ( ex. `MyComp.vue` )

```
<!-- MyComp.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}

onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <button type="button" @click="increment">{{ count }} / {{ double }}</button>
</template>
```

```
<!-- App.vue -->
<script setup lang="ts">
import MyComp from './components/MyComp.vue'
</script>

<template>
  <MyComp />
</template>
```

**상하위 컴포넌트 관계**

- 컴포넌트는 각각 고유한 유효범위를 갖고 있기 때문에 직접 다른 컴포넌트의 값을 참조할 수 없다. 따라서 뷰에서 정한 데이터 전달 방법을 따라야 한다.

**기본적인 데이터 전달 방법**

**1. 상위에서 > 하위로는 props** 로 값을 전달.

- `defineProps<Props>()` 처럼 제네릭으로 타입을 선언한다.
- vue 3.5 부터 props 를 구조 분해 할당으로 받을 수 있고, 기본값도 함께 지정할 수 있다. ( `withDefaults` 불필요 )

```
<!-- Child.vue -->
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  labels?: string[]
}

const { title, count = 0, labels = ['one', 'two'] } = defineProps<Props>()
</script>

<template>
  <p>{{ title }} - {{ count }}</p>
</template>
```

```
<Child :title="pageTitle" :count="total" />
```

> note : 구조 분해한 props 를 watch 할 때는 getter 로 감싸야 반응성이 유지된다.  
> `watch(() => count, ...)` - O / `watch(count, ...)` - X

> note : vue 3.3 부터 다른 파일에서 import 한 타입도 `defineProps<Props>()` 에 사용할 수 있다.  
> ( 단, 조건부 타입 등 컴파일러가 분석할 수 없는 복잡한 타입은 지원하지 않는다. )

- 구조 분해를 사용하지 않고 `props.xxx` 로 접근하는 경우에는 컴파일러 매크로 `withDefaults` 로 기본값을 지정한다.

```
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  labels: () => ['one', 'two']
})
```

**2. 하위에서 > 상위로는 emit** 으로 이벤트를 발생시켜 전달한다.

- vue 3.3 부터 `이벤트명: [인자 목록]` 형태의 간결한 타입 문법을 사용한다.

```
<!-- Child.vue -->
<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()

function select(id: number) {
  emit('change', id)
}
</script>
```

```
<Child @change="handleChange" />
```

**3. 양방향 바인딩( v-model )은 defineModel** ( vue 3.4 이상 )

- 컴포넌트의 `v-model` 은 `modelValue` 프로퍼티 + `update:modelValue` 이벤트로 동작한다.
- `defineModel()` 을 사용하면 props + emit 을 직접 선언하지 않아도 된다.

```
<!-- CustomInput.vue -->
<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="model" />
</template>
```

```
<CustomInput v-model="searchText" />
```

- **v-model 인자** : v-model 에 인자를 전달하여 이름을 지정할 수 있다. 여러 개의 v-model 도 가능하다.

```
<MyComponent v-model:title="bookTitle" v-model:content="bookContent" />
```

```
<!-- MyComponent.vue -->
<script setup lang="ts">
const title = defineModel<string>('title')
const content = defineModel<string>('content')
</script>

<template>
  <input type="text" v-model="title" />
  <textarea v-model="content"></textarea>
</template>
```

- **v-model 수정자** : `.trim`, `.number`, `.lazy` 같은 내장 수정자 외에 커스텀 수정자를 만들 수 있다.
- 구조 분해로 수정자 객체를 받고, `set` 옵션에서 값을 변환한다.

```
<MyComponent v-model.capitalize="myText" />
```

```
<script setup lang="ts">
const [model, modifiers] = defineModel<string, 'capitalize'>({
  set(value) {
    if (value && modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

**4. 관계 없는 컴포넌트 간 통신**

- vue3 에서는 `$on` / `$off` 가 제거되어 `new Vue()` 이벤트 버스를 사용할 수 없다.
- 우선순위 : **Pinia(공유 상태)** > **provide / inject(조상 → 자손)** > **mitt(이벤트 버스가 꼭 필요한 경우)**

**- provide / inject**

- 조상 컴포넌트에서 provide 한 값을 깊이에 상관없이 자손 컴포넌트에서 inject 할 수 있다.
- 타입 안전을 위해 Symbol 을 확장하는 제네릭 타입인 **InjectionKey** 로 키를 만들고, 여러 컴포넌트에서 가져올 수 있도록 별도 파일에 둔다.

```
// keys.ts
import type { InjectionKey, Ref } from 'vue'

export const themeKey = Symbol() as InjectionKey<Ref<string>>
```

```
// 조상 컴포넌트
import { provide, ref } from 'vue'
import { themeKey } from '@/keys'

const theme = ref('dark')
provide(themeKey, theme) // 다른 타입의 값을 제공하면 에러가 발생한다.

// 자손 컴포넌트
import { inject } from 'vue'
import { themeKey } from '@/keys'

const theme = inject(themeKey) // type: Ref<string> | undefined
```

- provider 가 런타임에 값을 제공한다는 보장이 없으므로 inject 결과에는 undefined 가 포함된다. 기본값을 전달하면 undefined 가 제거된다.
- 문자열 키를 사용하면 타입이 unknown 이 되므로 제네릭으로 명시한다.

```
const theme = inject(themeKey, ref('light')) // type: Ref<string>
const foo = inject<string>('foo', 'bar') // type: string
```

**- mitt ( 이벤트 버스 )**

```
npm install mitt
```

```
// eventBus.ts
import mitt from 'mitt'

type Events = {
  'user:selected': number
}

export const eventBus = mitt<Events>()
```

```
// 이벤트를 보내는 컴포넌트
import { eventBus } from '@/eventBus'

eventBus.emit('user:selected', 10)

// 이벤트를 받는 컴포넌트 - 언마운트 시 반드시 해제한다.
import { onMounted, onUnmounted } from 'vue'
import { eventBus } from '@/eventBus'

function handleSelected(id: number) {
  console.log(id)
}

onMounted(() => eventBus.on('user:selected', handleSelected))
onUnmounted(() => eventBus.off('user:selected', handleSelected))
```

---------

**클래스 / 스타일 바인딩**

- 템플릿 문법은 vue2 와 동일하고 `data` / `computed` 옵션 대신 `ref()` / `computed()` 를 사용한다.

**a.객체 구문**

**- 인라인 방식**

- active, text-danger 클래스가 적용되려면 true가 할당되면 된다.

```
<div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
```

```
const isActive = ref(true)
const hasError = ref(false)
```

**- 객체 대입 방식**

```
<div :class="classObject"></div>
```

```
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

**- 객체 (computed 리턴) 대입 방식**

```
<div :class="classObject"></div>
```

```
const isActive = ref(true)
const error = ref<{ type: string } | null>(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value?.type === 'fatal'
}))
```

**b.배열 구문**

- errorClass는 항상 적용되고 isActive 가 true 일 경우에만 active 적용.

```
<div :class="[{ active: isActive }, errorClass]"></div>
```

**c.스타일 바인딩**

```
<div :style="{ color: activeColor, fontSize: `${fontSize}px` }"></div>
```

- `<style scoped>` 안에서 `v-bind()` 로 스크립트의 상태값을 CSS 에 바로 연결할 수 있다.

```
<script setup lang="ts">
const themeColor = ref('#2f4dc9')
</script>

<style scoped>
.title {
  color: v-bind(themeColor);
}
</style>
```

### 2. 라우터 & HTTP

- 터미널에 아래와 같은 구문으로 라우터를 추가 ( vue3 는 vue-router 4 이상 사용. 최신은 5.x )

```
npm install vue-router
```

- `new VueRouter()` 대신 `createRouter()` 를 사용하고, `mode: 'history'` 대신 `history` 옵션에 히스토리 함수를 지정한다.
- 라우트 컴포넌트는 `() => import()` 로 지연 로딩(코드 분할)하는 것을 권장한다.

```
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    // 동적 세그먼트는 콜론으로 시작한다.
    { path: '/user/:id', name: 'user', component: () => import('@/views/UserView.vue') },
    // vue2 의 '*' 대신 정규식 파라미터로 404 를 처리한다.
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') }
  ]
})

export default router
```

| 히스토리 | 설명 |
|------|------|
| `createWebHistory()` | HTML5 history 모드 ( 서버에서 모든 경로를 index.html 로 연결하는 설정 필요 ) |
| `createWebHashHistory()` | `#` 해시 모드 ( 서버 설정 불필요 / GitHub Pages 등 정적 호스팅 ) |

동적 세그먼트는 콜론 : 으로 표시한다.

`<script setup>` 에서는 `this.$route` / `this.$router` 대신 **useRoute()** / **useRouter()** 를 사용한다.

```
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div>User {{ route.params.id }}</div>
</template>
```

동일한 라우트에 여러 동적 세그먼트를 가질 수 있으며, route.params 의 해당 필드에 매핑된다.

/user/:username -->/user/tom --> { username:'tom'}

route.params 외에도 route 객체는 **route.query** (URL에 쿼리가 있는 경우), route.hash 등의 유용한 정보를 제공한다.

동일한 컴포넌트에서 params 변경 사항에 반응하려면 watch 에 getter 를 전달한다.

```
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (newId, oldId) => {
    // 경로 변경에 반응하여...
  }
)
```

혹은 onBeforeRouteUpdate 가드를 사용 할 수 있다.

```
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate(async (to, from) => {
  // react to route changes...
})
```

### 라우터 가드

- vue-router 4 부터 가드는 **next() 를 호출하지 않고 값을 반환**하는 방식을 사용한다. ( vue-router 5 에서 `next` 는 deprecated )

```
router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

- 아래 beforeEnter 는 각 라우트에 해당하는 개별 라우트 가드이다.

```
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/foo',
      component: Home,
      beforeEnter: (to, from) => {
        // ...
        return true
      }
    }
  ]
})
```

네비게이션이 트리거될 때마다 가드가 작성 순서에 따라 호출된다.

가드는 비동기식(async)으로 실행 될 수 있으며 네비게이션은 모든 가드가 해결되기 전까지 **보류 중** 으로 진행된다.

가드 함수는 두 가지 전달인자를 받는다.

- **to**: 이동할 대상 라우트 객체
- **from**: 현재 라우트로 오기전 라우트 객체

가드의 반환 값에 따라 네비게이션이 결정된다.

- **반환 값 없음(undefined) 또는 true**: 네비게이션 **승인**.
- **false**: 현재 네비게이션을 중단. 브라우저 URL 이 변경되었다면 from 경로의 URL 로 재설정된다.
- **'/' 또는 { name: 'login' } (라우트 위치)**: 다른 위치로 리디렉션.
- **에러 throw**: 탐색이 중단되고 router.onError() 로 등록 된 콜백에 에러가 전달.

### axios

vue3 에서도 HTTP 통신은 axios 를 주로 사용한다. ( 브라우저 내장 `fetch` 를 사용해도 무방 ) 터미널에서 아래의 코드로 설치.

```
npm install axios
```

- `Vue.prototype.$http` 방식 대신 **axios 인스턴스를 모듈로 만들어 import** 해서 사용한다. ( 타입 추론, 테스트 모킹에 유리 )
- API 주소는 하드코딩하지 않고 `.env` 파일의 `VITE_` 접두어 환경 변수로 관리한다.

```
// .env
VITE_API_BASE_URL=https://api.example.com
```

```
// api/http.ts
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})
```

- 꼭 전역 속성이 필요하다면 `app.config.globalProperties` 를 사용한다.

```
app.config.globalProperties.$http = http
```

Request Method

**axios.request(config)**

**axios.get(url, config)**

**axios.delete(url, config)**

**axios.head(url, config)**

**axios.options(url, config)**

**axios.post(url, data, config)**

**axios.put(url, data, config)**

**axios.patch(url, data, config)**

기본 사용법 ( async / await + 응답 타입 지정 )

```
import { http } from '@/api/http'

interface User {
  id: number
  name: string
}

export async function fetchUser(id: number): Promise<User> {
  const { data } = await http.get<User>(`/user/${id}`)
  return data
}

// 쿼리 파라미터는 params 로 전달
const { data } = await http.get<User[]>('/user', {
  params: { ID: 12345 }
})
```

컴포넌트에서는 로딩 / 에러 상태를 함께 관리하는 composable 로 분리해서 사용한다.

```
// composables/useUser.ts
import { ref } from 'vue'
import { fetchUser } from '@/api/user'
import type { User } from '@/api/user'

export function useUser() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function load(id: number) {
    isLoading.value = true
    error.value = null
    try {
      user.value = await fetchUser(id)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, error, load }
}
```

#### 동시요청 수행

- `axios.all` / `axios.spread` 는 deprecated 이므로 `Promise.all` 을 사용한다.

```
const [account, permissions] = await Promise.all([
  http.get('/user/12345'),
  http.get('/user/12345/permissions')
])
```

#### 요청 취소

- `CancelToken` 은 deprecated 이므로 `AbortController` 를 사용한다.

```
const controller = new AbortController()

http.get('/user', { signal: controller.signal })

// 요청 취소 ( ex. 컴포넌트 언마운트 시 )
controller.abort()
```

#### axios API

```
// Send a POST request
http({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
```

#### interceptors

- 요청 또는 응답이 처리되거나 처리되기 전에 해당요청 또는 응답을 인터셉트 할 수 있다.

```
//요청에 대한 interceptor 추가
http.interceptors.request.use(
  (config) => {
    // ~ 요청 전에 무언가 보낼 코드 부분 ~ ( ex. 인증 토큰 헤더 추가 )
    return config
  },
  (error) => Promise.reject(error)
)

//응답에 대한 interceptor 추가
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // ~ 공통 에러 처리 ( ex. 401 이면 로그인 페이지로 이동 ) ~
    return Promise.reject(error)
  }
)
```

### 3. 뷰 템플릿

- 디렉티브

**1. v-bind**

```
<!-- 전체 문법 -->
<a v-bind:href="url"> ... </a>
<!-- 약어 -->
<a :href="url"> ... </a>
<!-- 속성명과 변수명이 같으면 값 생략 가능 (vue 3.4 이상) - :id="id" 와 동일 -->
<div :id></div>
<!-- 동적 속성명 -->
<a :[attributeName]="url"> ... </a>
```

- 객체를 전달하면 여러 속성을 한 번에 바인딩한다.

```
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

```
<div v-bind="objectOfAttrs"></div>
```

**2. v-on**

```
<!-- 전체 문법 -->
<a v-on:click="doSomething"> ... </a>
<!-- 약어 -->
<a @click="doSomething"> ... </a>
```

**3. v-for**

**v-for 디렉티브를 사용하여 배열을 기반으로 리스트 렌더링.**

**형식 - item in items**

**items 는 원본 데이터 배열**

**item 은 반복되는 배열 엘리먼트의 별칭.**

```
<script setup lang="ts">
import { ref } from 'vue'

const parentMessage = ref('Parent')
const items = ref([
  { id: 1, message: 'Foo' },
  { id: 2, message: 'Bar' }
])
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
  </ul>
</template>
```

키에 대한 두번째 전달 인자를 제공.

```
<div v-for="(value, key) in object" :key="key">
  {{ key }}: {{ value }}
</div>
```

**4. v-for에서 :key**

Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록
힌트를 제공하려면 각 항목에 고유한 key 속성을 제공. **(key 에 대한 이상적인 값은 각 항목의 고유한 ID. index 는 사용하지 않는다. )**

- vue3 에서는 `<template v-for>` 의 key 를 자식이 아닌 `<template>` **태그에** 지정한다.

```
<template v-for="item in items" :key="item.id">
  <dt>{{ item.title }}</dt>
  <dd>{{ item.desc }}</dd>
</template>
```

**5. v-if 와 v-for**

- vue3 에서는 **v-if 가 v-for 보다 우선순위가 높다.** ( vue2 와 반대 ) 같은 엘리먼트에 함께 사용하지 않는다.
- 목록 필터링은 computed 로 처리한다.

```
<!-- Bad -->
<li v-for="user in users" v-if="user.isActive" :key="user.id">{{ user.name }}</li>

<!-- Good -->
<li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
```

```
const activeUsers = computed(() => users.value.filter((user) => user.isActive))
```

**6. 템플릿 ref**

- vue 3.5 부터 `useTemplateRef()` 로 템플릿의 엘리먼트를 참조한다. ( 인자는 템플릿의 ref 속성값 )
- 컴포넌트가 마운트되기 전이나 v-if 로 언마운트된 경우 값이 null 이므로 옵셔널 체이닝(`?.`)으로 접근한다.

```
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('search-input')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="search-input" />
</template>
```

- **자식 컴포넌트 ref** : `<script setup>` 컴포넌트는 기본적으로 닫혀 있으므로, 부모에서 호출할 메서드는 `defineExpose()` 로 공개한다.

```
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)

function open() {
  isContentShown.value = true
}

defineExpose({ open })
</script>
```

- 자식 컴포넌트의 인스턴스 타입은 `typeof` 로 컴포넌트 타입을 가져온 뒤 `InstanceType` 유틸리티로 추출한다.

```
<!-- App.vue -->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyModal from './MyModal.vue'

const modal = useTemplateRef<InstanceType<typeof MyModal>>('modal')

function openModal() {
  modal.value?.open()
}
</script>

<template>
  <button type="button" @click="openModal">모달 열기</button>
  <MyModal ref="modal" />
</template>
```

- 데이터 바인딩

템플릿 문법 - {{ }}

### 4. 상태관리 Pinia

- vue3 공식 상태관리 라이브러리는 **Pinia** 이다. ( Vuex 는 유지보수 모드 )
- Vuex 와 달리 **mutations 가 없고**, 모듈 대신 **스토어를 여러 개** 정의한다. TypeScript 타입 추론이 기본 지원된다.

```
npm install pinia
```

**Vuex → Pinia 대응 관계**

| Vuex | Pinia ( setup store ) |
|------|------|
| state | `ref()` / `reactive()` |
| getters | `computed()` |
| mutations | 없음 ( action 또는 상태 직접 변경 ) |
| actions | 일반 함수 ( 동기 / 비동기 모두 가능 ) |
| modules | 스토어 파일 분리 ( `useUserStore`, `useCartStore` ... ) |

#### defineStore

- 첫번째 인자는 스토어 고유 id, 두번째 인자는 setup 함수(권장) 또는 옵션 객체이다.
- setup 함수에서 **return 한 값만** 스토어의 state / getters / actions 로 노출된다.

```
// stores/counter.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { http } from '@/api/http'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  async function fetchCount() {
    const { data } = await http.get<number>('/count')
    count.value = data
  }

  return { count, doubleCount, increment, fetchCount }
})
```

#### 컴포넌트에서 사용

- 스토어를 구조 분해하면 반응성을 잃기 때문에 state / getters 는 **storeToRefs()** 로 감싸서 꺼낸다.
- actions 는 함수이므로 스토어에서 바로 구조 분해해도 된다.

```
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <button type="button" @click="increment">{{ count }} / {{ doubleCount }}</button>
</template>
```

> note : Options API 를 유지하는 컴포넌트에서는 Vuex 처럼 mapState / mapActions 헬퍼도 사용할 수 있다.

### 5. 트랜지션

Vue 는 트랜지션 래퍼 컴포넌트(`<Transition>`)를 제공하므로 다음과 같은 상황에서 모든 엘리먼트 또는

컴포넌트에 대한 진입 / 진출 트랜지션을 추가 할 수 있다.

1. 조건부 렌더링 (v-if 사용)
2. 조건부 출력 (v-show 사용)
3. 동적 컴포넌트 ( `<component :is>` )
4. key 속성 변경

트랜지션 클래스 ( vue3 에서 **v-enter → v-enter-from**, **v-leave → v-leave-from** 으로 이름이 변경 )

진입 : v-enter-active(v-enter-from + v-enter-to )

진출 : v-leave-active(v-leave-from + v-leave-to )

- **v-enter-from**: enter 의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거.
- **v-enter-active**: enter 에 대한 활성 및 종료 상태. 엘리먼트가 삽입되기 전에 적용. 트랜지션 / 애니메이션이 완료되면 제거.
- **v-enter-to**: 진입 상태의 끝. 엘리먼트가 삽입된 후 한 프레임 뒤에 추가(동시에 v-enter-from 이 제거됨)되고, 트랜지션/애니메이션이 끝나면 제거.
- **v-leave-from** : leave 를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거
- **v-leave-active**: leave 에 대한 활성 및 종료 상태. 진출 트랜지션이 트리거되면 적용되고 트랜지션 / 애니메이션이 완료되면 제거.
- **v-leave-to**: 진출 상태의 끝. 진출 트랜지션이 트리거되고 한 프레임 뒤에 추가(동시에 v-leave-from 이 제거됨)되고, 트랜지션/애니메이션이 끝나면 제거.

여기서 v-접두어는 이름없이 `<Transition>` 을 사용할 때의 기본값이다.

예를 들어 `<Transition name="my-trans">` 을 사용하면 v-enter-from 클래스는 my-trans-enter-from 이 된다.

v-enter-active 와 v-leave-active 는 입/출력 트랜지션을 위한 다른 easing curve를 지정할 수있는 기능을 제공한다.

```
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button type="button" @click="show = !show">Toggle render</button>
  <Transition name="slide-fade">
    <p v-if="show">hello</p>
  </Transition>
</template>
```

```
/* 애니메이션 진입 및 진출은 다른 지속 시간 및 */
/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  transition: all .3s ease-out;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

- 리스트 항목의 추가 / 삭제 / 순서 변경 애니메이션은 `<TransitionGroup>` 을 사용한다.

### 6. TypeScript 타입 지정

> props / emits / defineModel / provide·inject / 템플릿 ref 의 타입 지정은 위 각 항목 참고.

**1. ref()에 타입 지정하기**

- 초기값에서 타입이 추론되며, 다른 타입을 허용하려면 제네릭 전달인자를 전달한다.

```
import { ref } from 'vue'

const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

- `Ref` 타입으로 직접 지정할 수도 있다.

```
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')
```

> note : 제네릭 타입을 지정하고 **초기값을 생략하면 결과 타입은 undefined** 를 포함하는 유니온 타입이 된다.

```
// 추론된 타입: Ref<number | undefined>
const n = ref<number>()
```

**2. reactive()에 타입 지정하기**

- 전달인자에서 타입을 암시적으로 추론한다.

```
import { reactive } from 'vue'

// 추론된 타입: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

- 명시적으로 지정할 때는 인터페이스를 사용한다.

```
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

> note : 중첩된 ref 언래핑을 처리하는 반환 타입이 제네릭 인자 타입과 다르기 때문에 reactive() 의 제네릭 전달인자는 사용하지 않는 것이 좋다.  
> `reactive<Book>({ title: 'Vue 3 Guide' })` - X

**3. computed()에 타입 지정하기**

- computed() 는 getter 의 반환 값을 기반으로 타입을 추론한다.

```
import { ref, computed } from 'vue'

const count = ref(0)

// 추론된 타입: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

- 제네릭 인자를 통해 명시적으로 타입을 지정할 수 있다.

```
const double = computed<number>(() => {
  // number 를 반환하지 않으면 타입 에러
  return count.value * 2
})
```

**4. 이벤트 핸들러에 타입 지정하기**

- 네이티브 DOM 이벤트는 `Event` 타입으로 받고, `event.target` 은 타입 단언으로 좁힌다.

```
<script setup lang="ts">
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

참고:

- [vue3 공식 가이드(한국어)](https://ko.vuejs.org/guide/introduction.html)
- [vue3 TypeScript 가이드(한국어)](https://ko.vuejs.org/guide/typescript/composition-api.html)
- [vue2 → vue3 마이그레이션 가이드](https://v3-migration.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [axios](https://axios-http.com/)
