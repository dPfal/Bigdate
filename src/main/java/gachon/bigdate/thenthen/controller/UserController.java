package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Service.CourseService;
import gachon.bigdate.thenthen.Service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final PlaceService placeService;
    private final CourseService courseService;

    @GetMapping("/")
    public ResponseEntity<String> test(Authentication authentication){
        return ResponseEntity.ok().body("user 인증 완료");
    }

    @GetMapping("/places")
    public ResponseEntity<?> getPlaceByName(@RequestParam("searchData") String searchData){
        List<PlaceDTO> searchResult;
        if((searchResult = this.placeService.getPlaceByPlaceName(searchData)) != null){
            return ResponseEntity.ok().body(searchResult);
        }else{
            return ResponseEntity.ok().body("검색 결과가 없습니다.");
        }
    }

    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody CourseDTO courseDTO, Authentication authentication){
        courseDTO.setId(Long.parseLong(authentication.getName()));
        System.out.println("user Id is "+courseDTO.getId());
        return ResponseEntity.ok().body(this.courseService.createCourse(courseDTO));
    }

    @PostMapping("/likes")
    public ResponseEntity<?> toggleLike(@RequestParam("courseId") long courseId, Authentication authentication){
        return ResponseEntity.ok().body(this.courseService.toggleLike(courseId, Long.parseLong(authentication.getName())));
    }

    @PostMapping("/scraps")
    public ResponseEntity<?> toggleScrap(@RequestParam("courseId") long courseId, Authentication authentication){
        return ResponseEntity.ok().body(this.courseService.toggleScrap(courseId, Long.parseLong(authentication.getName())));
    }

    @GetMapping("/scraps")
    public ResponseEntity<ArrayList<CourseDTO>> getScrapsList(Authentication authentication){
        return ResponseEntity.ok().body(this.courseService.getScrapList(Long.parseLong(authentication.getName())));
    }

    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO, Authentication authentication){
        System.out.println(commentDTO);
        commentDTO.setId(Long.valueOf(authentication.getName()));
        return ResponseEntity.ok().body(this.courseService.createComment(commentDTO));
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable("courseId") Long courseId){
        return ResponseEntity.ok().body(this.courseService.deleteCourse(courseId));
    }

    @GetMapping("/{id}/courses")
    public ResponseEntity<?> getUserCourses(@PathVariable("id") Long userId){
        return ResponseEntity.ok().body(this.courseService.getUserCourses(userId) == null ? "등록한 코스가 없습니다." : this.courseService.getUserCourses(userId));
    }
}
