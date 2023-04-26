package gachon.bigdate.thenthen.Service;


import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.Repository.PlaceRepository;
import gachon.bigdate.thenthen.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<PlaceDTO> getPlaceByPlaceName(String searchData) {
        Optional<List<Place>> placeList = this.placeRepository.findByPlaceNameContaining(searchData);
        if (placeList.isPresent()) {
            return placeList.get().stream()
                    .map(m -> new PlaceDTO(m.getPlaceId(), m.getPlaceName()))
                    .collect(Collectors.toList());
        } else {
            return null;
        }
    }
}
