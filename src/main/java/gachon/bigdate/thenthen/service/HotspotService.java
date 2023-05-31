package gachon.bigdate.thenthen.service;
import gachon.bigdate.thenthen.DTO.HotspotDTO;
import gachon.bigdate.thenthen.entity.Congestion;
import gachon.bigdate.thenthen.repository.CongestionRepository;
import gachon.bigdate.thenthen.DTO.CongestionDTO;
import gachon.bigdate.thenthen.DTO.IndexDTO;
import gachon.bigdate.thenthen.entity.CongestionId;
import gachon.bigdate.thenthen.entity.HitCount;
import gachon.bigdate.thenthen.repository.HitCountRepository;
import gachon.bigdate.thenthen.repository.HotspotRepository;
import gachon.bigdate.thenthen.entity.Hotspot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;
import java.time.DayOfWeek;
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
    private final CongestionRepository congestionRepository;
    public IndexDTO getHotspots(String remoteAddr) {
        System.out.println("hotspot is "+this.hotspotRepository.findAll());
        List<Hotspot> hotspots = this.hotspotRepository.findAll();
        ArrayList<HotspotDTO> hotspotDTOS =new ArrayList<>();
        for(Hotspot hotspot : hotspots){
           hotspotDTOS.add(new HotspotDTO(hotspot));
        }
        LocalDate today = LocalDate.now();
        LocalDateTime startDateTime = LocalDateTime.of(today, LocalTime.MIN);
        LocalDateTime endDateTime = LocalDateTime.of(today, LocalTime.MAX);
        if(!hitCountRepository.existsByVisitDateBetweenAndRemoteAddr(startDateTime,endDateTime,remoteAddr)){
            hitCountRepository.save(HitCount.builder().remoteAddr(remoteAddr).visitDate(LocalDateTime.now()).build());
        }
        return new IndexDTO(hotspotDTOS, hitCountRepository.count()
                ,hitCountRepository.countByVisitDateBetween(startDateTime,endDateTime));
    }

    public ArrayList<CongestionDTO> getCongestionsByHotspot(long hotspotId) {
        LocalDateTime dateTime = LocalDateTime.now();
        DayOfWeek dayOfWeek = dateTime.getDayOfWeek();
        int hour = dateTime.getHour();
        int day = dayOfWeek.getValue() - 1;
        int number = (day * 24) + hour;
        List<Congestion> congestionList = this.congestionRepository.findCongestion(number, hotspotId);
        ArrayList<CongestionDTO> congestionDTOArrayList = new ArrayList<>();
        for(Congestion congestion : congestionList){
            congestionDTOArrayList.add(new CongestionDTO(congestion));
        }
        return congestionDTOArrayList;
    }
}