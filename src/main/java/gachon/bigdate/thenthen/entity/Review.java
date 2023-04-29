package gachon.bigdate.thenthen.entity;

import gachon.bigdate.thenthen.entity.ReviewId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Builder
@AllArgsConstructor
@Entity(name ="reviews_tb")
@NoArgsConstructor
public class Review {
    @EmbeddedId
    private ReviewId reviewId;

    @Column(name ="avg_score")
    private int avgScore;

    @Column(name ="expense")
    private int expense;

    @Column(name ="review_info")
    private String reviewInfo;

    @Column(name ="is_del")
    private int isDel;
}

