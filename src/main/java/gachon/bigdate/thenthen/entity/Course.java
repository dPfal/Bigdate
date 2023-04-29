package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column
    private Long id;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="posted_date")
    private LocalDateTime postedDate;

    @Column(name ="course_name")
    private String courseName;

    @Column(name ="course_info")
    private String courseInfo;

    @Transient
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id")
    @JsonIgnore
    private User user;

    @Transient
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @Transient
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @Transient
    private int commentCount;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Comment> likeList = new ArrayList<>();

    @Transient
    private int likeCount;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Comment> scrapList = new ArrayList<>();

    @Transient
    private int scrapCount;
    @PostLoad
    private void postLoad() {
        this.likeCount = likeList.size();
        this.commentCount = commentList.size();
    }


}
