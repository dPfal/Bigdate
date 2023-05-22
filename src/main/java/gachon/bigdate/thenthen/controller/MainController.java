package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.entity.HitCount;
import gachon.bigdate.thenthen.repository.HitCountRepository;
import gachon.bigdate.thenthen.service.CourseService;
import gachon.bigdate.thenthen.service.HotspotService;
import gachon.bigdate.thenthen.service.PlaceService;
import gachon.bigdate.thenthen.entity.Hotspot;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MainController {

    private final HotspotService hotspotService;
    private final PlaceService placeService;
    private final CourseService courseService;
    private final HitCountRepository hitCountRepository;

    @GetMapping("/hotspots")
    public ResponseEntity<?> index(HttpServletRequest request) throws Exception {
        hitCountRepository.save(HitCount.builder().remoteAddr(request.getRemoteAddr()).visitDate(LocalDateTime.now()).build());
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
    public ResponseEntity<Page<CourseDTO>> getCourseList(Pageable pageable){
        if(!pageable.getSort().isSorted()) pageable = PageRequest.of(pageable.getPageNumber(),15,Sort.by(Sort.Direction.DESC, "courseId"));
        else pageable = PageRequest.of(pageable.getPageNumber(),15, pageable.getSort().descending());
        return ResponseEntity.ok().body(this.courseService.getCourseList(pageable));
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<CourseDTO> getCourseByCourseId(@PathVariable("courseId") long courseId,
                                                         @RequestParam(required = false) Long id){
        if(id != null){
            return ResponseEntity.ok().body(this.courseService.getCourseByCourseId(courseId,id));
        }
        else{
            return ResponseEntity.ok().body(this.courseService.getCourseByCourseId(courseId));
        }
    }

}
