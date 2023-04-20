package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Hotspot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotspotRepository extends JpaRepository<Hotspot, Long> {
}
