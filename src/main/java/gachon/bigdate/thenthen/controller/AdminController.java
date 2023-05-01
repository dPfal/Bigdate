package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.Service.AdminService;
import gachon.bigdate.thenthen.Service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final CourseService courseService;
    @GetMapping("/")
    public ResponseEntity<String> adminTest(Authentication authentication){
        System.out.println(authentication);
        return ResponseEntity.ok().body("admin 인증 완료");
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMemberList(){
        return ResponseEntity.ok().body(this.adminService.getMemberList());
    }

    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO, Authentication authentication){
        commentDTO.setId(Long.valueOf(authentication.getName()));
        return ResponseEntity.ok().body(this.courseService.createComment(commentDTO));
    }
}
