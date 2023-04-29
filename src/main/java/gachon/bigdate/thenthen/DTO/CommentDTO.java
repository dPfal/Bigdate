package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Comment;
import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private String commentDate;
    private String commentText;

    public CommentDTO(Comment comment) {
        this.id = comment.getCommentId().getId();
        this.commentDate = comment.getCommentId().getCommentDate();
        this.commentText = comment.getCommentText();
    }
}
