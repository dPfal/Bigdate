package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.Congestion;
import gachon.bigdate.thenthen.entity.CongestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CongestionRepository extends JpaRepository<Congestion,CongestionId> {
    @Query(value = "select id, AREA_NM, AREA_CONGEST_LVL, AREA_PPLTN_MIN, AREA_PPLTN_MAX from congestions_tb where AREA_NM = ?2 and id>=?1 and id < ?1+24", nativeQuery = true)
    ArrayList<Congestion> findCongestion(int date, long hotspotId);
}
