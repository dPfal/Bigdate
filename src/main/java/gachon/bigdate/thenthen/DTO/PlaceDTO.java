package gachon.bigdate.thenthen.DTO;

import lombok.Data;

import java.util.ArrayList;

@Data
public class PlaceDTO {
    private Long placeId;
    private int hotpotId;
    private String categoryGroupCode;
    private String categoryName;
    private String placeName;
    private String placeMood;
    private String addressName;
    private double placeX;
    private double placeY;
    private String placeUrl;
    private String placePhone;
    private int score;
    ArrayList<CourseDTO> courseList;

    public PlaceDTO(Long placeId, String placeName) {
        this.placeId = placeId;
        this.placeName = placeName;
    }
}
