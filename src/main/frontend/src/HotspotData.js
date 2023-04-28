    const hotspots= [
    {
        "hotspot_id": "H01",
        "hotspot_name": "강남역",
        "congestion_level": 1,
        "fine_dust": 3,
        "sky_status": 2,
        "road_traffic_spd": 4
    },
    {
        "hotspot_id": "H02",
        "hotspot_name": "역삼역",
        "congestion_level": 1,
        "fine_dust": 3,
        "sky_status": 2,
        "road_traffic_spd": 4
    },
    {
        "hotspot_id": "H03",
        "hotspot_name": "동대문 관광특구",
        "congestion_level": 1,
        "fine_dust": 3,
        "sky_status": 2,
        "road_traffic_spd": 4
    },
    {
        "hotspot_id": "H04",
        "hotspot_name": "선릉역",
        "congestion_level": 1,
        "fine_dust": 3,
        "sky_status": 2,
        "road_traffic_spd": 4
    },
    {
        "hotspot_id": "H05",
        "hotspot_name": "서울대공원",
        "congestion_level": 1,
        "fine_dust": 3,
        "sky_status": 2,
        "road_traffic_spd": 4
    }
    ];

    const getPostByNo = hotspot_id => {
        const array = hotspots.filter(x => x.hotspot_id == hotspot_id);
        if (array.length == 1) {
          return array[0];
        }
        return null;
      }
export {hotspots,getPostByNo};