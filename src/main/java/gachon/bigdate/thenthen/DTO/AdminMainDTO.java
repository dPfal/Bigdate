package gachon.bigdate.thenthen.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
public class AdminMainDTO {
    private LocalDate date;
    private int joinCount;
    private int withDrawCount;
    private int courseCount;
    private int commentCount;
    private long hitCount;
}
