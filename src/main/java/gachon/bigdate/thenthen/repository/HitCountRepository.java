package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.HitCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface HitCountRepository extends JpaRepository<HitCount, Long> {
    boolean existsByVisitDateBetweenAndRemoteAddr(LocalDateTime startDateTime, LocalDateTime endDateTime, String remoteAddr);
    long countByVisitDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    long count();

}
