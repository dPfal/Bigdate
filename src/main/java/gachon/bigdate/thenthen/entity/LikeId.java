package gachon.bigdate.thenthen.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class LikeId implements Serializable {
    @Column(name="course_id", insertable = false, updatable = false)
    private Long courseId;
    @Column(name="id")
    private Long id;
}
