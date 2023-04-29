package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Service.CourseService;
import gachon.bigdate.thenthen.Service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final PlaceService placeService;
    private final CourseService courseService;

    @PostMapping("/comments")
    public ResponseEntity<String> userEx(Authentication authentication){
        System.out.println(authentication);
        return ResponseEntity.ok().body("id : "+ authentication.getName() + " \n댓글 등록 완료!");
    }
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


}
