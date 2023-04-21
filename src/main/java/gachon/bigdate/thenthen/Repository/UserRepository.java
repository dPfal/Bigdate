package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserId(String userId); //사용자 Id로 조회
}
