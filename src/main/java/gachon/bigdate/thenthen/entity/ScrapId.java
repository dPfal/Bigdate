package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ScrapId implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name="id")
    private Long id;
}
