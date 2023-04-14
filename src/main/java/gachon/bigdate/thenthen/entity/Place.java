package gachon.bigdate.thenthen.entity;

import lombok.Getter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name ="places_tb")
public class Place {
    @Id
    private Integer place_id;

    @Column(nullable = false)
    private int hotpot_id;

    @Column(nullable = false)
    private String category_group_code;

    @Column(nullable = false)
    private String category_name;

    @Column(nullable = false)
    private String place_name;

    @Column(nullable = false)
    private String place_mood;

    @Column(nullable = false)
    private String address_name;

    @Column(nullable = false)
    private double place_x;

    @Column(nullable = false)
    private double place_y;

    @Column(nullable = true)
    private String place_url;

    @Column(nullable = true)
    private String place_phone;

}
