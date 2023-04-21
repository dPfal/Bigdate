package gachon.bigdate.thenthen.security;

import gachon.bigdate.thenthen.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // JWT 필터
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}", authorization);
        // doFilter : 다음 필터 또는 서블릿으로 요청을 전달하는 역할
        if (request.getRequestURI().startsWith("/admin") || request.getRequestURI().startsWith("/users")) {
            if (authorization != null && authorization.startsWith("Bearer ")) { //JWT가 있을 경우!
                // header에서 token 추출!
                // ex. Bearer asdfasfd.asdagsasd.asdewe ~~
                String token = authorization.split(" ")[1];
                // Token expired check
                if (JwtUtil.isExpired(token, secretKey)) {
                    System.out.println("JWT가 만료되었습니다.");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT가 만료되었습니다.");
                }
                // Token에서 Id 꺼내기.
                Long Id = JwtUtil.getUserIdFromToken(token, secretKey);
                if (request.getRequestURI().startsWith("/admin")) {
                    if (JwtUtil.getUserRoleFromToken(token, secretKey).equals("USER")) {
                        System.out.println("권한이 없습니다");
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "권한이 없습니다");
                    }
                }
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken("" + Id, null, List.of(new SimpleGrantedAuthority(JwtUtil.getUserRoleFromToken(token, secretKey))));

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }else{
                System.out.println("JWT가 만료되었습니다.");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT가 없습니다.");
                return;
            }
        }

        filterChain.doFilter(request, response);
        //filterChain에 인증 도장을 찍어줌!
    }


}
