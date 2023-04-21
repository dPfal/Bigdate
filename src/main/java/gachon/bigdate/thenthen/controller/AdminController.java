package gachon.bigdate.thenthen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/")
    public ResponseEntity<String> adminTest(Authentication authentication){
        System.out.println(authentication);
        return ResponseEntity.ok().body("ok");
    }
}
