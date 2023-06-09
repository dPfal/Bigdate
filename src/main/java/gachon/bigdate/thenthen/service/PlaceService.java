package gachon.bigdate.thenthen.service;


import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.repository.*;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.Review;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;
    private final CourseRepository courseRepository;
    public List<Place> getPlacesByHotspotId(Long hotspotId) {
        return this.placeRepository.findByHotspotId(hotspotId);
    }

    @Transactional
    public PlaceDTO getPlaceByPlaceId(Long placeId){
       Place place = this.placeRepository.findByPlaceId(placeId);
        int avgExpense = 0;
       ArrayList<ReviewDTO> reviewDTOs = new ArrayList<>();
        System.out.println(place.getReviewList());
        ArrayList<CourseDTO> courseDTOArrayList = new ArrayList<>();
       if(place.getReviewList().size()>0){
           for(Review review : place.getReviewList()){
               ReviewDTO reviewDTO = new ReviewDTO(review
                       ,courseRepository.findByCourseId(review.getReviewId().getCourse().getCourseId()).getPostedDate());
               reviewDTOs.add(reviewDTO);
           }
       }
       double placeAvg = this.placeRepository.calculateAvg(placeId);
        Optional<List<Review>> reviewList = Optional.ofNullable(place.getReviewList());
        if(reviewList.isPresent()){
            List<Course> courseList = new ArrayList<>();
            for(Review review : reviewList.get()){
                avgExpense+=review.getExpense();
                courseList.add(courseRepository.findByCourseId(review.getReviewId().getCourse().getCourseId()));
            }
            if(courseList!=null){
                for (Course course : courseList) {
                    CourseDTO courseDTO = new CourseDTO(course,course.getReviewList(),course.getCommentList(),course.getUser().getUserId(), course.getLikeCount(), course.getScrapCount());
                    courseDTOArrayList.add(courseDTO);
                }
            }
            if (reviewList.get().size()!=0){
                avgExpense = avgExpense/reviewList.get().size();
            }
        }
      return new PlaceDTO(place,placeAvg,courseDTOArrayList,reviewDTOs,avgExpense);
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

    public PageImpl<PlaceDTO> getPlaceList(Pageable pageable){
        Page<Place> placePage = this.placeRepository.findAll(pageable);
        ArrayList<PlaceDTO> placeDTOArrayList = new ArrayList<>();
        for (Place place : placePage.getContent()){
            placeDTOArrayList.add(new PlaceDTO(place));
        }
        return new PageImpl<>(placeDTOArrayList, pageable, this.placeRepository.count());
    }

    public PageImpl<PlaceDTO> getPlaceListByPlaceId(Pageable pageable, int hotspotId){
        Page<Place> placePage = this.placeRepository.findByHotspotId(pageable, hotspotId);
        ArrayList<PlaceDTO> placeDTOArrayList = new ArrayList<>();
        for (Place place : placePage.getContent()){
            placeDTOArrayList.add(new PlaceDTO(place));
        }
        return new PageImpl<>(placeDTOArrayList, pageable, placePage.get().count());
    }

    public ResponseEntity<?> updatePlaceMood(long placeId,String placeMood) {
        if(placeRepository.existsByPlaceId(placeId)){
            Place place = placeRepository.findByPlaceId(placeId);
            place.setPlaceMood(placeMood);
            placeRepository.save(place);
            return ResponseEntity.ok(new PlaceDTO(place));
        }else{
            return ResponseEntity.badRequest().body("분위기 수정 실패");
        }
    }
}
