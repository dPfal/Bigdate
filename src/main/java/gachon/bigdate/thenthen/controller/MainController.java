package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Service.HotspotService;
import gachon.bigdate.thenthen.Service.PlaceService;
import gachon.bigdate.thenthen.entity.Hotspot;
import gachon.bigdate.thenthen.entity.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MainController {
    @Autowired
    HotspotService hotspotService;
    @Autowired
    PlaceService placeService;
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

    @GetMapping("/hotspots/{hotspotId}")
    public List<Place> getPlacesByHotspot(@PathVariable("hotspotId") Long hotspotId){
        return this.placeService.getPlacesByHotspotId(hotspotId);
    }

    @GetMapping("/places/{placeId}")
    public Optional<Place> getPlaceById(@PathVariable("placeId") Long placeId){
        return this.placeService.getPlaceById(placeId);

    }
}
