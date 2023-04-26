package gachon.bigdate.thenthen.DTO;

import lombok.Data;

import java.util.ArrayList;

@Data
public class CourseDTO {
    private Long courseId;
    private Long id;
    private String postedDate;
    private String courseTitle;
    private String courseInfo;
    private int scrapCount;
    private int likeCount;
    private ArrayList<ReviewDTO> reviewList;
    private ArrayList<CommentDTO> commentList;

    public CourseDTO(){
        this.scrapCount=0;
        this.likeCount=0;
    }
}
