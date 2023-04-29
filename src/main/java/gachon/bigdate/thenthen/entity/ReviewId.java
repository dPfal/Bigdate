package gachon.bigdate.thenthen.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Data
@NoArgsConstructor
@Embeddable
public class ReviewId implements Serializable {
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "place_sequence")
    private int placeSequence;
}