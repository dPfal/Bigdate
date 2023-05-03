package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name ="courses_tb")
public class Course {
    @Id
    @Column(name ="course_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(name="id")
    private Long id;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="posted_date")
    private LocalDateTime postedDate;

    @Column(name ="course_name")
    private String courseName;

    @Column(name ="course_info")
    private String courseInfo;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id",insertable=false, updatable=false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="courseId",insertable=false, updatable=false)
    @JsonIgnore
    private Place place;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @Formula("(select count(*) from comments_tb cm where cm.course_id = course_id)")
    @Transient
    private int comments;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Like> likeList = new ArrayList<>();

    @Formula("(select count(*) from likes_tb lk where lk.course_id = course_id)")
    @Transient
    private int likes;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Scrap> scrapList = new ArrayList<>();

    @Formula("(select count(*) from scraps_tb sc where sc.course_id = course_id)")
    @Transient
    private int scraps;

    @Transient
    private int scrapCount;
    @Transient
    private int likeCount;
    @Transient
    private int commentCount;


    @PostLoad
    private void initializeCounts() {
        this.commentCount = commentList.size();
        this.likeCount = likeList.size();
        this.scrapCount = scrapList.size();
    }
}
