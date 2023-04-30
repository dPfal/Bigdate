package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Scrap;
import gachon.bigdate.thenthen.entity.ScrapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, ScrapId> {
    int countByScrapIdCourseId(Long courseId);

    int countByScrapIdCourseIdAndScrapIdId(long courseId, long id);
    Optional<List<Scrap>> findByScrapIdId(long id);

    int deleteAllByScrapIdCourseId(Long courseId);
}
