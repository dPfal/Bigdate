package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@AllArgsConstructor
@Data
@Builder
public class CourseDTO {
    private Long courseId;
    private Long id;
    private String userId;
    private String postedDate;
    private String courseTitle;
    private String courseInfo;
    private int scrapCount;
    private int likeCount;
    private ArrayList<ReviewDTO> reviewList;
    private ArrayList<CommentDTO> commentList;
    private int commentCount;
    public CourseDTO(){
        this.scrapCount=0;
        this.likeCount=0;
    }

    public CourseDTO(Course course, String userId, int likeCount,int scrapCount,  int commentCount) {
        this.id = course.getId();
        this.courseInfo = course.getCourseInfo();
        this.courseTitle = course.getCourseName();
        this.postedDate = course.getPostedDate()+"";
        this.scrapCount = scrapCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.userId = userId;
    }
    public CourseDTO(int scrapCount, int likeCount){
        this.scrapCount=scrapCount;
        this.likeCount=likeCount;
    }
}
