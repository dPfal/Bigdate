package gachon.bigdate.thenthen.DTO;

import lombok.Data;

@Data
public class ReviewDTO {
    private int placeSequence;
    private int avg_score;
    private int expense;
    private String reviewInfo;
    private boolean isDel;
}
