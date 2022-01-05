function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele) {
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

let config = {
  initialPage: document.getElementById("initialPage"),
  mainPage: document.getElementById("mainPage"),
};

// userName - ユーザー名
// age - 年齢
// progressionDays - 経過日数
// userMoney - 所持金 
// burgerCount - ハンバーガーのカウント数
// userGetMoneyPerSec - ユーザーの秒あたりの収入金額
// getMoneyPerOneClick - ユーザーの1クリックあたりの収入金額
// items - 

class User {
  constructor(
    userName,
    age,
    progressionDays,
    userMoney,
    burgerCount,
    userGetMoneyPerSec,
    getMoneyPerOneClick,
    items
  ) {
    this.userName = userName;
    this.age = age;
    this.progressionDays = progressionDays;
    this.userMoney = userMoney;
    this.burgerCount = burgerCount;
    this.userGetMoneyPerSec = userGetMoneyPerSec;
    this.getMoneyPerOneClick = getMoneyPerOneClick;
    this.items = items;
  }
}

// goodsName - 商品名
// purchaseLimit - 購入限度数
// currentAmounts - 現在の所持数
// price - 価格
// getMoney - 収入
// getType - 収入タイプ
// goodsImg - 商品イメージ
// idName - ID

class Goods {
  constructor(
    goodsName,
    purchaseLimit,
    currentAmounts,
    price,
    getMoney,
    getType,
    goodsImg,
    idName
  ) {
    this.goodsName = goodsName;
    this.purchaseLimit = purchaseLimit;
    this.currentAmounts = currentAmounts;
    this.price = price;
    this.getMoney = getMoney;
    this.getType = getType;
    this.goodsImg = goodsImg;
    this.idName = idName;
  }
}

class View {
  // ログインページ
  static initialPage() {
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center bg-dark px-2">
        <div class="bg-white col-sm-7 col-md-5 col-lg-4 p-4">
            <h2 class="title">Clicker Empire Game</h2>
            <div class="py-3">
                <input id="userName" type="text" placeholder="Your name" class="form-control" value="">
            </div>
            <div class="d-flex justify-content-between mt-3">
                <div class="col-6 pl-0">
                    <button id="newBtn" class="btn btn-primary col-12">New</button>
                </div>
                <div class="col-6 pr-0">
                    <button id="loginBtn" class="btn btn-primary col-12" >Login</button>
                </div>
            </div>
        </div>
    </div>
        `;
    return config.initialPage.append(container);
  }

  // メインページ
  static mainPage(user) {
    let container = document.createElement("div");
    container.innerHTML = `
        <div class="vh-100 d-flex justify-content-center align-items-center bg-dark">
            <div class="col-md-10 bg-blue d-flex justify-content-between p-2 height">
                <div id="burgerArea" class="bg-dark col-4 p-2">
                </div>
                <div class="col-8">
                    <div id="userInfoArea">
                    </div>
                    <div id="goodsPage" class="col-12 bg-dark p-2 overflow-auto flowHeight">
                    </div>
                    <div class="d-flex justify-content-end mt-2">
                        <div class="border p-2 mr-2 hover" id="reset">
                            <i class="fas fa-undo fa-2x text-white"></i>
                        </div>
                        <div class="border p-2 hover" id="save">
                            <i class="fas fa-save fa-2x text-white"></i>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        `;
    container.querySelectorAll("#burgerArea")[0].append(View.burgerArea(user));
    container
      .querySelectorAll("#userInfoArea")[0]
      .append(View.userShowArea(user));
    container.querySelectorAll("#goodsPage")[0].append(View.goodsList(user));

    container.querySelectorAll("#reset")[0].addEventListener("click", () => {
      Controler.resetData(user);
    });
    container.querySelectorAll("#save")[0].addEventListener("click", () => {
      Controler.saveData(user);
    });

    return container;
  }

  // ハンバーガーサイド
  static burgerArea(user) {
    let container = document.createElement("div");
    container.innerHTML = `
        <div id='burgerNum' class="col-12 bg-blue text-center">
            <p class="rem120">${user.burgerCount} Burgers</p>
            <p>one click ¥${user.getMoneyPerOneClick}</p>
        </div>
        <div id="clickImg" class="d-flex justify-content-center pt-5">
            <img width="80%" src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="py-2 burgerHover img-fluid"/>
        </div>
        `;
    container.querySelectorAll("#clickImg")[0].addEventListener("click", () => {
      Controler.clickBurger(user);
    });
    return container;
  }

  // ユーザー情報サイド
  static userShowArea(user) {
    let container = document.createElement("div");

    container.innerHTML = `
        <div class="col-12 d-flex flex-wrap text-center p-0 mb-2">
            <div class="bg-dark p-1 col-6">
                <div class="bg-blue pb-3">
                    <p>${user.userName}</p>
                </div>
            </div>
            <div class="bg-dark p-1 col-6">
                <div class="bg-blue pb-3">
                    <p>${user.age} years old</p>
                </div>
            </div>
            <div class="bg-dark p-1 col-6">
                <div class="bg-blue pb-3">
                    <p id='days'>${user.progressionDays}days</p>
                </div>
            </div>
            <div class="bg-dark p-1 col-6">
                <div class="bg-blue pb-3">
                    <p id='userMoneyShow'>¥${user.userMoney}</p>
                </div>
            </div>
        </div>
        `;
    return container;
  }

  // 商品リスト閲覧サイド
  static goodsList(user) {
    let container = document.createElement("div");

    for (let i = 0; i < user.items.length; i++) {
      let type = "sec";
      if (user.items[i].getType === "ability") type = "click";

      let subContainer = document.createElement("div");
      subContainer.classList.add(
        "col-12",
        "d-flex",
        "justify-content-cetner",
        "bg-blue",
        "p-0",
        "itemList",
        "align-items-start",
        "my-1"
      );

      subContainer.innerHTML = `
                <div class="col-sm-3, d-flex, p-0">
                    <div class="py-1">
                        <img src="${
                          user.items[i].goodsImg
                        }" width="90%" class="img-fluid"/>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="p-0 d-flex justify-content-between pt-2">
                        <p class="rem14">${user.items[i].goodsName}</p>
                        <p class="rem14">${user.items[i].currentAmounts}</p>
                    </div>
                    <div class="p-0 d-flex justify-content-between pt-2">
                        <P>¥${user.items[i].price}</P>
                        <p class="text-green">¥${user.items[
                          i
                        ].getMoney.toString()} / ${type}</p>
                    </div>
                </div>
            `;
      subContainer.addEventListener("click", () => {
        container.innerHTML = "";
        container.append(View.goodsPage(user, i));
      });
      container.append(subContainer);
    }
    return container;
  }

  // 商品購入サイド
  static goodsPage(user, index) {
    console.log(user.userGetMoneyPerSec);
    let type = "sec";
    if (user.items[index].getType === "ability") type = "click";

    let container = document.createElement("div");
    container.classList.add("bg-blue", "p-2");

    container.innerHTML = `
        <div class='d-flex justify-content-center align-items-center'>
            <div>
                <h2>${user.items[index].goodsName}</h2>
                <p>Max purchases: ${
                  user.items[index].purchaseLimit === ""
                    ? "Infinite"
                    : user.items[index].purchaseLimit
                }</p>
                <p class="py-3">Price: ¥${user.items[index].price}</p>
                <p>Get ¥${user.items[index].getMoney} / ${type}</p>
            </div>
            <div class="col-sm-5 d-sm-block">
                <img class="img-fluid" src="${user.items[index].goodsImg}"/>
            </div>
        </div>
        <div class='mt-2'>
            <p>How many would you like to buy?</p>
            <input type="number" placeholder="0" min='0' max='${
              user.items[index].purchaseLimit
            }' class="form-control"/>
            <p id='total' class='text-right'>total: ¥0</p>
        </div>
        <div class='d-flex justify-content-between mt-3'>
            <div id='back' class="col-6 pl-0">
                <button class="btn btn-outline-primary bg-light col-12">Go Back</button>
            </div>
            <div id='purchase' class="col-6 pr-0">
                <button class="btn btn-primary col-12">Purchase</button>
            </div>
        </div>
        `;
    let inputEle = container.querySelectorAll("input[type='number']")[0];
    inputEle.addEventListener("change", () => {
      let currValue = inputEle.value;
      Controler.calcTotalPrice(currValue, user.items[index]);
    });

    let backBtn = container.querySelectorAll("#back")[0];
    backBtn.addEventListener("click", () => {
      // document.getElementById('goodsPage').innerHTML = '';
      // document.getElementById('goodsPage').append(View.goodsList(user));
      Controler.backGoodsPage(user);
    });

    let purchaseBtn = container.querySelectorAll("#purchase")[0];
    purchaseBtn.addEventListener("click", () => {
      console.log(user.userGetMoneyPerSec);
      let finalValue = inputEle.value;
      let finalPrice = parseInt(finalValue) * user.items[index].price;
      if (user.userMoney < finalPrice) {
        alert("There is not enough money");
        Controler.backGoodsPage(user);
      } else if (finalValue === "") {
        alert("Invalid number");
        Controler.backGoodsPage(user);
      } else {
        Controler.updataUserData(user, finalPrice, parseInt(finalValue), index);
        let type = user.items[index].getType;
        Controler.discrimination(type, user, index, finalValue);
        Controler.backGoodsPage(user);
      }
    });

    return container;
  }
}

class Controler {
  timer;

  static startGame() {
    View.initialPage();

    //   新規ユーザーのためのボタン処理
    let newBtn = config.initialPage.querySelectorAll("#newBtn")[0];
    newBtn.addEventListener("click", () => {
      let name = config.initialPage.querySelectorAll("input").item(0).value;
      if (name === "") {
        alert("please input ypur name");
      } else {
        let userData = Controler.createIntialData(name);
        this.moveToMainPage(userData);
        Controler.startTimer(userData);
      }
    });

    //   ログインユーザーのためのボタン処理
    let loginBtn = config.initialPage.querySelectorAll("#loginBtn")[0];
    loginBtn.addEventListener("click", () => {
      let name = config.initialPage.querySelectorAll("input").item(0).value;
      if (name === "") {
        alert("please input ypur name");
      } else {
        let userData = Controler.getUserData(name);
        if (userData === null) alert("There is no data");
        else this.moveToMainPage(userData);
      }
    });
  }

    // ユーザーデータの初期化
  static createIntialData(userName) {
    let items = [
      new Goods(
        "Flip machine",
        "500",
        0,
        15000,
        25,
        "ability",
        "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png",
        "flipMachine"
      ),
      new Goods(
        "ETF Stock",
        "",
        0,
        300000,
        0.1,
        "investiment",
        "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        "etfStock"
      ),
      new Goods(
        "ETF Bonds",
        "",
        0,
        300000,
        0.07,
        "investiment",
        "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
        "etfBonds"
      ),
      new Goods(
        "Lemonade Stand",
        "1000",
        0,
        30000,
        30,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
        "lemonadeStand"
      ),
      new Goods(
        "Ice Cream Truck",
        "500",
        0,
        100000,
        120,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
        "iceCreamTruck"
      ),
      new Goods(
        "House",
        "100",
        0,
        20000000,
        32000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
        "house"
      ),
      new Goods(
        "TownHouse",
        "100",
        0,
        40000000,
        64000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
        "townHouse"
      ),
      new Goods(
        "Mansion",
        "20",
        0,
        250000000,
        500000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
        "mansion"
      ),
      new Goods(
        "Industrial Space",
        "10",
        0,
        1000000000,
        2200000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
        "industrialSpace"
      ),
      new Goods(
        "Hotel Skyscraper",
        "5",
        0,
        10000000000,
        25000000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
        "hotelSkyscraper"
      ),
      new Goods(
        "Bullet-Speed Sky Railway",
        "1",
        0,
        10000000000000,
        10000000000,
        "realEstimate",
        "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",
        "bulletSpeedSkyRailway"
      ),
    ];

    if (userName === "cheater")
      return new User(userName, 20, 0, 100000000, 0, 0, 25, items);
    else return new User(userName, 20, 0, 50000, 0, 0, 25, items);
  }

  //ハンバーガー画像をクリックするとカウントされる
  static clickBurger(user) {
    user.burgerCount++;
    user.userMoney += user.getMoneyPerOneClick;
    console.log(user.burgerCount, user.userMoney);
    document.getElementById("burgerArea").innerHTML = "";
    document.getElementById("burgerArea").append(View.burgerArea(user));
    document.getElementById("userInfoArea").innerHTML = "";
    document.getElementById("userInfoArea").append(View.userShowArea(user));
  }

    // 経過日数をカウントする + 日にちが経過するごとに収入を獲得する
  static startTimer(user) {
    Controler.timer = setInterval(() => {
      user.progressionDays++;
      user.userMoney += user.userGetMoneyPerSec;
      if (user.progressionDays % 365 === 0) user.age++;
      document.getElementById("userInfoArea").innerHTML = "";
      document.getElementById("userInfoArea").append(View.userShowArea(user));
    }, 1000);
  }

    // カウントをストップする
  static stopTimer() {
    clearTimeout(Controler.timer);
  }

    // データ作成済みのユーザーの情報を獲得する
  static getUserData(userName) {
    return JSON.parse(localStorage.getItem(userName));
  }

  static moveToMainPage(user) {
    displayNone(config.initialPage);
    displayBlock(config.mainPage);
    config.mainPage.append(View.mainPage(user));
  }

  static moveToInitialPage() {
    displayBlock(config.initialPage);
    displayNone(config.mainPage);
    config.mainPage.innerHTML = "";
    config.initialPage.append(View.initialPage());
  }

  static calcTotalPrice(value, item) {
    let totalPrice = parseInt(value) * item.price;
    document.getElementById("total").innerHTML = `Total: ¥${totalPrice}`;
  }

    // 所持金額とアイテムの所持数を更新
  static updataUserData(user, finalPrice, getGoodsNum, index) {
    user.userMoney -= finalPrice;
    user.items[index].currentAmounts += getGoodsNum;
  }

    // 商品リストページに遷移
  static backGoodsPage(user) {
    document.getElementById("goodsPage").innerHTML = "";
    document.getElementById("goodsPage").append(View.goodsList(user));
  }

  // 収入タイプ別に処理を分けるための関数
  static discrimination(type, user, index, value) {
    if (type === "ability") Controler.updateAbility(user, index, value);
    else if (type === "investiment") Controler.updateInvestiment(user, index);
    else if (type === "realEstimate") Controler.updateRealEstimate(user, index);
  }

  // クリックタイプ
  static updateAbility(user, index, value) {
    console.log(user.userGetMoneyPerSec);
    user.getMoneyPerOneClick += user.items[index].getMoney * value;
    document.getElementById("burgerArea").innerHTML = "";
    document.getElementById("burgerArea").append(View.burgerArea(user));
  }

  //投資タイプ
  static updateInvestiment(user, index) {
    let increaseRatio = 0.1;
    let increaseAmount = user.items[index].price * increaseRatio;
    let updataPrice = user.items[index].price + increaseAmount;
    user.items[index].price = updataPrice;

    if (user.items[index].idName === "etfStock") {
      let ratio = 0.001;
      let numsOfSheet = user.items[index].currentAmounts;
      let getMoneyPerSec = Math.floor(
        numsOfSheet * user.items[index].price * ratio
      );
      user.userGetMoneyPerSec = getMoneyPerSec;
    } else if (user.items[index].idName === "etfBonds") {
      let ratio = 0.0007;
      let numsOfSheet = user.items[index].currentAmounts;
      let getMoneyPerSec = Math.floor(
        numsOfSheet * user.items[index].price * ratio
      );
      user.userGetMoneyPerSec = getMoneyPerSec;
    }
  }

    // 不動産タイプ
  static updateRealEstimate(user, index) {
    let numsOfSheet = user.items[index].currentAmounts;
    let getMoneyPerSec = Math.floor(numsOfSheet * user.items[index].getMoney);
    user.userGetMoneyPerSec = getMoneyPerSec;
  }

    // ユーザーデータをローカルに保存する
  static saveData(user) {
    Controler.stopTimer();
    localStorage.setItem(user.userName, JSON.stringify(user));
    Controler.moveToInitialPage();
  }

    // ユーザーデータの削除をする
  static resetData(user) {
    Controler.stopTimer();
    localStorage.removeItem(user.userName);
    Controler.moveToInitialPage();
  }
}

Controler.startGame();
