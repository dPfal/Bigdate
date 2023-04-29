package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gachon.bigdate.thenthen.entity.ReviewId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Builder
@AllArgsConstructor
@Entity(name ="reviews_tb")
@NoArgsConstructor
@Getter
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

    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name = "course_id",insertable=false, updatable=false)
    @JsonIgnore
    private Course course;

    @MapsId("placeId")
    @ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name = "place_id",insertable=false, updatable=false)
    @JsonIgnore
    private Place place;

}

