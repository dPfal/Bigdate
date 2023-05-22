package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.AdminMainDTO;
import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.entity.User;
import gachon.bigdate.thenthen.repository.CommentRepository;
import gachon.bigdate.thenthen.repository.CourseRepository;
import gachon.bigdate.thenthen.repository.UserLogRepository;
import gachon.bigdate.thenthen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserLogRepository userLogRepository;
    private final CourseRepository courseRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    public ArrayList<UserDTO> getMemberList(){
        Sort sort = Sort.by(Sort.Direction.ASC, "userRole"); // ADMIN 먼저 정렬
        List<User> userList = userRepository.findAll(sort);
        ArrayList<UserDTO> userDTOArrayList = new ArrayList<>();

        for(User user : userList){
            userDTOArrayList.add(new UserDTO(user,userLogRepository.findById(user.getId()).get().getJoinDate()));
        }
        return userDTOArrayList;
    }


    public ArrayList<AdminMainDTO> getAdminMain() {
        LocalDateTime today = LocalDateTime.now();
        ArrayList<AdminMainDTO> adminMainDTOArrayList = new ArrayList<>();
        for (int i=0;i<7;i++){
            LocalDateTime startDateTime = LocalDateTime.of(today.minusDays(i).toLocalDate(), LocalTime.MIN);
            LocalDateTime endDateTime = LocalDateTime.of(today.minusDays(i).toLocalDate(), LocalTime.MAX);
            adminMainDTOArrayList.add(new AdminMainDTO(today.minusDays(i).toLocalDate()
                    ,userLogRepository.countByJoinDateBetween(startDateTime,endDateTime),
                    userLogRepository.countByWithDrawDateBetween(startDateTime,endDateTime)
                    ,courseRepository.countByPostedDateBetween(startDateTime,endDateTime),
                    commentRepository.countByCommentIdCommentDateBetween(startDateTime,endDateTime)));
        }
        return adminMainDTOArrayList;
    }
    public String deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "{\"message\":\"사용자 삭제 완료!\"}";
        } else {
            return "{\"message\":\"사용자 삭제 실패!\"}";
        }
    }

    public ResponseEntity<?> modifyUserRole(long id,String userRole){
        User user = userRepository.findById(id).get();
        user.setUserRole(userRole);
        userRepository.save(user);
        return ResponseEntity.ok().body(new UserDTO(user));
    }
}
