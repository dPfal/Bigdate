package gachon.bigdate.thenthen.DTO;

import lombok.Data;

@Data
public class MemberLogDTO {
    private Long userId;
    private String joinDate;
    private String withdrawDate;
}
