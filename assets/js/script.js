const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER__STORAGE__KEY = "TORAF_MUSIC";

const audio = $("#audio");
const togglePlay = $(".player__control__toggle-play");
const range = $("#player__range");
const rangeAfter = $(".range__after");
const prevBtn = $(".player__control__prev");
const nextBtn = $(".player__control__next");
const musicName = $(".player__title__music-name");
const musicAuthor = $(".player__title__music__author");
const musicImg = $("#player__img");
const backgroundImg = $(".player__bg");
const musicTime = $(".player__time__end");
const playerImg = $("#player__img");
const repeatBtn = $(".player__control__repeat");
const randomBtn = $(".player__control__random");
const playList = $(".playlist__main");

var isPlay = false;
var isRepeat = false;
var isRandom = false;

const app = {
  currentIndex: 0,
  config: JSON.parse(localStorage.getItem(PLAYER__STORAGE__KEY)) || {},
  setConfig: function(key, value) {
    this.config[key] = value
    localStorage.setItem(PLAYER__STORAGE__KEY, JSON.stringify(this.config))
  },
  songs: [
    {
      name: "Cưới Thôi",
      singer: "Masew x Masiu x B Ray x TAP",
      path: "./assets/music/CuoiThoi.mp3",
      img: "https://data.chiasenhac.com/data/cover/147/146170.jpg",
      time: "03:02",
    },
    {
      name: "Phía Sau Một Cô Gái",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/PhiaSauMotCoGai.mp3",
      img: "https://data.chiasenhac.com/data/cover/65/64657.jpg",
      time: "04:30",
    },
    {
      name: "Buồn Của Anh",
      singer: "Đạt G x K-ICM x Masew",
      path: "./assets/music/BuonCuaAnh.mp3",
      img: "https://data.chiasenhac.com/data/cover/81/80579.jpg",
      time: "04:48",
    },
    {
      name: "Điều Khác Lạ",
      singer: "Masew x Đạt G x Ngọc Haleyy",
      path: "./assets/music/DieuKhacLa.mp3",
      img: "https://data.chiasenhac.com/data/cover/78/77294.jpg",
      time: "04:41",
    },
    {
      name: "Ngày Khác Lạ",
      singer: "Đen x Giang Phạm x Triple D",
      path: "./assets/music/NgayKhacLa.mp3",
      img: "https://data.chiasenhac.com/data/cover/84/83880.jpg",
      time: "03:32",
    },
    {
      name: "Tuý Âm",
      singer: "Xesi x Masew x Nhật Nguyễn",
      path: "./assets/music/TuyAm.mp3",
      img: "https://data.chiasenhac.com/data/cover/76/75884.jpg",
      time: "03:21",
    },
    {
      name: "Sau Tất Cả",
      singer: "Erik",
      path: "./assets/music/SauTatCa.mp3",
      img: "https://data.chiasenhac.com/data/cover/52/51739.jpg",
      time: "03:54",
    },
    {
      name: "Ta Còn Yêu Nhau",
      singer: "Đức Phúc",
      path: "./assets/music/TaConYeuNhau.mp3",
      img: "https://data.chiasenhac.com/data/cover/78/77258.jpg",
      time: "03:32",
    },
    {
      name: "Thanh Xuân",
      singer: "Da LAB",
      path: "./assets/music/ThanhXuan.mp3",
      img: "https://data.chiasenhac.com/data/cover/94/93770.jpg",
      time: "03:40",
    },
    {
      name: "Hết Thương Cạn Nhớ Remix",
      singer: "Anh Hảo Cover x DJ Trang Chubby",
      path: "./assets/music/HetThuongCanNhoRemix.mp3",
      img: "https://b.f6.photo.talk.zdn.vn/5485886239781724064/75e5c0edc26b0f35567a.jpg",
      time: "04:52",
    },
  ],
  loadConfig: function() {
    this.currentIndex = this.config.currentIndex
    isRandom = this.config.isRandom
    isRepeat = this.config.isRepeat
    repeatBtn.classList.toggle("active", isRepeat);
    randomBtn.classList.toggle("active", isRandom);
  },
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `<div class="playlist__item item${index}">
            <div class="item__block">
              <div class="item__index">${index + 1}</div>
              <div class="item__img">
                <img src="${song.img}" alt="music_avatar" />
              </div>
              <div class="item__info">
                <h3 class="item__music">${song.name}</h3>
                <div class="item__author">${song.singer}</div>
              </div>
            </div>
            <div class="item__block">
              <div class="item__time">${song.time}</div>
              <div class="item__icon">
                <i class='bx bx-equalizer hidden'></i>
                <i class='bx bx-x'></i>
              </div>
            </div>
          </div>`;
    });
    let fullHtml = '<div class="play__list__main--br"></div>' + htmls.join("");
    $(".playlist__main").innerHTML = fullHtml;
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurrentSong: function () {
    this.setConfig("currentIndex", this.currentIndex)
    let activeItem = $(".playlist__item--active");
    if (activeItem) {
      activeItem.classList.remove("playlist__item--active");
    }
    const itemActive = $(`.item${this.currentIndex}`);
    musicName.textContent = this.currentSong.name;
    musicAuthor.textContent = this.currentSong.singer;
    musicImg.src = this.currentSong.img;
    audio.src = this.currentSong.path;
    backgroundImg.style.backgroundImage = `url(${this.currentSong.img})`;
    itemActive.classList.add("playlist__item--active");
    musicTime.textContent = this.currentSong.time;
    setTimeout(function () {
      itemActive.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  },
  loadCurrentTime: function () {
    audio.currentTime = this.config.currentTime
  },

  handleEvents: function () {
    const playBtn = $$(".player__control__toggle-play > i");
    togglePlay.onclick = function () {
      if (isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    playList.onclick = function (e) {
      const item = e.target.closest(
        ".playlist__item:not(.playlist__item--active)"
      );
      // console.log(e.target.closest('.bx-x'))
      if (item || e.target.closest(".bx-x")) {
        if (item && !e.target.closest(".bx-x")) {
          app.currentIndex =
            +item.querySelector(".item__index").textContent - 1;
          app.loadCurrentSong();
          audio.play();
        }
      }
    };
    const imgRotate = playerImg.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    imgRotate.pause();

    audio.onplay = function () {
      playBtn[0].classList.remove("hidden");
      playBtn[1].classList.add("hidden");
      isPlay = true;
      imgRotate.play();
    };
    audio.onpause = function () {
      playBtn[0].classList.add("hidden");
      playBtn[1].classList.remove("hidden");
      isPlay = false;
      imgRotate.pause();
    };
    rangeChange = function () {
      rangeAfter.style.width = (range.value / 10) * 0.8 + "%";
      let timeNow = Math.floor(audio.currentTime);
      let minute = Math.floor(timeNow / 60);
      let second = timeNow - minute * 60;
      const timeChange = $(".player__time__now");
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      timeChange.textContent = `${minute}:${second}`;
    };
    audio.ontimeupdate = function () {
      if (audio.duration) {
        range.value = Math.floor((audio.currentTime / audio.duration) * 1000);
        app.setConfig("currentTime", Math.floor(audio.currentTime))
        rangeChange();
      }
    };
    range.oninput = function () {
      rangeAfter.style.width = (range.value / 10) * 0.8 + "%";
      audio.currentTime = Math.floor((range.value / 1000) * audio.duration);
    };

    randomIndex = function () {
      var newIndex;
      do {
        newIndex = Math.floor(Math.random() * app.songs.length);
      } while (newIndex === app.currentIndex);
      app.currentIndex = newIndex;
    };

    prevBtn.onclick = function () {
      if (isRandom) {
        randomIndex();
      } else {
        if (app.currentIndex != 0) app.currentIndex--;
        else app.currentIndex = app.songs.length - 1;
      }
      app.loadCurrentSong();
      audio.play();
    };
    nextBtn.onclick = function () {
      if (isRandom) {
        randomIndex();
      } else {
        if (app.currentIndex != app.songs.length - 1) app.currentIndex++;
        else app.currentIndex = 0;
      }
      app.loadCurrentSong();
      audio.play();
    };
    repeatBtn.onclick = function () {
      isRepeat = !isRepeat;
      app.setConfig("isRepeat", isRepeat)
      repeatBtn.classList.toggle("active", isRepeat);
    };
    randomBtn.onclick = function () {
      isRandom = !isRandom;
      app.setConfig("isRandom", isRandom)
      randomBtn.classList.toggle("active", isRandom);
    };
    audio.onended = function () {
      if (isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
  },

  start: function () {
    audio.volume = 0.5;
    this.loadConfig();
    this.defineProperties();
    this.render();
    this.loadCurrentSong();
    this.loadCurrentTime();
    this.handleEvents();
  },
};

app.start();

// const oldSongs = [
//   {
//     name: "Cưới Thôi",
//     singer: "Masew x Masiu x B Ray x TAP",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/147/146170.jpg",
//     time: "03:02",
//   },
//   {
//     name: "Phía Sau Một Cô Gái",
//     singer: "Soobin Hoàng Sơn",
//     path: "6eug4L43WeIHYM8OJZlg",
//     img: "https://data.chiasenhac.com/data/cover/65/64657.jpg",
//     time: "04:30",
//   },
//   {
//     name: "Buồn Của Anh",
//     singer: "Đạt G x K-ICM x Masew",
//     path: "hOZ",
//     img: "https://data.chiasenhac.com/data/cover/81/80579.jpg",
//     time: "04:48",
//   },
//   {
//     name: "Điều Khác Lạ",
//     singer: "Masew x Đạt G x Ngọc Haleyy",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/78/77294.jpg",
//     time: "04:41",
//   },
//   {
//     name: "Ngày Khác Lạ",
//     singer: "Đen x Giang Phạm x Triple D",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/84/83880.jpg",
//     time: "03:32",
//   },
//   {
//     name: "Tuý Âm",
//     singer: "Xesi x Masew x Nhật Nguyễn",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/76/75884.jpg",
//     time: "03:21",
//   },
//   {
//     name: "Sau Tất Cả",
//     singer: "Erik",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/52/51739.jpg",
//     time: "03:54",
//   },
//   {
//     name: "Ta Còn Yêu Nhau",
//     singer: "Đức Phúc",
//     path: "Kvb50mq-w_1psYUKR9aewI1wZ",
//     img: "https://data.chiasenhac.com/data/cover/78/77258.jpg",
//     time: "03:32",
//   },
//   {
//     name: "Thanh Xuân",
//     singer: "Da LAB",
//     path: "",
//     img: "https://data.chiasenhac.com/data/cover/94/93770.jpg",
//     time: "03:40",
//   },
//   {
//     name: "Hết Thương Cạn Nhớ Remix",
//     singer: "Anh Hảo Cover x DJ Trang Chubby",
//     path: "cX6Jgug7ZyUFQuyW",
//     img: "https://b.f6.photo.talk.zdn.vn/5485886239781724064/75e5c0edc26b0f35567a.jpg",
//     time: "04:52",
//   },
// ]
