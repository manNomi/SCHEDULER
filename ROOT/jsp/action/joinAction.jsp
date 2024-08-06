<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.*, java.util.*" %>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>

<%! 
  public class User {
        String id;
        String pw;
        String pw_check;
        String name;    
        String phone;
        String team;
        String userClass;
        String themeColor;
        public final Pattern regex_id = Pattern.compile("^[0-9]{6,20}$");
        public final Pattern regex_pw = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$");
        public final Pattern regex_phone = Pattern.compile("^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$");
        public final Pattern regex_name = Pattern.compile("^[가-힣]{2,10}$");
        public User(HttpServletRequest request) {
            this.id = request.getParameter("id");
            this.pw = request.getParameter("pw");
            this.pw_check = request.getParameter("pw-check");
            this.name = request.getParameter("name");    
            this.phone = request.getParameter("phone");
            this.team = request.getParameter("team");
            this.userClass = request.getParameter("position");
        }
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
    }
%>

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

<%
    request.setCharacterEncoding("utf-8");
    User user = new User(request);
    String regexText = user.validateAll();
    if (!regexText.equals("true")){
        out.println("<script>alert('" + regexText + " 오류'); history.back();</script>");
    }
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String joinError=tryJoin(connection,user);
%>

<script>
    var errorMessage="<%=joinError%>"
    if (errorMessage=="false"){
        alert("회원가입 성공")
        location.href="../page/index.jsp"
    }
    else{
        var text =errorMessage.split("key")[1].trim()
        alert(text+`가 중복입니다`)
        window.history.back()
    }
</script>