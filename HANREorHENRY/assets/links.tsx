type ModelImage = {
    label: string;
    url: string;
    model: string;
  };
  type ModelImages = {
    [key: string]: ModelImage[];
  };
  const models:ModelImages = {
    LG: [
      { model:"LG WING", label: "LG WING", url: "https://www.lge.co.kr/kr/images/smartphones/md08046021/gallery/medium01.jpg" },
      { model:"LG VELVET",label: "LG VELVET", url: "https://www.lge.co.kr/kr/images/smartphones/md08045599/gallery/medium01.jpg" },
    ],
    Apple: [
        { model:"iPhone 15 Pro",label: "아이폰 15 pro", url: "https://www.apple.com/v/iphone-15-pro/c/images/overview/contrast/iphone_15pro__3nx4u28gc026_large.jpg" },
        { model:"iPhone 15",label: "아이폰 15", url: "https://www.apple.com/v/iphone-15-pro/c/images/overview/contrast/iphone_15__dthdw40fq0wi_large.jpg" },
        { model:"iPhone 14",label: "아이폰 14", url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-compare-iphone-14-202309?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1693516153040" }
    ],
    Samsung: [
      { model:"Samsung Galaxy S24 Ultra",label: "갤럭시 S24 울트라", url: "https://images.samsung.com/kdp/event/sec/2024/0601_galaxy_series/buying/slide_v1/gs_buying_s24ultra_color_blue01_pc.jpg" },
      { model:"Samsung Galaxy S24+",label: "갤럭시 S24+", url: "https://images.samsung.com/kdp/event/sec/2024/0601_galaxy_series/buying/slide_v1/gs_buying_s24plus_color_blue01_pc.jpg" },
      { model:"Samsung Galaxy S24",label: "갤럭시 S24", url: "https://images.samsung.com/kdp/event/sec/2024/0601_galaxy_series/buying/slide_v1/gs_buying_s24_color_blue01_pc.jpg" },
      { model:"Samsung Galaxy Z Fold5",label: "갤럭시 z폴드 5", url: "https://images.samsung.com/kdp/event/sec/2024/0601_galaxy_series/buying/slide_v1/gs_buying_fold5_color_gray_pc.jpg" },
      { model:"Samsung Galaxy Z Flip5",label: "갤럭시 z플립 5", url: "https://images.samsung.com/kdp/event/sec/2024/0601_galaxy_series/buying/slide_v1/gs_buying_flip5_color_gray_pc.jpg" },
    ],
  };
  

  export default models;