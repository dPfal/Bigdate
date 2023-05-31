package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Embeddable
@Builder
@AllArgsConstructor
public class CongestionId implements Serializable {
    @Column
    private long AREA_NM;
    @Column
    private long id;
}
