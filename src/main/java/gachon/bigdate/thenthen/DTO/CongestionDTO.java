package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Congestion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class CongestionDTO {
    private long id;
    private long hotpotId;
    private String congestionLevel;
    private long  minPopulation;
    private long  maxPopulation;

    public CongestionDTO (Congestion congestion){
        this.id = congestion.congestionId.getId();
        this.congestionLevel = congestion.AREA_CONGEST_LVL;
        this.maxPopulation = congestion.AREA_PPLTN_MAX;
        this.minPopulation = congestion.AREA_PPLTN_MIN;
        this.hotpotId = congestion.congestionId.getHOTSPOT_ID();
    }
}
