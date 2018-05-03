#############

1、 管道 ‘formatMoneyInit ’的使用：

{{num | formatMoneyInit}}

 
2、 管道 ‘parseNumChinese’ 的使用 ,仅支持阿拉伯数字和中文两种语言展示

{{num | parseNumChinese }} 或者
{{num | parseNumChinese:"chinese" }}   

3、JavaScript实现将多位数转换成中文

parseChineseWord(10040505)
