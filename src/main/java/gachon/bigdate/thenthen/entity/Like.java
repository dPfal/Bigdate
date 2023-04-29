package gachon.bigdate.thenthen.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="likes_tb")
public class Like {
    @EmbeddedId
    private LikeId likeId;
    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
