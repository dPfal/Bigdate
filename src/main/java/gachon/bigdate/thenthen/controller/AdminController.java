package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.service.AdminService;
import gachon.bigdate.thenthen.service.CourseService;
import gachon.bigdate.thenthen.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final CourseService courseService;
    private final PlaceService placeService;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserByAdmin(@PathVariable("id") Long id) {
        String message = adminService.deleteUser(id);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/places/{hotspotId}")
    public ResponseEntity<?> getPlaceListByPlaceId(Pageable pageable, @PathVariable(required = false) int hotspotId){
        pageable = PageRequest.of(pageable.getPageNumber(), 20, Sort.by(Sort.Direction.ASC, "placeId"));
        return ResponseEntity.ok().body(this.placeService.getPlaceListByPlaceId(pageable, hotspotId));
    }
}
