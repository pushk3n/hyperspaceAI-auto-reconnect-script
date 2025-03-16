# hyperspaceAI-auto-reconnect-script
An auto reconnct script for hyperspaceAI web powered by javascript 

一个hyperspaceAI 网页端自动重连脚本,用JavaScript撰写

#########################################################

使用说明:
将tampermonkey-backup-chrome文件导入到您的tampermonkey扩展当中,将其启用.

或者您可以自行创建一个tampermonkey扩展,并将main.js内的内容粘贴到您的脚本中.

Instructions:
Import the tampermonkey-backup-chrome file into your tampermonkey extension to enable it.

Or you can create a tampermonkey extension yourself and paste the contents of main.js into your script.

#########################################################

说明:脚本会每隔两秒钟检查一次节点的连接情况,若断开则自动点击连接按钮,当检测次数达到30次以上时将会刷新页面(所以强烈推荐您配合tampermonkey来使用).

Note: The script will check the connection status of the node every two minutes. If it is disconnected, it will automatically click the connect button. When the number of detections reaches 30 or more, the page will be refreshed (so it is strongly recommended that you use it with tampermonkey).

