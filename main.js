/*
@打开页面后等待时间默认为3000ms，可以通过更改waittime值来改变等待时间。
@自动重连上次次数默认为30次，可以通过更改reconnect_limit来改变，即经过
    timeperiod*reconnect_limit时间（30*2s = 60s）后，仍未连接成功就刷新网页
*/


(function autoClick()
{
    //重连尝试计数变量
    let reconnect_times = 0;
    //重连上限次数
    const reconnect_limit = 50;
    //设置页面打开时等待时间
    const waittime = 3000;
    //设置检查重连间隔为2s
    const timeperiod = 2000;
    //输出程序信息
    console.log('the autoclick script for hyperspaceAI.');
    //配置webGPU弹窗的CSS选择器
    const errordiv_str = 'div[class = "flex flex-col gap-2"] > div[class="flex flex-col gap-2 rounded-md bg-container p-4 text-sm text-foreground"]';
    const close_webGPU_button_str = 'button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]';
    //开启按钮后动画的CSS选择器
    const canvas_str = 'div.flex.items-center.justify-center > div.flex.items-center.bg-background';
    //选中开启按钮的CSS选择器
    const str = '.flex.flex-col.gap-2 > .flex.items-center.justify-between > .flex.h-8.items-center > button[role="switch"][value="on"]';

    //进入页面时，先等待页面元素加载
    setTimeout(() =>
    {
        //捕捉连接按钮函数
        function getbutton()
        {
            //捕捉连接按钮
            const button = document.querySelector(str);
            if (button === null)
            {
                return;
            }
            else
            {
                console.log('已选中按钮!');
                autocheckandkick(button);
            }
        }

        //定义自动重连函数
        function autocheckandkick(button)
        {
            //尝试捕获webGPU窗口是否弹出,弹出就将其关闭
            const webGPU = document.querySelector(errordiv_str);
            if(webGPU === null)
            {
                console.info('未出现弹窗');
            }
            else
            {
                console.error('弹出webGPU弹窗，将其关闭');
                const close_webGPU_button = document.querySelector(close_webGPU_button_str);
                close_webGPU_button.click();
            }

            //检查按钮状态
            const aria_checked = button.getAttribute('aria-checked');
            const data_state = button.getAttribute('data-state');
            //检测到按钮处于未开启状态
            if(aria_checked === 'false' && data_state === 'unchecked')
            {
                //重连次数达到上限，刷新页面
                if(reconnect_times >= reconnect_limit)
                {
                    //location.reload();
                }
                const button_canvas = document.querySelector(canvas_str);   //捕获开启按钮动画元素
                //未捕捉到动画元素，当前不是正在打开，点击按钮打开
                if(button_canvas === null)
                {
                    console.error('已断开，尝试重连');
                    button.click();
                }
                else
                {
                    console.error(`当前正在打开程序,连接第${reconnect_times}次`);
                }
                //将重连次数加一
                reconnect_times++;
            }
            //检测到按钮处于开启状态
            else
            {
                //将重连次数置零
                reconnect_times = 0;
                console.info('连接正常');
            }
        }
        //设置定时器定时执行检查重连代码
        setInterval(getbutton,timeperiod);
    },waittime);

})();



