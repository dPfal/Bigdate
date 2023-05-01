package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private Long courseId;
    private LocalDateTime commentDate;
    private String commentText;
    private UserDTO user;
    public CommentDTO(Comment comment) {
        this.id = comment.getCommentId().getId();
        this.courseId = comment.getCourse().getCourseId();
        this.commentDate = comment.getCommentId().getCommentDate() ;
        this.commentText = comment.getCommentText();
    }
    public CommentDTO(Comment comment, User user){
        this.id = comment.getCommentId().getId();
        this.courseId = comment.getCourse().getCourseId();
        this.commentDate = comment.getCommentId().getCommentDate() ;
        this.commentText = comment.getCommentText();
        this.user = new UserDTO(user);
    }
}
