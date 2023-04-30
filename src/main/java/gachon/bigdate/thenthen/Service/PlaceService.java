package gachon.bigdate.thenthen.Service;


import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.Repository.*;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    @Transactional
    public PlaceDTO getPlaceByPlaceId(Long placeId){
       Place place = this.placeRepository.findByPlaceId(placeId);
       ArrayList<ReviewDTO> reviewDTOs = new ArrayList<>();
        ArrayList<CourseDTO> courseDTOArrayList = new ArrayList<>();

       if(place.getReviewList().size()>0){
           for(Review review : place.getReviewList()){
               ReviewDTO reviewDTO = new ReviewDTO(review,courseRepository.findByCourseId(review.getReviewId().getCourseId()).getPostedDate());
               reviewDTOs.add(reviewDTO);
           }
       }
       double placeAvg = this.placeRepository.calculateAvg(placeId);
       Optional<List<Course>> courseList = Optional.of(this.courseRepository.findCourseByPlaceId(place.getPlaceId()));

       if(courseList.isPresent()){
        for (Course course : courseList.get()) {
            CourseDTO courseDTO = new CourseDTO(course,course.getReviewList(),course.getCommentList(),course.getUser().getUserId(), course.getLikeCount(), course.getScrapCount());
            courseDTOArrayList.add(courseDTO);
        }
       }
      return new PlaceDTO(place,placeAvg,courseDTOArrayList,reviewDTOs);
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
