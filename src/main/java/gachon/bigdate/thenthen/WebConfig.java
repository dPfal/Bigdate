package gachon.bigdate.thenthen;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 스프링 서버 전역적으로 CORS 설정
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080","http://localhost:3000") // 허용할 출처
                .allowedMethods("GET", "POST","DELETE","PUT") // 허용할 HTTP method
                .allowCredentials(true) ;// 쿠키 인증 요청 허용
    }
}