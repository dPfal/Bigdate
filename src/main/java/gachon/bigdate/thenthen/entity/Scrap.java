package gachon.bigdate.thenthen.entity;

import javax.persistence.*;

@Entity (name="scraps_tb")
public class Scrap {
   @EmbeddedId
    private ScrapId scrapId;
}
