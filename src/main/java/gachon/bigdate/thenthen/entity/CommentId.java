package gachon.bigdate.thenthen.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
@Data
@NoArgsConstructor
@Embeddable
public class CommentId implements Serializable {
    @Column(name="course_id", insertable = false, updatable = false)
    private long courseId;
    @Column(name="id")
    private long id;
    @Column(name ="comment_date")
    private String commentDate;
}
