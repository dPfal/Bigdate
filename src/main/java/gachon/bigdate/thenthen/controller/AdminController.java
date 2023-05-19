package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.CourseDTO;
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

    @GetMapping("/places")
    public ResponseEntity<?> getPlaceList(Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber(), 20, Sort.by(Sort.Direction.ASC, "placeId"));
        return ResponseEntity.ok().body(this.placeService.getPlaceList(pageable));
    }

    @GetMapping("/places/{hotspotId}")
    public ResponseEntity<?> getPlaceListByPlaceId(Pageable pageable,@PathVariable(required = false) int hotspotId){
        pageable = PageRequest.of(pageable.getPageNumber(), 20, Sort.by(Sort.Direction.ASC, "placeId"));
        return ResponseEntity.ok().body(this.placeService.getPlaceListByPlaceId(pageable, hotspotId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.adminService.deleteUser(id));
    }


    @PatchMapping("/places/{placeId}")
    public ResponseEntity<?> updatePlaceMood (@PathVariable("placeId") long id,@RequestParam String placeMood){
        return this.placeService.updatePlaceMood(id,placeMood);
    }

    @PatchMapping("/reviews")
    public ResponseEntity<?> blindReviewToggle(@RequestBody CourseDTO courseDTO){
        return this.courseService.blindReviewToggle(courseDTO);
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable("courseId") long courseId){
        return ResponseEntity.ok().body(this.courseService.deleteCourse(courseId));
    }

    @DeleteMapping("/comments")
    public ResponseEntity<?> deleteComment(@RequestBody CommentDTO commentDTO){
        return this.courseService.deleteComment(commentDTO);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> modifyUserRole(@PathVariable long id,@RequestParam String userRole){
        return this.adminService.modifyUserRole(id,userRole);
    }
}
