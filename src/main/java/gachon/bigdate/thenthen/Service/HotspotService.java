package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.Repository.HotspotRepository;
import gachon.bigdate.thenthen.entity.Hotspot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class HotspotService {
    private final HotspotRepository hotspotRepository;
    public List<Hotspot> getHotspots() {
        System.out.println("hotspot is "+this.hotspotRepository.findAll());
        List<Hotspot> hotspots = this.hotspotRepository.findAll();
        return hotspots;
    }
}