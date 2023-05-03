package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findById(Long id); // index Id로 조회
    Optional<User> findByUserId(String userId); // 사용자 Id로 조회


}
