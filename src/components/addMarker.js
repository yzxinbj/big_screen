export default function (bmap, markerData) {
  const myIcon = new BMap.Icon('/static/output/transparency.png', new BMap.Size(10, 10));
  const marker = new BMap.Marker(new BMap.Point(markerData.lng, markerData.lat), { icon: myIcon,
    enableClicking: false,
  });
  bmap.addOverlay(marker);
  setTimeout(() => {
    const $html = $(`<div class="bubble">
        <div class="row">
          <img src="${markerData.avator}" class="head">
          <span class="name">云鸟司机：${markerData.name}</span>
        </div>
        <div class="row">
          <span>车牌号：</span><span>${markerData.car_num}</span>
        </div>
        <div class="row">
          <span>订单状态：</span><span class="status">${markerData.status}</span>
        </div>
        <div class="row">
          <span>所在城市：</span><span>${markerData.city}</span>
        </div>
      </div>`);
    $html.css({ left: marker.V.offsetLeft - 475, top: marker.V.offsetTop - 291.5 })
      .appendTo($('#app'))
      .fadeIn(500)
      .delay(1000)
      .fadeOut(500, () => {
        $html.remove();
        bmap.removeOverlay(marker);
      });
    marker.hide();
  }, 0);
}
