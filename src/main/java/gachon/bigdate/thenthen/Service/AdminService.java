package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.Repository.UserRepository;
import gachon.bigdate.thenthen.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.test.annotation.Repeat;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

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


}
