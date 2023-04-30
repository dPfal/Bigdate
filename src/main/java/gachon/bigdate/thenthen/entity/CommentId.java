package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Embeddable
@Builder
@AllArgsConstructor
public class CommentId implements Serializable {
    @Column(name = "course_id")
    private long courseId;

    @Column(name="id")
    private long id;

    @Column(name ="comment_date")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime commentDate;
}
