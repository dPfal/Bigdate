package gachon.bigdate.thenthen.DTO;

import lombok.Data;

@Data
public class ReviewDTO {
    private int placeSequence;
    private int avgScore;
    private int expense;
    private Long placeId;
    private String reviewInfo;
    private int isDel;
}
