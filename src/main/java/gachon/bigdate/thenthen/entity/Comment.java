package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name="comments_tb")
@Embeddable
@Getter
@Builder
@AllArgsConstructor
public class Comment{
    @EmbeddedId
    private CommentId commentId;

    @Column (name="comment_text")
    private String commentText;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="course_id", insertable = false, updatable = false)
    private Course course;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id", insertable = false, updatable = false)
    private User user;

    @Transient
    private String userName;

    @PostLoad
    private void postLoad() {
        this.userName = user.getUserId();
    }
}
