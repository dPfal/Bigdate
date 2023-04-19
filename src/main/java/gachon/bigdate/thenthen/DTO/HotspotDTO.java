package gachon.bigdate.thenthen.DTO;

import com.fasterxml.jackson.annotation.JsonGetter;
import gachon.bigdate.thenthen.entity.Place;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
public class HotspotDTO {
    private Long hotspotId;
    private String hotspotName; //    지역명
    private int congestionLevel;//    혼잡도
    private int fineDust;//    미세먼지 농도
    private int skyStatusLevel;//    하늘 상태
    private int roadTrafficSpd;//    평균주행속도
    private ArrayList<PlaceDTO> placeList;
}
