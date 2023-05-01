package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserLogRepository extends JpaRepository<UserLog, Long>{
    int countByWithDrawDateBetween(LocalDateTime startDateTime,LocalDateTime endDateTime);
    int countByJoinDateBetween(LocalDateTime startDateTime,LocalDateTime endDateTime);
}
