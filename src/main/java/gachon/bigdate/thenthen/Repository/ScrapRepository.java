package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Scrap;
import gachon.bigdate.thenthen.entity.ScrapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ScrapRepository extends JpaRepository<Scrap, ScrapId> {
    int countByScrapIdCourseId(Long courseId);
}
