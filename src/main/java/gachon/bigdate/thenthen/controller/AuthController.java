package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @PostMapping("/join") // 회원가입
    public ResponseEntity<String> join(@RequestBody UserDTO userDTO){
        return authService.join(userDTO.getUserId(),userDTO.getPassword()
                        ,userDTO.getUserName(),userDTO.getUserMood());
    }

    @PostMapping("/login") // 로그인
    public ResponseEntity<Map> login(@RequestBody UserDTO userDTO) throws Exception {
        //로그인시 JWT 발급
        return authService.login(userDTO.getUserId(),userDTO.getPassword());
    }

    @GetMapping("/id") //Id 중복체크
    public ResponseEntity<?> idDuplicateCheck(@RequestParam("userId") String userId ){
        return authService.idDuplicateCheck(userId);
    }
}
