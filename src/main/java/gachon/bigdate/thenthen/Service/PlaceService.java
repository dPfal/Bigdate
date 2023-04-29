package gachon.bigdate.thenthen.Service;


import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Repository.*;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final LikeRepository likeRepository;
    private final ScrapRepository scrapRepository;
    private final PlaceRepository placeRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    public List<Place> getPlacesByHotspotId(Long hotspotId) {
        return this.placeRepository.findByHotspotId(hotspotId);
    }

    public PlaceDTO getPlaceByPlaceId(Long placeId){
       Optional<Place> place = this.placeRepository.findById(placeId);
       double placeAvg = this.placeRepository.calculateAvg(placeId);
       Optional<List<Course>> courseList = Optional.of(this.courseRepository.findCourseByPlaceId(place.get().getPlaceId()));
       ArrayList<CourseDTO> courseDTOArrayList = new ArrayList<>();
       if(courseList.isPresent()){
        for (Course course : courseList.get()) {
            CourseDTO courseDTO = new CourseDTO();
            courseDTO.setCourseId(course.getCourseId());
            courseDTO.setCourseTitle(course.getCourseName());
            courseDTO.setPostedDate(course.getPostedDate()+"");
            courseDTO.setLikeCount(this.likeRepository.countByLikeIdCourseId(course.getCourseId()));
            courseDTO.setScrapCount(this.scrapRepository.countByScrapIdCourseId(course.getCourseId()));
            courseDTO.setUserId(this.userRepository.findById(course.getId()).get().getUserId());
            courseDTOArrayList.add(courseDTO);
        }
       }
      return new PlaceDTO(place.get(),placeAvg,courseDTOArrayList);
    }
    public List<PlaceDTO> getPlaceByPlaceName(String searchData) {
        Optional<List<Place>> placeList = this.placeRepository.findByPlaceNameContaining(searchData);
        if (placeList.isPresent()) {
            return placeList.get().stream()
                    .map(m -> new PlaceDTO(m.getPlaceId(), m.getPlaceName()))
                    .collect(Collectors.toList());
        } else {
            return null;
        }
    }
}
