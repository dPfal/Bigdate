package gachon.bigdate.thenthen.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name="hotspots_tb")
public class Hotspot {
    @Id
    @Column(name="hotspot_id")
    private Long hotspotId;
    @Column (name="hotspot_name")
    private String hotspotName; //    지역명
    @Column(name="congestion_level")
    private int congestionLevel;//    혼잡도
    @Column(name="fine_dust")
    private int fineDust;//    미세먼지 농도
    @Column(name="sky_status_level")
    private int skyStatus;//    하늘 상태
    @Column(name="road_traffic_spd")
    private int roadTrafficSpd;//    평균주행속도
}
