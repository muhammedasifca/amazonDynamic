let allMobiles;
try {
  const getData = async () => {
    const res = await fetch("./data.json");
    const { data } = await res.json();
    allMobiles = data;
    pagination(allMobiles);
  };
  getData();
} catch (error) {
  console.log(error);
}
const phonesRow = document.querySelector(".phoneRow");
const showAllMobiles = (mob) => {
  const fullMob = mob;
  fullMob.forEach((mobile) => {
    phonesRow.innerHTML += `<div class="phonesDet">
              <div class="phonesDet-border">  
                <div class="det-in">
                  <div class="phoneImage"> 
                    <div class="phImg">
                      <img src=${mobile.mobImg} alt="" />
                    </div>
                  </div>
                  <div class="phone-desc">
                    <div class="phoneName">
                      <h2 class="bigName">
                        ${mobile.mobName}  
                      </h2>
                    </div>
                    <div class="star">
                      <span class="starCount"></span>
                      <i
                        class="fa-solid fa-angle-down"
                        style="color: #000000"
                      ></i>
                      <span>715</span>
                    </div>
                    <p class="k">5k+ bought in past month</p>
                    <div class="priceTag">
                      <!-- <span class="rupees">&#8377;</span> -->
                      <span class="amount"
                        ><span class="rupIcon">₹</span
                        ><span class="mon">${mobile.disRate}</span></span
                      >
                      ${
                        mobile.off == ""
                          ? ""
                          : `<span class="mrp"
                        >M.R.P: <span class="cross">₹${mobile.retRate}</span>
                      </span>
                      <span class="per">(${mobile.off}% off)</span>`
                      }
                      <div class="card">7.5% Off on select cards</div>
                    </div>
                    <div class="primeMem">
                      ${
                        mobile.isPrime
                          ? `<span class="primeImg"></span>
                      <span>Get it by </span><span class="tom">Tomorrow</span>`
                          : ""
                      }
                      <p>FREE Delivery by Amazon</p>
                    </div>
                    <div class="service">Service: Installation</div>
                  </div>    
                </div>
              </div>
            </div>`;
  });
};

let filterObj = {
  prime: false,
  brands: [],
  star: false,
  price: null,
  discount: null,
};

const buttonPrime = document.querySelector("#prime");
buttonPrime.addEventListener("change", (e) => {
  if (buttonPrime.checked) {
    filterObj.prime = true;
  } else {
    filterObj.prime = false;
  }
  filterData(filterObj);
});

const brandCheck = document.querySelectorAll('input[name="brand"]');
brandCheck.forEach((brand) => {
  brand.addEventListener("change", (e) => {
    if (brand.checked) {
      filterObj.brands.push(e.target.id);
    } else {
      filterObj.brands = filterObj.brands.filter(
        (brand) => brand != e.target.id
      );
    }
    filterData(filterObj);
  });
});
const starCheck = document.querySelector("#fourStar");
starCheck.addEventListener("change", () => {
  if (starCheck.checked) {
    filterObj.star = true;
  } else {
    filterObj.star = false;
  }
  filterData(filterObj);
});
let priceCheck = document.querySelectorAll('input[name="price"]');
priceCheck.forEach((price) => {
  price.addEventListener("change", (e) => {
    if (price.checked) {
      filterObj.price = e.target.id;
      makeUncheked(e.target);
    } else {
      filterObj.price = null;
    }
    filterData(filterObj);
  });
});
let discountCheck = document.querySelectorAll('input[name="discount"]');
discountCheck.forEach((dis) => {
  dis.addEventListener("change", (e) => {
    if (dis.checked) {
      filterObj.discount = e.target.id;
      disUncheked(e.target);
    } else filterObj.discount = null;
    filterData(filterObj);
  });
});

const makeUncheked = (clickCheck) => {
  priceCheck.forEach((check) => {
    if (check !== clickCheck) {
      check.checked = false;
    }
  });
};
const disUncheked = (clickCheck) => {
  discountCheck.forEach((check) => {
    if (check !== clickCheck) {
      check.checked = false;
    }
  });
};

