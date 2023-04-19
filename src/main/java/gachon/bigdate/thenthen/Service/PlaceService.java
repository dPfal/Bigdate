package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Repository.PlaceRepository;
import gachon.bigdate.thenthen.entity.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {
    @Autowired
    PlaceRepository placeRepository;
    public List<Place> getPlacesByHotspotId(Long hotspotId) {
        List<Place> places = this.placeRepository.findByHotspotId(hotspotId);
        return places;
    }

    public Optional<Place> getPlaceById(Long placeId){
        return this.placeRepository.findById(placeId);
    }
}
