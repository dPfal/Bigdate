package gachon.bigdate.thenthen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping("/comments")
    public ResponseEntity<String> userEx(Authentication authentication){
            return ResponseEntity.ok().body("id : "+ authentication.getName() + " \n댓글 등록 완료!");
    }

}
