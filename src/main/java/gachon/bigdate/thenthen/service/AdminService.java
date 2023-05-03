package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.AdminMainDTO;
import gachon.bigdate.thenthen.DTO.PlaceDTO;
import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.entity.Place;
import gachon.bigdate.thenthen.entity.User;
import gachon.bigdate.thenthen.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
            userDTOArrayList.add(new UserDTO(user));
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


}
