package gachon.bigdate.thenthen.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Embeddable
public class ScrapId implements Serializable {
    @Column(name="course_id", insertable = false, updatable = false)
    private Long courseId;
    @Column(name="id")
    private Long id;
}
