package gachon.bigdate.thenthen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ThenThenApplication {
	public static void main(String[] args) {
		SpringApplication.run(ThenThenApplication.class, args
		);
	}

}
