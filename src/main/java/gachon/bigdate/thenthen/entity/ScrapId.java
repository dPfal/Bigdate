package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ScrapId implements Serializable {
    @Column(name="course_id")
    private Long courseId;

    @Column(name="id")
    private Long id;
}
