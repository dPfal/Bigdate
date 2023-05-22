package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.repository.UserLogRepository;
import gachon.bigdate.thenthen.repository.UserRepository;
import gachon.bigdate.thenthen.entity.User;
import gachon.bigdate.thenthen.entity.UserLog;
import gachon.bigdate.thenthen.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final UserLogRepository userLogRepository;
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
            userLogRepository.save(UserLog.builder().id(userRepository.findByUserId(userId).get().getId()).joinDate(LocalDateTime.now()).withDrawDate(null).build());

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok().body(userName + "님 회원 가입 성공! (아이디는 "+userId+"입니다.)" );
    }

    public ResponseEntity<Map> login(String userId, String password) throws Exception {
        Map<String, String> messages = new HashMap<>();
        // Id가 없을 경우, orElseThrow: 값을 바로 얻거나, 예외를 바로 던짐
        try {
            User selectedUser = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new Exception("로그인 정보를 확인해주세요. (Id 정보 없음)"));
            System.out.println(selectedUser);
            System.out.println(encoder.matches(password, selectedUser.getUserPassword()));
            // Pw가 틀렸을 경우
            if (!encoder.matches(password, selectedUser.getUserPassword())) {
                throw new Exception("로그인 정보를 확인해주세요.(Pw 정보 없음)");
            }
            User user = userRepository.findByUserId(userId).get();
            // token 유효시간 : 30분
            //1000L*60*30
            messages.put("JWT", JwtUtil.IssuanceToken(user.getId(),key,user.getUserRole(),1000L*60*30));
            messages.put("userRole", user.getUserRole());
            messages.put("userId", user.getUserId());
            messages.put("Id", String.valueOf(user.getId()));
            return ResponseEntity.ok().body(messages);
        } catch (Exception e) {
            messages.put("message",e.getMessage());
            System.out.println(messages);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messages);
        }

    }

    public ResponseEntity<?> idDuplicateCheck(String userId) {
        if(this.userRepository.findByUserId(userId).isEmpty()){
          return ResponseEntity.ok().body("true");
        }else{
            return  ResponseEntity.ok().body("false");
        }
    }
}