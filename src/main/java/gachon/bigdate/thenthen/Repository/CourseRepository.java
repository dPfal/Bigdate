package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    @Query(value = "select mydatabase.courses_tb.id,course_info,place_id,mydatabase.reviews_tb.course_id,members_tb.user_id,course_name, posted_date, sum(expense) from mydatabase.reviews_tb " +
            "inner join mydatabase.courses_tb on mydatabase.courses_tb.course_id = mydatabase.reviews_tb.course_id  " +
            "inner join mydatabase.members_tb on mydatabase.courses_tb.id = mydatabase.members_tb.id " +
            "where mydatabase.reviews_tb.place_id = ?1 "+
            "group by mydatabase.reviews_tb.course_id",nativeQuery = true)
    List<Course> findCourseByPlaceId(Long placeId);

    Course findByCourseId(long courseId);
    int deleteByCourseId(long courseId);

}
