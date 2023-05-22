package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.Review;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@Data
public class PlaceDTO {
    private Long placeId;
    private int hotpotId;
    private String categoryGroupCode;
    private String categoryName;
    private String placeName;
    private String placeMood;
    private String addressName;
    private double placeX;
    private double placeY;
    private String placeUrl;
    private String placePhone;
    private double score;
    private String imageUrl;
    private int avgPrice;
    private ArrayList<CourseDTO> courseList;
    private ArrayList<ReviewDTO> reviewList;
    private int reviewCount;
    public PlaceDTO(Long placeId, String placeName) {
        this.placeId = placeId;
        this.placeName = placeName;
    }
    public PlaceDTO(Place place){
        this.placeId = place.getPlaceId();
        this.placeX = place.getPlaceX();
        this.placeY = place.getPlaceY();
        this.placeName = place.getPlaceName();
        this.placeMood = place.getPlaceMood();
        this.placePhone = place.getPlacePhone();
        this.placeUrl = place.getPlaceUrl();
        this.imageUrl=place.getImageUrl();
        this.addressName = place.getAddressName();
        this.categoryGroupCode = place.getCategoryGroupCode();
        this.categoryName = place.getCategoryName();
        this.hotpotId = place.getHotspotId();
        this.reviewCount= place.getReviewList().size();
    }
    public PlaceDTO (Place place, double score, ArrayList<CourseDTO> courseList, ArrayList<ReviewDTO> reviewList, int avgPrice) {
        this.placeId = place.getPlaceId();
        this.placeX = place.getPlaceX();
        this.placeY = place.getPlaceY();
        this.placeName = place.getPlaceName();
        this.placeMood = place.getPlaceMood();
        this.placePhone = place.getPlacePhone();
        this.placeUrl = place.getPlaceUrl();
        this.imageUrl=place.getImageUrl();
        this.addressName = place.getAddressName();
        this.categoryGroupCode = place.getCategoryGroupCode();
        this.categoryName = place.getCategoryName();
        this.hotpotId = place.getHotspotId();
        this.score = score;
        this.courseList = courseList;
        this.reviewList = reviewList;
        this.avgPrice = avgPrice;
    }
}