const filterData = (filterObj) => {
  let newData = [];
  const prime = filterObj.prime;
  if (prime === true) {
    const filtered = allMobiles.filter((mobile) => mobile.isPrime == true);
    newData.push(...filtered);
    // phonesRow.innerHTML = "";
    pagination(newData);

    console.log("kok");
  }
  const star = filterObj.star;
  if (star == true) {
    if (newData.length === 0) {
      const filtered = allMobiles.filter((mobile) => mobile.star > 4);
      newData.push(...filtered);
      // phonesRow.innerHTML = "";
      // pagination(newData);
    } else {
      newData = newData.filter((mobile) => mobile.star > 4);
      // phonesRow.innerHTML = "";
      // pagination(newData);
    }
    isTabChange = true;
    pagination(newData);
  }
  const brands = filterObj.brands;
  if (brands.length != 0) {
    if (newData.length == 0) {
      brands.forEach((brand) => {
        const filtered = allMobiles.filter((mobile) => mobile.brand == brand);
        newData.push(...filtered);
      });
      // phonesRow.innerHTML = "";
      // pagination(newData);
    } else {
      brands.forEach((brand) => {
        const filtered = allMobiles.filter((mobile) => mobile.brand == brand);
        newData.push(...filtered);
      });
      newData = newData.filter(
        (item, index) => newData.indexOf(item) !== index
      );
      // phonesRow.innerHTML = "";
      // pagination(newData);
    }
    isTabChange = true;
    pagination(newData);
  }
  const price = filterObj.price;
  if (price != null) {
    if (newData.length == 0) {
      if (price == "fiveToTen") {
        const filtered = allMobiles.filter(
          (mobile) => mobile.disRate > 5000 && mobile.disRate < 10000
        );
        newData.push(...filtered);
        // phonesRow.innerHTML = "";
        // pagination(newData);
      } else if (price == "tenToTwenty") {
        const filtered = allMobiles.filter(
          (mobile) => mobile.disRate > 10000 && mobile.disRate < 20000
        );
        newData.push(...filtered);
        // phonesRow.innerHTML = "";
        // pagination(newData);
      } else {
        const filtered = allMobiles.filter((mobile) => mobile.disRate > 20000);
        newData.push(...filtered);
        // phonesRow.innerHTML = "";
        // pagination(newData);
      }
      isTabChange = true;
      pagination(newData);
    } else {
      if (price == "fiveToTen") {
        newData = newData.filter(
          (mobile) => mobile.disRate > 5000 && mobile.disRate < 10000
        );

        // phonesRow.innerHTML = "";
        // pagination(newData);
      } else if (price == "tenToTwenty") {
        newData = newData.filter(
          (mobile) => mobile.disRate > 10000 && mobile.disRate < 20000
        );
        // phonesRow.innerHTML = "";
        // pagination(newData);
      } else {
        newData = newData.filter((mobile) => mobile.disRate > 20000);
        // phonesRow.innerHTML = "";
        // pagination(newData);
      }
      isTabChange = true;
      pagination(newData);
    }
  } else if (
    prime != true &&
    star != true &&
    brands.length == 0 &&
    price == null
  ) {
    // phonesRow.innerHTML = "";
    // console.log("shueprtjhh");
    pagination(allMobiles);
  }
};

const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

allCheckbox.forEach((check) => {
  check.addEventListener("change", (e) => {
    if (check.checked) {
      e.target.nextElementSibling.style.color = "#c45500";
      changeCheckToNormal();
    } else {
      e.target.nextElementSibling.style.color = "#0f1111";
    }
  });
});

const changeCheckToNormal = () => {
  allCheckbox.forEach((check) => {
    if (check.checked == false) {
      check.nextElementSibling.style.color = "#0f1111";
    }
  });
};

let start = 0;
let currentPage = 1;
const pages = document.querySelector(".pages");
let isTabChange = false;
const pageDet = document.querySelector(".pagination");
const pagination = (mobileData) => {
  phonesRow.innerHTML = "";
  let mobile = mobileData;
  console.log(mobile);
  if (isTabChange) {
    start = 0;
    console.log("kjjgajh");
    console.log(start);
  }
  const limit = 8;
  let minCount = start * limit;
  let maxCount = limit * (start + 1);
  let eightPhones = mobile.slice(minCount, maxCount);
  const length = mobile.length;
  const isPage = Math.floor(length / limit);
  console.log(pageDet.innerHTML);
  pageDet.innerHTML=`${start*limit+1}-${isPage==start?mobile.length:limit*(start+1)} of ${mobile.length} results for <span class="dep">Departments</span>`
  

  if (isPage >=1) {
    pages.innerHTML = `
              <button class="previous pageBtn">Previous</button>
              <div id="pageNumber">
              </div>
              <button class="next pageBtn">Next</button>
    `;
    const pageId = document.querySelector("#pageNumber");
    for (let i = 1; i <= isPage + 1; i++) {
      span = document.createElement("span");
      span.innerHTML = i;
      span.classList.add("num");
      pageId.appendChild(span);
      if (start + 1 == i) {
        span.classList.add("active");
      }
    }
    const previousBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", () => {
      start = start + 1;
      if (start > isPage) {
        start = isPage;
      }
      isTabChange = false;
      pagination(mobile);
    });
    previousBtn.addEventListener("click", () => {
      start = start - 1;
      if (start < 0) {
        start = 0;
      }
      isTabChange = false;
      pagination(mobile);
    });
  } else {
    pages.innerHTML = "";
  }

  const numbers = document.querySelectorAll(".num");
  numbers.forEach((num) => {
    num.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      start = parseInt(num.textContent - 1);
      isTabChange = false;
      pagination(mobile);
    });
  });
  showAllMobiles(eightPhones);
};
backtoBtn = document.querySelector(".backto");
backtoBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
