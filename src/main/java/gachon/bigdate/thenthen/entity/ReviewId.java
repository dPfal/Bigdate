package gachon.bigdate.thenthen.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ReviewId implements Serializable { //Review Entity의 복합키
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "place_sequence")
    private int placeSequence;
}
