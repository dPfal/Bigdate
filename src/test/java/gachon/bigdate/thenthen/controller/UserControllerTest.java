package gachon.bigdate.thenthen.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gachon.bigdate.thenthen.DTO.UserDTO;
import gachon.bigdate.thenthen.Service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@WithMockUser
class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    AuthService authService;
    @Autowired
    ObjectMapper objectMapper;
    @Test
    @DisplayName("회원가입 성공")
    void join() throws Exception{
        String userId ="asdf";
        String userName ="홍길동";
        String password ="1234";
        String userEmail = "ozodsf@asdfsad";
        String userMood ="로맨틱한";
        String userRole="User";
        String id ="";

        mockMvc.perform(post("/user/join").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(objectMapper.writeValueAsBytes(new UserDTO(id,userId,password,userName,userRole,userMood))))
        .andDo(print()).andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원가입 실패 - userName 중복")
    void join_fail() throws Exception{

        String userId ="asdf";
        String userName ="홍길동";
        String password ="1234";
        String userEmail = "ozodsf@asdfsad";
        String userMood ="로맨틱한";
        String userRole="User";
        String id ="";

        mockMvc.perform(post("/user/join").contentType(MediaType.APPLICATION_JSON).with(csrf())
                        .content(objectMapper.writeValueAsBytes(new UserDTO(id,userId,password,userName,userRole,userMood))))
                .andDo(print()).andExpect(status().isConflict());
    }

}