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

    @DeleteMapping("/{id}") // 현재 empty 계정만 삭제 가능
    public ResponseEntity<?> deleteUserByAdmin(@PathVariable("id") Long id) {
        String message = adminService.deleteUser(id);
        return ResponseEntity.ok().body(message);
    }
}
