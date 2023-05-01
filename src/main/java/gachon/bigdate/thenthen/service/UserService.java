package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserDTO getUserInfo(Long id){
       return new UserDTO(userRepository.findById(id).get());
    }
}
