package gachon.bigdate.thenthen.DTO;

import lombok.Data;

@Data
public class PlaceDTO {
    private int place_id;
    private int hotpot_id;
    private String category_group_code;
    private String category_name;
    private String place_name;
    private String place_mood;
    private String address_name;
    private double place_x;
    private double place_y;
    private String place_url;
    private String place_phone;
}
