package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name="likes_tb")
public class Like {
    @EmbeddedId
    private LikeId likeId;
}
