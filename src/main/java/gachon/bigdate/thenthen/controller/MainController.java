package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.Service.HotspotService;
import gachon.bigdate.thenthen.Service.PlaceService;
import gachon.bigdate.thenthen.entity.Hotspot;
import gachon.bigdate.thenthen.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final HotspotService hotspotService;
    private final PlaceService placeService;


    @GetMapping("/hotspots")
    public ResponseEntity<List<Hotspot>> index() throws Exception {
         return ResponseEntity.ok().body(hotspotService.getHotspots());
    }

    @GetMapping("/hotspots/{hotspotId}")
    public ResponseEntity<List> getPlacesByHotspot(@PathVariable("hotspotId") Long hotspotId){
        return ResponseEntity.ok().body(placeService.getPlacesByHotspotId(hotspotId));
    }

    @GetMapping("/places/{placeId}")
    public Optional<Place> getPlaceById(@PathVariable("placeId") Long placeId){
        return this.placeService.getPlaceById(placeId);

    }
}
