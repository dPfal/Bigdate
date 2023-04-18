package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.HotspotDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Service.HotspotService;
import gachon.bigdate.thenthen.entity.Hotspot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    @Autowired
    HotspotService hotspotService;

    @GetMapping("/places")
    public PlaceDTO place(){
        PlaceDTO place = new PlaceDTO();
        place.setPlaceId(1234567890);
        return place;
    }

    @GetMapping("/hotspots")
    public List<Hotspot> index(){
       return this.hotspotService.getHotspots();
    }

}
