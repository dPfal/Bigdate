package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="courses_tb")
public class Course {
    @Id
    @Column(name ="course_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(name ="id")
    private Long id;

    @CreationTimestamp
    @Column(name ="posted_date")
    private LocalDateTime postedDate;

    @Column(name ="course_name")
    private String courseName;

    @Column(name ="course_info")
    private String courseInfo;

}
