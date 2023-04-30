package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
@Data
@NoArgsConstructor
@Embeddable
@Builder
@AllArgsConstructor
public class ReviewId implements Serializable {
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "place_sequence")
    private int placeSequence;
}