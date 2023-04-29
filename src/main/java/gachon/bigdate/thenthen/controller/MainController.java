package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Service.CourseService;
import gachon.bigdate.thenthen.Service.HotspotService;
import gachon.bigdate.thenthen.Service.PlaceService;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Hotspot;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final HotspotService hotspotService;
    private final PlaceService placeService;
    private final CourseService courseService;

    @GetMapping("/hotspots")
    public ResponseEntity<List<Hotspot>> index() throws Exception {
         return ResponseEntity.ok().body(hotspotService.getHotspots());
    }

    @GetMapping("/hotspots/{hotspotId}")
    public ResponseEntity<List> getPlacesByHotspot(@PathVariable("hotspotId") Long hotspotId){
        return ResponseEntity.ok().body(placeService.getPlacesByHotspotId(hotspotId));
    }

    @GetMapping("/places/{placeId}")
    public ResponseEntity<PlaceDTO> getPlaceById(@PathVariable("placeId") Long placeId){
        return ResponseEntity.ok().body(this.placeService.getPlaceByPlaceId(placeId));
    }
    @GetMapping("/courses")
    public ResponseEntity<Page<CourseDTO>> getCourseList(@PageableDefault(size = 15) @SortDefault(sort = "courseId", direction = Sort.Direction.DESC)Pageable pageable){
        return ResponseEntity.ok().body(this.courseService.getCourseList(pageable));
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<CourseDTO> getCourseByCourseId(@PathVariable("courseId") long courseId){
        return ResponseEntity.ok().body(this.courseService.getCourseByCourseId(courseId));
    }

}
