package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLogRepository extends JpaRepository<UserLog, Long>{
}
