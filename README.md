# 스케줄러 

#### 목적 : 회사 내 팀원들의 스케줄을 부서별로 확인

## 사용한 기술스택 모음 

## JSP 코드 사용 예시 

### 커넥션 생성 및 연결

![리드미](/ROOT/readme/content.gif)
![리드미](/ROOT/readme/figma.gif)



# 로그인 페이지

| 페이지 & 컴포넌트 | 요소       | 요소 기능          | 기능상세                                                                                             | 제약조건                                        |
|--------------------|------------|---------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 로그인 페이지     | 입력       | 아이디 영역         | 로그인 아이디 입력                                                                                   | 숫자로 구성 (사원번호) 6~20글자                  |
|                    | 입력       | 비밀번호 영역       | 로그인 비밀번호 입력                                                                               | 6~20글자 영어 + 숫자 -> 최소 한개씩 포함       |
|                    | 버튼       | 로그인 버튼        | 로그인 성공시 -> 스케줄 페이지로 이동 / 로그인 실패시 -> 실패 알림 출력                           | 계정이 존재하지 않습니다                        |
|                    | 버튼       | 회원가입 버튼      | 회원가입 페이지로 이동                                                                            |                                                 |
|                    | 버튼       | 아이디, 비밀번호 찾기 버튼 | 아이디, 비밀번호 찾기 페이지로 이동                                                               |                                                 |
|                    | 버튼       | 회사 로고           | 모든 세션 초기화 하고 로그인 페이지로 이동                                                        |                                                 |

# 회원가입 페이지

| 페이지 & 컴포넌트 | 요소                  | 요소 기능                 | 기능상세                                                                                             | 제약조건                                        |
|--------------------|-----------------------|----------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 회원가입 페이지   | 버튼                  | 아이디 입력 탭            | 아이디 입력 탭 생성                                                                                |                                                 |
|                    | 버튼                  | 개인정보 입력 탭          | 개인정보 입력 탭 생성                                                                              |                                                 |
|                    | 버튼                  | 부서 입력 탭              | 부서 입력 탭으로 생성                                                                              |                                                 |
|                    | 버튼                  | 아이디 탭 이동 버튼        | 아이디 탭 -> 개인정보 탭으로 이동, 성공시 -> 다음탭 이동, 실패시 -> 제약조건 안맞는 부분 출력    |                                                 |
|                    | 버튼                  | 개인정보 탭 이동 버튼      | 개인정보 탭 -> 프로필 탭으로 이동, 성공시 -> 다음탭 이동, 실패시 -> 제약조건 안맞는 부분 출력  |                                                 |
|                    | 버튼                  | 프로필 탭 이동 버튼        | 클릭시 -> 회원가입 요청 (백엔드 통신), 성공시 -> 로그인 페이지로 이동, 실패시 -> 제약조건 안맞는 부분 출력 | id가 올바르지 않습니다, pw가 올바르지 않습니다, pw-check가 올바르지 않습니다, name이 올바르지 않습니다, phone이 올바르지 않습니다, 부서가 올바르지 않습니다 |
|                    | 아이디 입력 탭       | 아이디 입력 영역           | 아이디 입력 영역                                                                                     | 숫자로 구성 (사원번호) 6~20글자                  |
|                    |                       | 비밀번호 입력영역          | 회원가입 할 비밀번호 입력 영역                                                                     | 6~20글자 영어 + 숫자                           |
|                    |                       | 비밀번호 확인 입력영역     | 회원가입 할 비밀번호 확인 입력 영역                                                               | 6~20글자 영어 + 숫자                           |
|                    | 개인정보 입력 탭     | 이름 입력 영역             | 이름 입력 영역                                                                                     | 2~10글자 이내                                    |
|                    |                       | 전화번호 입력 영역        | 전화번호 입력 영역                                                                               | "-" 없이 010포함 11자                           |
|                    | 프로필 입력 탭       | 부서 입력 영역             | 부서 입력                                                                                           | 1개 선택                                        |
|                    |                       | 팀장 - 팀원 선택 버튼      | 들어오자마자 팀원에 선택이 되어있도록 한다                                                         | 1개 선택                                        |
|                    | 버튼                  | 닫기 버튼                  | 로그인 페이지로 새로고침                                                                           |                                                 |
|                    | 버튼                  | 이동 버튼                  | 로그인 페이지로 동적 이동                                                                         |                                                 |

# 아이디 비밀번호 찾기 페이지

