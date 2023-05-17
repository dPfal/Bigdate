package gachon.bigdate.thenthen.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import gachon.bigdate.thenthen.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // JWT 필터
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}", authorization);
        // doFilter : 다음 필터 또는 서블릿으로 요청을 전달하는 역할
        if (request.getRequestURI().startsWith("/api/admin") || request.getRequestURI().startsWith("/api/users")) {
            if (authorization != null && authorization.startsWith("Bearer ")) { //JWT가 있을 경우!
                // header에서 토큰 추출!
                // ex. Bearer asdfasfd.asdagsasd.asdewe ~~
                String token = authorization.split(" ")[1];
                // 토큰 만료 여부 확인
                if (JwtUtil.isExpired(token, secretKey)) {
                    sendJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "JWT가 만료되었습니다");
                } else {
                    if (request.getRequestURI().startsWith("/api/admin")
                            && JwtUtil.getUserRoleFromToken(token, secretKey).equals("USER")) {
                        log.warn("권한이 없습니다");
                        sendJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "권한이 없습니다");
                    }
                    // 토큰에서 ID 추출
                    Long id = JwtUtil.getUserIdFromToken(token, secretKey);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken("" + id, null, Collections.singletonList(new SimpleGrantedAuthority(JwtUtil.getUserRoleFromToken(token, secretKey))));

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    filterChain.doFilter(request, response);
                }

            } else {
                sendJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "JWT가 없습니다.");
            }
        } else {
            filterChain.doFilter(request, response);
        }
        // 인증을 FilterChain에 등록
    }

    private void sendJsonErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(status);

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", status);
        errorResponse.put("message", message);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(errorResponse);

        response.getWriter().write(json);
        response.getWriter().flush();
    }
}
