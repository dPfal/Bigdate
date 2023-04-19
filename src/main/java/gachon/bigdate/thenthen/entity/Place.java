package gachon.bigdate.thenthen.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name ="places_tb")
public class Place {
    @Id
    @Column(name="place_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;

    @Column(name="kakao_place_id")
    private Long kakaoPlaceId;

    @Column(name="hotspot_id")
    private int hotspotId;

    @Column(name="category_group_code")
    private String categoryGroupCode;

    @Column(name="category_name")
    private String categoryName;

    @Column(name="place_name")
    private String placeName;

    @Column(name="place_mood")
    private String placeMood;

    @Column(name="address_name")
    private String addressName;

    @Column(name="place_x")
    private double placeX;

    @Column(name="place_y")
    private double placeY;

    @Column(name="place_url")
    private String placeUrl;

    @Column(name="place_phone")
    private String placePhone;

    @Column(name="image_url")
    private String imageUrl;

}


