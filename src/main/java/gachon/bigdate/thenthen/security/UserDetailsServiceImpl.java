package gachon.bigdate.thenthen.security;

import gachon.bigdate.thenthen.Repository.UserRepository;
import gachon.bigdate.thenthen.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserId(userId);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userId));
        return user.map(MyUserDetails::new).get();
    }
}
