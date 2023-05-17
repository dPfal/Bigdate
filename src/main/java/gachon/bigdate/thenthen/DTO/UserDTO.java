package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    public UserDTO(User user){
        this.id = user.getId();
        this.userId=user.getUserId();
        this.userName=user.getUserName();
        this.userMood=user.getUserMood();
        this.userRole=user.getUserRole();
    }
}
