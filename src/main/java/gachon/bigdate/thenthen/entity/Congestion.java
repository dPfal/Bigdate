package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="congestions_tb")
@Entity
public class Congestion {
    @Column
    @EmbeddedId
    public CongestionId congestionId;
    @Column
    public String AREA_CONGEST_LVL;
    @Column
    public long AREA_PPLTN_MIN;
    @Column
    public long AREA_PPLTN_MAX;
}
