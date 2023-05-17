package gachon.bigdate.thenthen.entity;

import gachon.bigdate.thenthen.DTO.UserDTO;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Table(name = "members_tb")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter

public class User{

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private String userId;

    @Column(name="user_password")
    private String userPassword;

    @Column(name ="user_name")
    private String userName;

    @Column(name ="user_role")
    private String userRole; //USER, ADMIN

    @Column(name ="user_mood")
    private String userMood;

    /* *Role이 여러개일 경우*/
    public List<String> getRoleList(){
        if(this.userRole.length()>0){
            return Arrays.asList(this.userRole.split(","));
        }else{
            return new ArrayList<>(); //null 방지
         }
    }
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courseList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likeList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Scrap> scrapList;

}
