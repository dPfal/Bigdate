package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.Repository.PlaceRepository;
import gachon.bigdate.thenthen.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class PlaceService {

    private final PlaceRepository placeRepository;
    public List<Place> getPlacesByHotspotId(Long hotspotId) {
        return this.placeRepository.findByHotspotId(hotspotId);
    }

    public Optional<Place> getPlaceById(Long placeId){
        return this.placeRepository.findById(placeId);
    }
}
