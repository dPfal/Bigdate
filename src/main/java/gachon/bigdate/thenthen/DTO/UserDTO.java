package gachon.bigdate.thenthen.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import gachon.bigdate.thenthen.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String userId;
    private String password;
    private String userName;
    private String userRole;
    private String userMood;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime userJoinDate;

    public UserDTO(User user,LocalDateTime userJoinDate){
        this.id = user.getId();
        this.userId=user.getUserId();
        this.userName=user.getUserName();
        this.userMood=user.getUserMood();
        this.userRole=user.getUserRole();
        this.userJoinDate=userJoinDate;
    }
    public UserDTO(User user){
        this.id = user.getId();
        this.userId=user.getUserId();
        this.userName=user.getUserName();
        this.userMood=user.getUserMood();
        this.userRole=user.getUserRole();
    }
}
