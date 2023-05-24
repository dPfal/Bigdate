package gachon.bigdate.thenthen.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.security.DenyAll;
import java.util.ArrayList;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IndexDTO {
    private ArrayList<HotspotDTO> hotspotDTOArrayList;
    private long totalHit;
    private long todayHit;
}
