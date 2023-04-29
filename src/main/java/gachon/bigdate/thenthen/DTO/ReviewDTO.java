package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.Review;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDTO {
    private int placeSequence;
    private int avgScore;
    private int expense;
    private Long placeId;
    private String reviewInfo;
    private int isDel;
    private Place place;

    public ReviewDTO(Review review){
        this.placeSequence = review.getReviewId().getPlaceSequence();
        this.avgScore = review.getAvgScore();
        this.expense = review.getExpense();
        this.placeId = review.getReviewId().getPlaceId();
        this.reviewInfo = review.getReviewInfo();
        this.isDel = review.getIsDel();
        this.place = review.getPlace();
    }
}

