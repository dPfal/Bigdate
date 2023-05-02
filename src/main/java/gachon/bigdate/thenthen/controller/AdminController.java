package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.service.AdminService;
import gachon.bigdate.thenthen.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final CourseService courseService;
    @GetMapping("/members")
    public ResponseEntity<?> getMemberList(){
        return ResponseEntity.ok().body(this.adminService.getMemberList());
    }

    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO, Authentication authentication){
        commentDTO.setId(Long.valueOf(authentication.getName()));
        return ResponseEntity.ok().body(this.courseService.createComment(commentDTO));
    }

    @GetMapping("/")
    public ResponseEntity<?> adminMain(){
        return ResponseEntity.ok().body(this.adminService.getAdminMain());
    }
}
