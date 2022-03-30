// @ts-ignore
const $ = window.$;
const $siteList = $('.siteList');
const $last = $siteList.find('li.last');
const $input = $('.searchWrapper>input');
// 数据初始化
const dataString = localStorage.getItem('nav-list');
const data = JSON.parse(dataString); // 站点列表
const hashMap = data || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn',
        count: 0
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com',
        count: 0
    }
];
// logo生成
const simplefyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') // 删除 / 开头的内容
    ;
};
// 渲染
const render = ()=>{
    console.log(hashMap);
    console.log(hashMap instanceof Array);
    hashMap.sort((pre, next)=>{
        // return pre.count - next.count; // 从小到大
        return next.count - pre.count; // 浏览次数从大到小
    });
    console.log(hashMap);
    // 删除所有站点
    $siteList.find('li:not(.last)').remove();
    // forEach可以改变node的值
    hashMap.forEach((node, index)=>{
        const $li = $(`\n            <li>\n            <div class="site">\n                <div class="logo">${node.logo}</div>\n                <div class="link">${simplefyUrl(node.url)}</div>\n                <div class="close">\n                    <svg class="icon">\n                        <use xlink:href="#icon-close"></use>\n                    </svg>\n                </div>\n            </div>\n        </li>\n        `).insertBefore($last);
        $li.on('click', ()=>{
            // 每点击一次，取出次数，排序一次
            node.count += 1;
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
// 新增站点时间
$('.addButton').on('click', ()=>{
    let url = window.prompt("请输入你要添加的网址");
    if (url.indexOf('http') !== 0) url = "https://" + url;
    console.log(url);
    hashMap.push({
        logo: simplefyUrl(url)[0].toUpperCase(),
        url,
        count: 0
    });
    console.log(hashMap);
    render();
});
// 关闭页面的响应
window.onbeforeunload = ()=>{
    const dataString1 = JSON.stringify(hashMap);
    localStorage.setItem('nav-list', dataString1);
};
// 键盘响应事件
$(document).on('keypress', (e)=>{
    // 如果此时焦点在输入框，不响应
    if ($input.is(":focus")) return;
    const { key  } = e;
    const target = (hashMap || []).find((item)=>item.logo.toUpperCase() === key
    );
    if (target) {
        target.count += 1;
        window.open(target.url);
    }
});

//# sourceMappingURL=index.834d4fd7.js.map
