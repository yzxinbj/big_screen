/**
 *
 * @param opt
 * {
     *      ele：绑定元素
     *      wholeWidth：图片总宽度
     *      singleWidth：每一帧的宽度
     *      clear：播放完动画是否清除
     *      cb：Function 回调
     *      framePerSecond: 24
     * }
 */

export default function (opt) {
  let count = 0;

  const timer = setInterval(() => {
    opt.ele.css({
      'background-image': `url(/static/output/output${Math.floor(count / 20)}.png)`,
      'background-position': `-${count % 20 * 200}px 0`,
    });
    count += 1;
    if (count >= 20 && count <= 30) {
      opt.ele.find('.row').css('opacity', (count - 20) * 0.1);
    }
    if (count >= 130 && count <= 140) {
      opt.ele.find('.row').css('opacity', (140 - count) * 0.1);
    }
    if (count > 148) {
      clearInterval(timer);
      opt.ele.remove();
      opt.bmap.removeOverlay(opt.marker);
    }
    // console.log('009')
  }, 1000 / (opt.framePerSecond || 18));
}
