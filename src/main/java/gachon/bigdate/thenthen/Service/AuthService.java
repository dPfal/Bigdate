package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.Repository.UserRepository;
import gachon.bigdate.thenthen.entity.User;
import gachon.bigdate.thenthen.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    @Value("${jwt.token.secret}")
    private String key;

    public ResponseEntity<String> join(String userId, String password, String userName,  String userMood) {
        //userName 중복 check
        try{
            userRepository.findByUserId(userId).ifPresent(user -> {
                throw new RuntimeException("이미 존재하는 아이디입니다.");
            });
            User user = User.builder()
                    .userId(userId).userPassword(encoder.encode(password)).userName(userName).userRole("USER").userMood(userMood).build();
            userRepository.save(user);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok().body(userName + "님 회원 가입 성공! (아이디는 "+userId+"입니다.)" );
    }

    public ResponseEntity<String> login(String userId, String password) throws Exception {
        // Id가 없을 경우, orElseThrow: 값을 바로 얻거나, 예외를 바로 던짐
        try {
            User selectedUser = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new Exception("로그인 정보를 확인해주세요. (Id 정보 없음)"));
            // Pw가 틀렸을 경우
            if (!encoder.matches(password, selectedUser.getUserPassword())) {
                new Exception("로그인 정보를 확인해주세요.(Pw 정보 없음)");
            }
            User user = userRepository.findByUserId(userId).get();
            // token 유효시간 : 30분
            //1000L*60*30
            return ResponseEntity.ok().body(JwtUtil.IssuanceToken(user.getId(),key,user.getUserRole(),1000L*60*30));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

}