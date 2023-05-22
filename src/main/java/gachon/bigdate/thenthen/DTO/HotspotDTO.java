package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Hotspot;
import gachon.bigdate.thenthen.service.HotspotService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@AllArgsConstructor
public class HotspotDTO {
    private Long hotspotId;
    private String hotspotName; //    지역명
    private int congestionLevel;//    혼잡도
    private int fineDust;//    미세먼지 농도
    private int skyStatusLevel;//    하늘 상태
    private int roadTrafficSpd;//    평균주행속도
    private ArrayList<PlaceDTO> placeList;

    public HotspotDTO(Hotspot hotspot) {
        this.hotspotId = hotspot.getHotspotId();
        this.hotspotName = hotspot.getHotspotName();
        this.congestionLevel = hotspot.getCongestionLevel();
        this.fineDust = hotspot.getPm10();
        this.skyStatusLevel = hotspot.getSkyStatus();
        this.roadTrafficSpd = hotspot.getRoadTrafficSpd();
    }

}
