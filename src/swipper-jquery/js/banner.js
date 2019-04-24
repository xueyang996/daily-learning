let bannerRender = (function () {
  // -> 获取后续需要操作的对象或者元素
  let container = $('#container'),
    wrapper = $('.wrapper'),
    focus = $('.focus'),
    arrowLeft = $('.arrowLeft'),
    arrowRight = $('.arrowRight'),
    slideList = null,
    focusList = null;

  // => 轮播图运动的基础参数
  let stepIndex = 0; // stepIndex 记录当前展示块的索引
  let autoTimer = null; // autoTimer 自动轮播的定时器
  let interval = 3000; // interval 间隔多长时间自动切换

  // autoMove：控制轮播图的运动和切换
  /*
  * 索引为1，展示第二张，warpper 的left - 1000;
  * 索引为2， 展示第三章，wrapper的left - 2000；
  * ....
  * warpper的left值其实就是当前要展示的图片索引对应的结果 ：-索引 * 1000
  *
  *
  * */
  function autoMove() {
    stepIndex++;
    if (stepIndex >= slideList.length) {
      // 说明再往后切换没有了，现在展示的是克隆的第一张，此时我们将wrapper设置到回到真实的第一张的位置，即left = 0，然后stepIndex = 1，这样就可以切换到第二张了
      wrapper.css('left', 0);
      stepIndex = 1;
    }
    wrapper.animate({
      left: -stepIndex * 1000
    }, 200); // 200 是从当前切换到下一张的动画时间 interval是间隔多久切换一次

    // -> 每一次运动完成需要让焦点跟着切换
    changeFocus();
  }

  // changeFocus: 让焦点跟着轮播图切换而切换（运动到克隆的这一张的时候，也需要让第一个li有选中的样式

  function changeFocus() {
    // 当轮播图运动到最后一张（克隆的第一张，我们需要让第一个li有选中样式，之所以使用tempIndex是因为stepIndex对轮播图切换起着很大作用，不能轻易修改）
    let tempIndex = stepIndex;
    tempIndex === slideList.length - 1
      ? tempIndex = 0
      : null;
    focusList.each((index, item) => {
      if (index === tempIndex) {
        $(item).addClass('active')
      } else {
        $(item).removeClass('active')
      }
    })
  }

  // queryDate：获取数据
  function queryData(onSuccess, onError) {
    const data  = [
      {img: './images/1.png', desc: '1'},
      {img: './images/3.png', desc: '1'},
      {img: './images/5.png', desc: '1'},
    ]
    onSuccess(data)
    $.ajax({
      url: 'json/banner.json',
      method: 'GET',
      dataType: 'json',
      async: false,
      success: onSuccess,
      error: onError
    })
  }

  // bindHTML：数据绑定
  function bindHTML(data) {
    let strSlide = ``;
    let strFocus = ``;
    data.forEach((item, index) => {
      let {
        img = 'img/banner1.jpg',
        desc = '珠峰培训'
      } = item;
      strSlide += `<div class="slide">
        <img src="${img}" alt="${desc}">
      </div>`;

      strFocus += `<li class="${index === 0 ? 'active' : '' }"></li>`
    });

    // 将第一张克隆一份放到最后
    strSlide += `<div class="slide">
        <img src="${data[0].img}" alt="${data[0].desc}">
      </div>`

    // 插入到容器中
    wrapper.html(strSlide);
    focus.html(strFocus);

    // -> 获取所有的slide和li
    slideList = $('.slide');
    focusList = $('.focus > li');

    // -> 根据slide的个数动态计算wrapper的宽度
    wrapper.css({
      width: slideList.length * 1000
    })

  }

  // handleContainer 鼠标进入后停止自动轮播，离开后开始自动轮播；
  function handleContainer() {
    container.on('mouseenter', function () {
      clearInterval(autoTimer);
      arrowLeft.css({
        display: 'block'
      });
      arrowRight.css({
        display: 'block'
      })
    }).on('mouseleave', function () {
      clearInterval(autoTimer);
      autoTimer = setInterval(autoMove, interval);
      arrowLeft.css({
        display: 'none'
      });
      arrowRight.css({
        display: 'none'
      })
    });
  }

  // 点击箭头切换轮播

  function handleArrow() {
    arrowRight.click(autoMove);
    arrowLeft.click(function () {
      stepIndex--;
      if (stepIndex < 0) {
        // 如果索引减减后小于0，说明当前已经是第一张，不能向右运动了，如果再减就该展示最后一张图片了（这里的最后一张应该是真实的最后一张图，而不是我们复制出来的那个），最后一张在slide中的位置是倒数第二，即索引位置是 length -2
        wrapper.css({
          left: -(slideList.length - 1) * 1000
        });
        stepIndex = slideList.length - 2;
      }
      wrapper.finish().animate({
        left: -stepIndex * 1000
      }, 200);
      changeFocus();
    })
  }

  // 点击焦点切换
  function handleFocus() {
    focusList.on('click', function () {
      // 给每个焦点绑定点击事件，点击的是谁，就让stepIndex的值等于谁的索引，然后运动到这里
      let focusIndex = $(this).index();
      stepIndex = focusIndex;
        wrapper.finish().animate({
          left: -focusIndex * 1000
        }, 200);
        changeFocus();
    })
  }




  //
  // queryData(bindHTML);
  // handleContainer();
  // handleArrow();
  // handleFocus();
  // autoTimer = setInterval(autoMove, interval)

  return {
    init() {
      queryData(bindHTML);
      handleContainer();
      handleArrow();
      handleFocus();
      autoTimer = setInterval(autoMove, interval)
    }
  }

})();

bannerRender.init();