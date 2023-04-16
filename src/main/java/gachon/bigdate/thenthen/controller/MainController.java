package gachon.bigdate.thenthen.controller;

import gachon.bigdate.thenthen.DTO.PlaceDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping("/places")
    public PlaceDTO place(){
        PlaceDTO place = new PlaceDTO();
        place.setPlace_id(1234567890);
        return place;
    }

}
