package gachon.bigdate.thenthen.config;

import gachon.bigdate.thenthen.Service.AuthService;
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

    private final AuthService authService;
    private final String secretKey;

   
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // JWT 필터
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}",authorization);
        // doFilter : 다음 필터 또는 서블릿으로 요청을 전달하는 역할
        if(authorization == null || !authorization.startsWith("Bearer ")){ //JWT가 없을 경우!
            if(request.getRequestURI().startsWith("/admin")||request.getRequestURI().startsWith("/users")){
                log.error("authorization이 없습니다.");
                filterChain.doFilter(request,response);
                return;
            }
            else{
                System.out.println("검증 pass ");
            }
        } else{
            // header에서 token 추출!
            // ex. Bearer asdfasfd.asdagsasd.asdewe ~~
            String token = authorization.split(" ")[1];
            // Token expired check
            if(JwtUtil.isExpired(token,secretKey)){
                log.error("token이 만료되었습니다.");
                filterChain.doFilter(request,response);
                return;
            }
            // Token에서 Id 꺼내기.
            Long Id = JwtUtil.getUserId(token,secretKey);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken("" +
                    Id,null, List.of(new SimpleGrantedAuthority("USER")));
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
        //filterChain에 인증 도장을 찍어줌!
    }
}
