package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.HotspotDTO;
import gachon.bigdate.thenthen.DTO.IndexDTO;
import gachon.bigdate.thenthen.repository.HitCountRepository;
import gachon.bigdate.thenthen.repository.HotspotRepository;
import gachon.bigdate.thenthen.entity.Hotspot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotspotService {
    private final HotspotRepository hotspotRepository;
    private final HitCountRepository hitCountRepository;
    public IndexDTO getHotspots() {
        System.out.println("hotspot is "+this.hotspotRepository.findAll());
        List<Hotspot> hotspots = this.hotspotRepository.findAll();
        ArrayList<HotspotDTO> hotspotDTOS =new ArrayList<>();
        for(Hotspot hotspot : hotspots){
           hotspotDTOS.add(new HotspotDTO(hotspot));
        }
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.of(0,0,0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));
        return new IndexDTO(hotspotDTOS, hitCountRepository.count()
                ,hitCountRepository.countByVisitDateBetween(startDatetime,endDatetime));
    }
}