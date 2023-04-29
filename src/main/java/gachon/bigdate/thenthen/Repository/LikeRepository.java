package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Like;
import gachon.bigdate.thenthen.entity.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {
    int countByLikeIdCourseId(Long courseId);
}
