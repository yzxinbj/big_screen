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
      .appendTo($('#app'));
    marker.hide();

    let count = 0;
    const timer = setInterval(() => {
      $html.css({
        'background-image': `url(/static/output/output${Math.floor(count / 20)}.png)`,
        'background-position': `-${count % 20 * 200}px 0`,
      });
      count += 1;
      if (count >= 20 && count <= 30) {
        $html.find('.row').css('opacity', (count - 20) * 0.1);
      }
      if (count >= 130 && count <= 140) {
        $html.find('.row').css('opacity', (140 - count) * 0.1);
      }
      if (count > 148) {
        clearInterval(timer);
        $html.remove();
        bmap.removeOverlay(marker);
      }
    }, 1000 / 18);
  }, 0);
}