| 페이지 & 컴포넌트        | 요소                | 요소 기능                  | 기능상세                                                                                             | 제약조건                                        |
|---------------------------|---------------------|-----------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 아이디 비밀번호 찾기 페이지 | 버튼                | 비밀번호 찾기 탭 버튼        | 비밀번호 찾기 탭 출력                                                                             |                                                 |
|                           | 버튼                | 아이디 탭 버튼              | 아이디 찾기 탭 출력                                                                               |                                                 |
|                           | 아이디 탭           | 아이디 찾기 버튼            | 클릭시 아이디 찾기 요청 (백엔드 통신), 성공시 -> 아이디 출력, 실패시 -> 실패 메시지 출력         | 존재하지 않는 계정입니다                        |
|                           |                     | 전화번호 입력 영역          | "- "없이 010포함 11자                                                                             |                                                 |
|                           | 비밀번호 탭         | 비밀번호 찾기 버튼          | 클릭시 비밀번호 찾기 요청 (백엔드 통신), 성공시 -> 비밀번호 출력, 실패시 -> 실패 메시지 출력     | 존재하지 않는 계정입니다                        |
|                           |                     | 아이디 입력 영역            | 비밀번호를 찾기 위한 아이디 입력 공간                                                               | 숫자로 구성 (사원번호) 6~20글자                  |
|                           |                     | 전화번호 입력영역          | 비밀번호를 찾기 위한 전화번호 입력 공간                                                           | "-" 없이 010포함 11자                           |
|                           | 버튼                | 닫기버튼                    | 로그인 페이지로 새로고침                                                                           |                                                 |
|                           | 버튼                | 이동 버튼                  | 로그인 페이지로 동적 이동                                                                         |                                                 |

# 설명 MODAL

| 페이지 & 컴포넌트 | 요소       | 요소 기능      | 기능상세                                   | 제약조건 |
|--------------------|------------|-----------------|--------------------------------------------|----------|
| 설명 MODAL         | 버튼       | 닫기 버튼      | MODAL 창 닫기                              |          |
|                    | MODAL       | 설명           | 첫 로그인시 모달창을 띄운다                |          |

# 스케줄 페이지

| 페이지 & 컴포넌트 | 요소              | 요소 기능                  | 기능상세                                                                                             | 제약조건 |
|--------------------|-------------------|-----------------------------|------------------------------------------------------------------------------------------------------|----------|
| 스케줄 페이지     | 버튼              | 닫기버튼                    | 로그아웃 후 시작페이지로 이동한다                                                                  |          |
|                    | 버튼              | 카테고리 버튼              | 목록 MODAL 출력상태일 경우 -> MODAL 삭제, 미출력 상태일 경우 -> MODAL 생성                         |          |
|                    | 버튼              | 달력 키우기 버튼            | 현재화면 최소화일 경우 -> 달력 크기 최대화, 현재화면 최대화일 경우 -> 달력 크기 최소화             |          |
|                    | 출력              | 달력 1달 영역              | 달력 요일 및 월 출력                                                                               |          |
|                    | 버튼              | 달력 1일 영역              | 클릭시 스케줄 상세 페이지 생성                                                                     |          |
|                    | 버튼              | 달 선택 버튼               | 그날의 일정 총 갯수를 출력, 클릭시 년도와 달을 바꿀 수 있는 버튼을 출력                          |          |

# 목록 버튼 MODAL

| 페이지 & 컴포넌트 | 요소                | 요소 기능                    | 기능상세                                                                                             | 제약조건 |
|--------------------|---------------------|-------------------------------|------------------------------------------------------------------------------------------------------|----------|
| 목록 버튼 MODAL    | 버튼                | 전체보기 버튼                | 팀장의 경우에만 출력, 클릭시 부서 전체의 스케줄을 출력                                               |          |
|                    | 버튼                | 프로필 확인 버튼            | 프로필 페이지로 이동                                                                               |          |
|                    | 버튼                | 테마색 설정 버튼            | 테마 색상을 설정 할 수 있는 테마 MODAL 출력                                                         |          |
|                    | 영역                | MODAL 외 영역                | 클릭시 모달창 닫기                                                                                   |          |

# 테마색 MODAL

| 페이지 & 컴포넌트 | 요소                | 요소 기능                 | 기능상세                                                                                             | 제약조건 |
|--------------------|---------------------|----------------------------|------------------------------------------------------------------------------------------------------|----------|
| 테마색 MODAL       | 입력                | 색상코드 입력영역          | 색상코드 입력 공간                                                                                   | 숫자, 영어 6자      |
|                    | 버튼                | 확인 버튼                  | 입력된 테마색으로 테마 변경                                                                         |          |
|                    | 버튼                | 닫기 버튼                  | MODAL 닫기                                                                                           |          |

# 스케줄 상세 MODAL

| 페이지 & 컴포넌트 | 요소                  | 요소 기능                | 기능상세                                                                                             | 제약조건 |
|--------------------|-----------------------|---------------------------|------------------------------------------------------------------------------------------------------|----------|
| 스케줄 상세 MODAL  | 버튼                  | 뒤로가기 버튼            | 클릭시 스케줄 상세 MODAL 닫기                                                                       |          |
|                    | 버튼                  | 스케줄 추가 버튼         | 클릭시 스케줄을 추가한다                                                                           |          |
|                    | 스케줄 입력 영역     | 스케줄 입력 영역         | 스케줄을 입력 할 수 있는 영역                                                                     |          |
|                    | 스케줄 입력 시간 영역 | 스케줄 시간을 입력 할 수 있는 영역 | 스케줄 시간을 입력 할 수 있는 영역                                                                 |          |
|                    | 출력                  | 스케줄 영역              | 스케줄 한줄 출력



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

## 세션 사용 

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

## 쿠키 사용 코드

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

##정규표현식 
import 모듈 

```java
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>
```
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


### 동적인 플레이스홀더 예제

[**동적인 플레이스홀더 데모**](https://codepen.io/xmeqsqdr-the-bold/pen/KKjvPLW)

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
