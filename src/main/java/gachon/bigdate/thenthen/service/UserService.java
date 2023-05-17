package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.entity.User;
import gachon.bigdate.thenthen.entity.UserLog;
import gachon.bigdate.thenthen.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserLogRepository userLogRepository;
    public UserDTO getUserInfo(Long id){
       return new UserDTO(userRepository.findById(id).get());
    }

//    public UserDTO updateUser(String userId) {
//        Optional<User> optionalUser = userRepository.findByUserId(userId);
//        if (optionalUser.isPresent()){
//            return UserDTO.UserDto(optionalUser.get());
//        } else {
//            return null;
//        }
////        user.setUserId(userDto.getUserId());
////        user.setUserPassword(userDto.getUserPassword());
////        user.setUserName(userDto.getUserName());
////        user.setUserRole(userDto.getUserRole());
////        user.setUserMood(userDto.getUserMood());
//        return userRepository.save(userId);
//    }


    public String deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            // 3. Delete user
            userRepository.deleteById(id);
            UserLog userLog = userLogRepository.findById(id).get();
            userLog.setWithDrawDate(LocalDateTime.now());
            userLogRepository.save(userLog);
            return "{\"message\":\"사용자 삭제 완료!\"}";
        } else {
            return "{\"message\":\"사용자 삭제 실패!\"}";
        }
    }

    public ResponseEntity<?> updateUserMood(long id,String userMood){
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            user.setUserMood(userMood);
            userRepository.save(user);
            return ResponseEntity.ok().body(new UserDTO(user));
        }else{
            return ResponseEntity.badRequest().body("id 조회에 실패했습니다.");
        }
    }
}

