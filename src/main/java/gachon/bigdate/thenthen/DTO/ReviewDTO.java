package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.Review;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ReviewDTO {
    private int placeSequence;
    private int avgScore;
    private int expense;
    private Long placeId;
    private String reviewInfo;
    private int isDel;
    private LocalDateTime postedDate;
    private String userId;
    private PlaceDTO placeDTO;

    public ReviewDTO(Review review,LocalDateTime postedDate){
        this.placeSequence = review.getReviewId().getPlaceSequence();
        this.avgScore = review.getAvgScore();
        this.expense = review.getExpense();
        this.placeId = review.getReviewId().getPlaceId();
        this.reviewInfo = review.getReviewInfo();
        this.isDel = review.getIsDel();
        this.postedDate=postedDate;
        this.userId=review.getCourse().getUser().getUserId();
    }

    public ReviewDTO(Review review){
        this.placeSequence = review.getReviewId().getPlaceSequence();
        this.avgScore = review.getAvgScore();
        this.expense = review.getExpense();
        this.placeId = review.getReviewId().getPlaceId();
        this.reviewInfo = review.getReviewInfo();
        this.isDel = review.getIsDel();
        this.placeDTO = new PlaceDTO(review.getPlace());
        this.userId=review.getCourse().getUser().getUserId();
    }
}

