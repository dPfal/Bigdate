package gachon.bigdate.thenthen.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name="hotspots_tb")
@AllArgsConstructor
@NoArgsConstructor
public class Hotspot {
    @Id
    @Column(name="hotspot_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotspotId;
    @Column (name="hotspot_name")
    private String hotspotName; //    지역명
    @Column(name="congestion_level")
    private int congestionLevel;//    혼잡도
    @Column(name="pm_10")
    private int pm10;//    미세먼지 농도
    @Column(name="sky_status_level")
    private int skyStatus;//    하늘 상태
    @Column(name="road_traffic_spd")
    private int roadTrafficSpd;//    평균주행속도
}

