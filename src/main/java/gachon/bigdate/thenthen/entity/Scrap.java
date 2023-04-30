package gachon.bigdate.thenthen.entity;

import lombok.*;

import javax.persistence.*;

@Entity (name="scraps_tb")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Scrap {
    @EmbeddedId
    private ScrapId scrapId;
}
