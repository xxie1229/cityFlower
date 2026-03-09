const cityFlowers = [
  {
    city: "北京",
    flowers: ["月季", "菊花"],
    intro: "月季象征坚韧与常新，菊花寓意高洁，体现首都深厚的人文气质。"
  },
  {
    city: "上海",
    flowers: ["白玉兰"],
    intro: "白玉兰花色洁白、姿态优雅，象征开放、包容与奋进的城市精神。"
  },
  {
    city: "广州",
    flowers: ["木棉花"],
    intro: "木棉花花色鲜红、树形挺拔，被称为“英雄花”，象征热情和担当。"
  },
  {
    city: "成都",
    flowers: ["芙蓉花"],
    intro: "芙蓉花古雅秀丽，成都亦有“蓉城”之称，承载当地历史与文化记忆。"
  },
  {
    city: "洛阳",
    flowers: ["牡丹"],
    intro: "牡丹雍容华贵，洛阳牡丹甲天下，体现富丽与繁荣之美。"
  },
  {
    city: "杭州",
    flowers: ["桂花"],
    intro: "桂花清香悠长，与西湖意境相映，寓意高雅、吉祥与丰收。"
  },
  {
    city: "南京",
    flowers: ["梅花"],
    intro: "梅花傲雪凌寒，象征坚贞不屈，也与南京的城市气质高度契合。"
  },
  {
    city: "武汉",
    flowers: ["梅花"],
    intro: "武汉东湖梅园久负盛名，梅花代表坚强与希望。"
  }
];

const flowerList = document.getElementById("flowerList");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

function createBaikeUrl(flowerName) {
  return `https://baike.baidu.com/item/${encodeURIComponent(flowerName)}`;
}

function buildFlowerLinks(flowers) {
  return flowers
    .map(
      (flower) =>
        `<button class="flower-link" type="button" data-flower="${flower}" title="查看 ${flower} 的百度百科">${flower}</button>`
    )
    .join("<span class=\"flower-separator\">、</span>");
}

function openFlowerBaike(flowerName) {
  const baikeUrl = createBaikeUrl(flowerName);
  const popup = window.open(
    baikeUrl,
    "baikePopup",
    "width=1100,height=760,left=100,top=80,resizable=yes,scrollbars=yes"
  );

  if (!popup) {
    alert("浏览器拦截了弹窗，请允许弹窗后重试。");
  }
}

function renderCards(items) {
  flowerList.innerHTML = items
    .map(
      (item) => `
        <article class="card">
          <h2>${item.city}</h2>
          <p class="meta">市花：${buildFlowerLinks(item.flowers)}</p>
          <p class="desc">${item.intro}</p>
        </article>
      `
    )
    .join("");

  emptyState.hidden = items.length !== 0;
}

function filterData(keyword) {
  const normalized = keyword.trim().toLowerCase();

  if (!normalized) {
    return cityFlowers;
  }

  return cityFlowers.filter((item) => {
    const target = `${item.city} ${item.flowers.join(" ")} ${item.intro}`.toLowerCase();
    return target.includes(normalized);
  });
}

flowerList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest(".flower-link");
  if (!button) {
    return;
  }

  const flowerName = button.getAttribute("data-flower");
  if (!flowerName) {
    return;
  }

  openFlowerBaike(flowerName);
});

searchInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const result = filterData(value);
  renderCards(result);
});

renderCards(cityFlowers);
