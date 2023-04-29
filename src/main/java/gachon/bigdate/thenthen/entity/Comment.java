package gachon.bigdate.thenthen.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name="comments_tb")
@Embeddable
@Getter
public class Comment{
    @EmbeddedId
    private CommentId commentId;

    @Column (name="comment_text")
    private String commentText;

    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
