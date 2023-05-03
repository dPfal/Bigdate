package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long> {
    @Query(value = "select * from places_tb where hotspot_id = ?1", nativeQuery=true)
    List<Place> findByHotspotId(Long hotspotId);
    Optional<List<Place>> findByPlaceNameContaining(String searchData);

    @Query(value = "select coalesce(truncate(sum(avg_score)/count(*), 1), 0.0) from mydatabase.reviews_tb where place_id = ?1",nativeQuery = true)
    Double calculateAvg(Long placeId);

    Place findByPlaceId(Long placeId);
    Page<Place> findAll(Pageable pageable);
}
