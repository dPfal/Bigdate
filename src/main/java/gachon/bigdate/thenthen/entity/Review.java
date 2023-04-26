package gachon.bigdate.thenthen.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="reviews_tb")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
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

