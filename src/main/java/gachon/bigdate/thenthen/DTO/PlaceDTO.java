package gachon.bigdate.thenthen.DTO;

import lombok.Data;

@Data
public class PlaceDTO {
    private int placeId;
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
}
