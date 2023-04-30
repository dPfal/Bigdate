package gachon.bigdate.thenthen.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity (name="scraps_tb")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Scrap {
    @EmbeddedId
    private ScrapId scrapId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="course_id", insertable = false, updatable = false)
    private Course course;
}
