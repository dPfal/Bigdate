package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.entity.ReviewId;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@Builder
@AllArgsConstructor
@Entity(name ="reviews_tb")
@NoArgsConstructor
@Getter
@Setter
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

