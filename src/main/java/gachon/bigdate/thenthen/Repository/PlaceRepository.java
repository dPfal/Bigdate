package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long> {
    @Query(value = "select * from places_tb where hotspot_id = ?1", nativeQuery=true)
    List<Place> findByHotspotId(Long hotspotId);
}
