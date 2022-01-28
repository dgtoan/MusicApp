const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER__STORAGE__KEY = "TORAF_MUSIC";

const audio = $("#audio");
const togglePlay = $(".player__control__toggle-play");
const playBtn = $$(".player__control__toggle-play > i");
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
const volumeIcon = $(".bx-volume-full");
const volumeMute = $(".bx-volume-mute");
const volumeRange = $(".volume__range");
const volumeChange = $("#volume__range");
const heartSolid = $(".bx-heart");
const heartFull = $(".bxs-heart");
const playlistLyrics = $(".playlist__nav__lyrics");
const playlistNow = $(".playlist__nav__list ");
const playlistAddSong = $(".playlist__nav__addsong");

var isPlay = false;
var isRepeat = false;
var isRandom = false;
var nowVolume = 0;

const app = {
  currentIndex: 0,
  config: JSON.parse(localStorage.getItem(PLAYER__STORAGE__KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER__STORAGE__KEY, JSON.stringify(this.config));
  },
  fullSong: [
    {
      index: 0,
      isAdded: true,
      name: "Hết Thương Cạn Nhớ",
      singer: "Anh Hảo Cover",
      path: "./assets/music/HetThuongCanNho.mp3",
      img: "https://b.f6.photo.talk.zdn.vn/5485886239781724064/75e5c0edc26b0f35567a.jpg",
      time: "01:02",
    },
    {
      index: 1,
      isAdded: false,
      name: "Phía Sau Một Cô Gái",
      singer: "Soobin Hoàng Sơn",
      path: "./assets/music/PhiaSauMotCoGai.mp3",
      img: "https://data.chiasenhac.com/data/cover/65/64657.jpg",
      time: "04:30",
    },
    {
      index: 2,
      isAdded: false,
      name: "Buồn Của Anh",
      singer: "Đạt G x K-ICM x Masew",
      path: "./assets/music/BuonCuaAnh.mp3",
      img: "https://data.chiasenhac.com/data/cover/81/80579.jpg",
      time: "04:48",
    },
    {
      index: 3,
      isAdded: false,
      name: "Điều Khác Lạ",
      singer: "Masew x Đạt G x Ngọc Haleyy",
      path: "./assets/music/DieuKhacLa.mp3",
      img: "https://data.chiasenhac.com/data/cover/78/77294.jpg",
      time: "04:41",
    },
    {
      index: 4,
      isAdded: false,
      name: "Ngày Khác Lạ",
      singer: "Đen x Giang Phạm x Triple D",
      path: "./assets/music/NgayKhacLa.mp3",
      img: "https://data.chiasenhac.com/data/cover/84/83880.jpg",
      time: "03:32",
    },
    {
      index: 5,
      isAdded: false,
      name: "Tuý Âm",
      singer: "Xesi x Masew x Nhật Nguyễn",
      path: "./assets/music/TuyAm.mp3",
      img: "https://data.chiasenhac.com/data/cover/76/75884.jpg",
      time: "03:21",
    },
    {
      index: 6,
      isAdded: false,
      name: "Sau Tất Cả",
      singer: "Erik",
      path: "./assets/music/SauTatCa.mp3",
      img: "https://data.chiasenhac.com/data/cover/52/51739.jpg",
      time: "03:54",
    },
    {
      index: 7,
      isAdded: false,
      name: "Ta Còn Yêu Nhau",
      singer: "Đức Phúc",
      path: "./assets/music/TaConYeuNhau.mp3",
      img: "https://data.chiasenhac.com/data/cover/78/77258.jpg",
      time: "03:32",
    },
    {
      index: 8,
      isAdded: false,
      name: "Thanh Xuân",
      singer: "Da LAB",
      path: "./assets/music/ThanhXuan.mp3",
      img: "https://data.chiasenhac.com/data/cover/94/93770.jpg",
      time: "03:40",
    },
    {
      index: 9,
      isAdded: false,
      name: "Cưới Thôi",
      singer: "Masew x Masiu x B Ray x TAP",
      path: "./assets/music/CuoiThoi.mp3",
      img: "https://data.chiasenhac.com/data/cover/147/146170.jpg",
      time: "03:02",
    },
  ],
  songs: [
    {
      index: 0,
      isAdded: true,
      name: "Hết Thương Cạn Nhớ",
      singer: "Anh Hảo Cover",
      path: "./assets/music/HetThuongCanNho.mp3",
      img: "https://b.f6.photo.talk.zdn.vn/5485886239781724064/75e5c0edc26b0f35567a.jpg",
      time: "01:02",
    },
  ],
  loadConfig: function () {
    if (
      this.config.currentIndex &&
      this.config.currentIndex < this.songs.length
    ) {
      this.currentIndex = this.config.currentIndex;
    } else {
      this.currentIndex = 0;
    }
    if (this.config.isRandom) {
      isRandom = this.config.isRandom;
      randomBtn.classList.toggle("active", isRandom);
    }
    if (this.config.isRepeat) {
      isRepeat = this.config.isRepeat;
      repeatBtn.classList.toggle("active", isRepeat);
    }
  },
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `<div class="playlist__item item${song.index}">
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
  renderFullSong: function () {
    const htmls = this.fullSong.map(function (song, index) {
      return `<div class="playlist__item item${song.index}">
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
              <i class='bx bx-check'></i>
              <i class='bx bx-plus'></i>
              </div>
            </div>
          </div>`;
    });
    let fullHtml = '<div class="play__list__main--br"></div>' + htmls.join("");
    $(".playlist__main").innerHTML = fullHtml;
    this.fullSong.forEach(function (song) {
      if (song.isAdded) {
        var item = $(`.item${song.index}`);
        item.style.backgroundColor = "#ffe3e3";
        var itemIcon = item.querySelectorAll(".item__icon > i");
        itemIcon[0].style.display = "block";
        itemIcon[1].style.display = "none";
      }
    });
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurrentSong: function () {
    this.setConfig("currentIndex", this.currentIndex);
    let activeItem = $(".playlist__item--active");
    if (activeItem) {
      activeItem.classList.remove("playlist__item--active");
    }
    const itemActive = $(`.item${this.currentSong.index}`);
    musicName.textContent = this.currentSong.name;
    musicAuthor.textContent = this.currentSong.singer;
    musicImg.src = this.currentSong.img;
    audio.src = this.currentSong.path;
    backgroundImg.style.backgroundImage = `url(${this.currentSong.img})`;
    if (playlistNow.classList.value === "playlist__nav__list active") {
      itemActive.classList.add("playlist__item--active");
      setTimeout(function () {
        itemActive.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
    musicTime.textContent = this.currentSong.time;
  },
  loadVolume: function () {
    nowVolume = this.config.nowVolume || 0.5;
    volumeChange.value = nowVolume * 100;
    audio.volume = nowVolume;
  },

  handleEvents: function () {
    playlistAddSong.onclick = function () {
      app.renderFullSong();
      playlistAddSong.classList.add("active");
      playlistNow.classList.remove("active");
      playlistLyrics.classList.remove("active");
    };
    playlistNow.onclick = function () {
      app.render();
      const itemActive = $(`.item${app.currentSong.index}`);
      itemActive.classList.add("playlist__item--active");
      setTimeout(function () {
        itemActive.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      playlistAddSong.classList.remove("active");
      playlistNow.classList.add("active");
      playlistLyrics.classList.remove("active");
    };
    playlistLyrics.onclick = function () {
      let fullHtml =
        '<div class="play__list__main--br"></div>' +
        "        <h3>Coming Soon . . .</h3>";
      $(".playlist__main").innerHTML = fullHtml;
      playlistAddSong.classList.remove("active");
      playlistNow.classList.remove("active");
      playlistLyrics.classList.add("active");
    };

    togglePlay.onclick = function () {
      if (isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    playList.onclick = function (e) {
      if (playlistNow.classList.value === "playlist__nav__list active") {
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
      }
      if (playlistAddSong.classList.value === "playlist__nav__addsong active") {
        const item = e.target.closest(".playlist__item");
        if (item) {
          console.log(+item.classList.value[item.classList.value.length - 1]);
          var addIndex = +item.classList.value[item.classList.value.length - 1];
          app.fullSong[addIndex].isAdded = true;
          app.songs.push(app.fullSong[addIndex]);
          var itemNow = $(`.item${app.fullSong[addIndex].index}`);
          var itemIcon = itemNow.querySelectorAll(".item__icon > i");
          itemNow.style.backgroundColor = "#ffe3e3";
          itemIcon[0].style.display = "block";
          itemIcon[1].style.display = "none";
        }
      }
    };
    const imgRotate = playerImg.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    imgRotate.pause();

    volumeIcon.onmouseover = function () {
      volumeRange.style.display = "block";
    };
    volumeIcon.onmouseout = function () {
      volumeRange.style.display = "none";
    };
    volumeRange.onmouseover = function () {
      volumeRange.style.display = "block";
    };
    volumeRange.onmouseout = function () {
      volumeRange.style.display = "none";
    };
    heartSolid.onclick = function () {
      heartSolid.classList.add("hidden");
      heartFull.classList.remove("hidden");
    };
    heartFull.onclick = function () {
      heartFull.classList.add("hidden");
      heartSolid.classList.remove("hidden");
    };
    volumeIcon.onclick = function () {
      volumeIcon.classList.add("hidden");
      volumeMute.classList.remove("hidden");
      audio.volume = 0;
      volumeRange.style.display = "none";
    };
    volumeMute.onclick = function () {
      volumeMute.classList.add("hidden");
      volumeIcon.classList.remove("hidden");
      app.loadVolume();
    };

    volumeChange.oninput = function () {
      audio.volume = volumeChange.value / 100;
      app.setConfig("nowVolume", audio.volume);
    };

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
        app.setConfig("currentTime", Math.floor(audio.currentTime));
        rangeChange();
      }
    };
    range.oninput = function () {
      rangeAfter.style.width = (range.value / 10) * 0.8 + "%";
      audio.currentTime = Math.floor((range.value / 1000) * audio.duration);
    };

    randomIndex = function () {
      if (app.songs.length > 1) {
        var newIndex;
        do {
          newIndex = Math.floor(Math.random() * app.songs.length);
        } while (newIndex === app.currentIndex);
        app.currentIndex = newIndex;
      } else {
        audio.pause();
        app.currentIndex = 0;
        playBtn[0].classList.add("hidden");
        playBtn[1].classList.remove("hidden");
        isPlay = false;
        imgRotate.pause();
      }
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
      if (app.songs.length > 1) {
        app.loadCurrentSong();
        audio.play();
      }
    };
    repeatBtn.onclick = function () {
      isRepeat = !isRepeat;
      app.setConfig("isRepeat", isRepeat);
      repeatBtn.classList.toggle("active", isRepeat);
    };
    randomBtn.onclick = function () {
      isRandom = !isRandom;
      app.setConfig("isRandom", isRandom);
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
    this.loadConfig();
    this.loadVolume();
    this.defineProperties();
    this.render();
    this.loadCurrentSong();
    if (this.config.currentTime) {
      audio.currentTime = this.config.currentTime;
    }
    this.handleEvents();
  },
};

app.start();
