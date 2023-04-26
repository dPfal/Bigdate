package gachon.bigdate.thenthen.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String userId;
    private String password;
    private String userName;
    private String userRole;
    private String userMood;
}
