package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserDTO userDTO){
        return authService.join(userDTO.getUserId(),userDTO.getPassword()
                        ,userDTO.getUserName(),"USER",userDTO.getUserMood());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) throws Exception {
        return authService.login(userDTO.getUserId(),userDTO.getPassword());
    }
}
