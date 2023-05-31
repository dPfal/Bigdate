package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    @Query(value = "select courses_tb.id,course_info,place_id,reviews_tb.course_id,members_tb.user_id,course_name, posted_date, sum(expense) from reviews_tb " +
            "inner join courses_tb on courses_tb.course_id = reviews_tb.course_id  " +
            "inner join members_tb on courses_tb.id = members_tb.id " +
            "where reviews_tb.place_id = ?1 "+
            "group by reviews_tb.course_id",nativeQuery = true)
    List<Course> findCourseByPlaceId(Long placeId);

    Course findByCourseId(long courseId);
    int deleteByCourseId(long courseId);

    int countByPostedDateBetween(LocalDateTime startDateTime,LocalDateTime endDateTime);
    List<Course> findAllById(long id);

    Page<Course> findAll(Pageable pageable);

}
