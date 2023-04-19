package gachon.bigdate.thenthen.DTO;

import lombok.Data;

import java.util.ArrayList;

@Data
public class CourseDTO {
    private Long courseId;
    private Integer userId;
    private String postedDate;
    private String courseName;
    private String courseInfo;
    private int scrapCount;
    private int likeCount;
    private ArrayList<ReviewDTO> reviewList;
    private ArrayList<CommentDTO> commentList;
}
