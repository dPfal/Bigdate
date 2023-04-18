package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.HotspotDTO;
import gachon.bigdate.thenthen.Repository.HotspotRepository;
import gachon.bigdate.thenthen.entity.Hotspot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class HotspotService {
    @Autowired
    HotspotRepository hotspotRepository;
    public List<Hotspot> getHotspots() {
        List<Hotspot> hotspots = this.hotspotRepository.findAll();
        return hotspots;
    }
}