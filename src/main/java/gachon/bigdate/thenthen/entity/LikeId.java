package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor
@Builder
public class LikeId implements Serializable {

    @Column(name ="course_id")
    private Long courseId;

    @Column(name="id")
    private Long id;

}
