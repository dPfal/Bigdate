package gachon.bigdate.thenthen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class EncoderConfig {
    @Bean
    public BCryptPasswordEncoder encode(){
        return new BCryptPasswordEncoder();
        // 순환 참조 문제 -> security config와 다른 클래스로
    }
}
