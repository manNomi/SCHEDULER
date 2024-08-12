# 스케줄러 

## 회사 내 팀원들의 스케줄을 부서별로 확인


# 동적인 플레이스홀더 예제

이 프로젝트는 HTML, CSS, JavaScript를 사용하여 동적인 플레이스홀더를 만드는 방법을 보여줍니다. 사용자 입력에 따라 플레이스홀더 텍스트가 이동하고 크기가 조절되는 애니메이션 효과를 제공합니다.

## 실시간 데모

다음 링크에서 실시간 데모를 확인할 수 있습니다:

[**동적인 플레이스홀더 데모**](https://codepen.io/xmeqsqdr-the-bold/pen/KKjvPLW)

## 프로젝트 구조

/project-root
│
├── index.html
├── style.css
└── script.js

css
코드 복사

## 작동 방식

### HTML

HTML 구조는 `div` 안에 플레이스홀더를 위한 `p` 태그와 사용자 입력을 위한 `input` 태그를 포함하고 있습니다.

```html
<div class="input-container">
    <p class="placeholder">Enter your text</p>
    <input type="text" id="dynamic-input">
</div>
```

CSS
CSS는 부모 요소에 relative 포지셔닝을, 자식 요소인 플레이스홀더에 absolute 포지셔닝을 적용합니다. .small 및 .active 클래스는 애니메이션 효과를 처리합니다.
```css
.input-container {
    position: relative;
    width: 300px;
}

.placeholder {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 16px;
    transition: font-size 0.3s, top 0.3s;
}

input:focus + .placeholder,
input:not(:placeholder-shown) + .placeholder {
    font-size: 12px;
    top: -20px;
}
```

JavaScript
JavaScript는 사용자 상호작용에 따라 필요한 클래스를 추가하거나 제거합니다 (예: 입력 필드에 텍스트가 있을 때 또는 포커스가 있을 때).
```javascript
document.getElementById('dynamic-input').addEventListener('change', function() {
    const placeholder = this.previousElementSibling;

    if (this.value !== '') {
        placeholder.classList.add('small', 'active');
    } else {
        placeholder.classList.remove('small', 'active');
    }
});
```


# JSP 코드 사용 예시 

## 커넥션 생성 및 연결

```java
Connection connection = null;

try {
  Class.forName("org.mariadb.jdbc.Driver");
  // 마리아 디비 자바 드라이버를 가져온다 
  connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
 마리아 디비 서버 주소와 이름 / 계정과 비밀번호로 접속한다 
} catch (Exception e) {
  e.printStackTrace();
}
```

---

```java
<%! 
public String tryJoin(Connection connection, User user ) {
    String error="false";
    try{
        String joinSQL = "INSERT INTO User (id, pw, name, phone, team_name , position , theme_color) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement stmt = connection.prepareStatement(joinSQL);
        stmt.setString(1, user.id);
        stmt.setString(2, user.pw);
        stmt.setString(3, user.name);
        stmt.setString(4, user.phone);
        stmt.setString(5, user.team);
        stmt.setString(6, user.userClass);
        stmt.setString(7, "ffcceb");
        stmt.executeUpdate();
    }
    catch(SQLException e){
        error=e.getMessage();
    }
    return error;
}
%>
```

총정리 코드 

위 와같이 선언식에 써두고 필요할때마다 꺼내서 썼음

### 임포트 문

```java
<%@ page import="java.sql.DriverManager" %>
```

- **`DriverManager` 클래스**
    - 데이터베이스 드라이버 관리
    - JDBC URL을 사용하여 데이터베이스 연결을 설정하는 메서드를 제공

```java
<%@ page import="java.sql.Connection" %>
```

- **`Connection` 클래스**
    - 데이터베이스 연결
    - 데이터베이스와 통신하고 SQL 명령을 실행하는 데 사용.

```java
<%@ page import="java.sql.PreparedStatement" %>
```

- **`PreparedStatement` 클래스**
    - 미리 컴파일된 SQL 문
    - SQL 문을 여러 번 효율적으로 실행 가능
    - SQL 인젝션 공격을 방지하는 데 도움

```java
<%@ page import="java.sql.SQLException" %>
```

- **`SQLException` 클래스**
    - 데이터베이스 액세스 오류 또는 기타 오류를 나타내는 예외를 처리
    - 데이터베이스 작업 중 발생하는 오류를 처리하는 데 사용

```java
<%@ page import="java.sql.ResultSet" %>
```

- **`ResultSet` 클래스**
    - 데이터베이스 쿼리의 결과
    - SQL 질의의 결과로 생성된 데이터를 읽고 처리하는 데 사용\
    - 읽기용


```java
HttpSession session = request.getSession();
// 기본은 true로 session을 가져오고 없으면 생성한다
HttpSession session = request.getSession(false);
// 세션이 있으면 가져오고 없으면 생성하지 않는다 
```

```java
String userIDX = (session_profile != null) ? (String) session_profile.getAttribute("idx") : null;
```

       → 세션이 null이 아니면 값을 가져온다 

→ 는 값이 ()값이 true면 앞 아니면 뒤를 반환  

### 로그아웃 기능

```java
HttpSession sessionLogout = request.getSession(false);
if (sessionLogout != null) {
    sessionLogout.invalidate(); // 세션 무효화
}
```

→ 세션 로그아웃 기능 

→ 세션을 가져오고 있으면 무효화 시킨다

### 쿠키 사용 코드

```java
function setCookie(userIDX) {
// 쿠키 가져오는 코드 
  var x = document.cookie;
  if (x != "") {
    var value = x.split("=")[1];
    if (value != userIDX) {
      //쿠키 설정 코드 
      document.cookie = "user=" + userIDX + "; max-age=36000";
    }
    // 1시간 = 3600
  }
}

```

import 모듈 

```java
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>
```

정규표현식 

→ pattern : 정규표현식 객체이다 

```java
public final Pattern regex_id = Pattern.compile("^[0-9]{6,20}$");
public final Pattern regex_pw = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$");
public final Pattern regex_phone = Pattern.compile("^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$");
public final Pattern regex_name = Pattern.compile("^[가-힣]{2,10}$");
```

→ 입력받은 값들을 정규표현식 검사를 해준다 

```java
public String validateAll() {
    if (!regex_id.matcher(id).matches()) {
        return "아이디 오류";
    }
    if (!regex_pw.matcher(pw).matches()) {
        return "비밀번호 오류";
    }
    if (!pw.equals(pw_check)) {
        return "비밀번호 확인 오류";
    }
    if (!regex_name.matcher(name).matches()) {
        return "이름 확인";
    }
    if (!regex_phone.matcher(phone).matches()) {
        return "전화번호 확인";
    }
    if (team == null || team.trim().isEmpty()) {
        return "부서 확인";
    }
    if (userClass == null || userClass.trim().isEmpty()) {
        return "직급 확인";
    }
    return "true";
}
```

JSP 에서 정규표현식을 다음과 같이 사용했다

```jsx
  var url =
    "../action/schDeleteAction.jsp?Time=" +
    setTime +
    "&Text=" +
    setText +
    "&day=" +
    dateText +
    "&watchState=" +
    watchState;
```

- 위와 같이 쿼리스트링 작성
- 첫 변수 앞에 ‘?’
- 그다음 변수 앞에는 &로 나눠 준다

```java
String Time = request.getParameter("Time");
```

- 위와 같은 방식으로 가져온다

쿼리스트링 변수는 항상 사용자에 의해 강제될 수 있음을 기억하고 예외처리 하자
