package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
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
    private LocalDateTime commentDate ;

}
