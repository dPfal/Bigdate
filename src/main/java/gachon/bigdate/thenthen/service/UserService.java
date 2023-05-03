package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
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


    public void deleteUser(Long id) { //회원 탈퇴
        userRepository.deleteById(id);
    }
}

