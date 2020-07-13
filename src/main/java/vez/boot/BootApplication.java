package vez.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@SpringBootApplication
@RestController
@CrossOrigin
public class BootApplication {

	@Configuration
	@Order(SecurityProperties.BASIC_AUTH_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
					.httpBasic()
					.and()
					.authorizeRequests()
					.antMatchers("/index.html", "/", "/home", "/login").permitAll()
					.anyRequest().authenticated();
		}
	}

	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}

	@RequestMapping("/resource")
	public Map<String, Object> home() {
		return Map.of(
				"id", UUID.randomUUID().toString(),
				"content", "Hello World"
		);
	}

	public static void main(String[] args) {
		SpringApplication.run(BootApplication.class, args);
	}

}
