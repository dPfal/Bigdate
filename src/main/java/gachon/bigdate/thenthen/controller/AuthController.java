package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserDTO userDTO){
        return authService.join(userDTO.getUserId(),userDTO.getPassword()
                        ,userDTO.getUserName(),userDTO.getUserMood());
    }

    @PostMapping("/login")
    public ResponseEntity<Map> login(@RequestBody UserDTO userDTO) throws Exception {
        //로그인시 JWT 발급
        return authService.login(userDTO.getUserId(),userDTO.getPassword());
    }
}
