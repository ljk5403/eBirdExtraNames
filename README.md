# Add Extra Names for eBird Pages(especially Chinese Name)

# eBird中文注名
在eBird图鉴网站中的学名后加注中文名，使用 IOC 15.1（会定时更新）

[Source Code on Github](https://github.com/ljk5403/eBirdExtraNames)

## 安装：

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/), 手机浏览器推荐使用 [Firefox](https://www.mozilla.org/en-US/firefox/browsers/mobile/android/) 或者 [Via](https://viayoo.com/zh-cn/) (不需要额外安装 Tampermonkey）
2. 转到 [Greasyfork](https://greasyfork.org/en/scripts/495909-ebird-add-chinese-name-near-scientific-name) 网站，选择 "Install this script" 安装
3. 注意eBird一定要到 "Preferences" 中将 "Species Name Display" 修改为 "Both"
4. 访问任意 eBird 图鉴网站测试，如 [Velvet-fronted Nuthatch/绒额䴓](https://ebird.org/species/vefnut1/L1987536)

![](example.png)


## Support for Multi Language

To apply this script to different language, follow this direction:(highly recommended: check out a new branch and push it back when you finished!)
1. In `xlsx_to_js.py`, change the `targetColumn` to the target language, like `"English"`. To know how many language can be supported(by the current IOC file), simply run `py xlsx_to_js.py` and it will print out all possible columns that the IOC file included.
2. Run `py xlsx_to_js.py`, then check `js_nameMap.txt` and see if it is correct.
3. Check `correction.txt`, if there are something that is not needed there(like from other language), delete them.
4. Change the Language discription in `main_template.js` if you prefer.
5. Run `./generator.sh` to generate the `main.js`.
6. Test it with Tempermonkey.


## Bird List Update Log


### 2025/04/23
Bird list from: <https://www.worldbirdnames.org/new/ioc-lists/master-list-2/> "Multilingual Version (v15.1, Excel file XLSX, 7.8Mb)"

Local file: `Multiling IOC 15.1_c.xlsx`


### Before 2025/04/23
Bird list from: <https://www.worldbirdnames.org/new/ioc-lists/master-list-2/> "Multilingual Version (v14.1, Excel file XLSX, 7.8Mb)"


### How to update Bird List

1. Go to <https://www.worldbirdnames.org/new/ioc-lists/master-list-2/>, download the latest `Multilingual Version`
2. Edit the local `xlsx_to_js.py`, change the file name and row name accordingly. Then run `python3 xlsx_to_js.py`, the `js_nameMap.txt` should be updated.
3. Replace everything in `const nameMap = {}` from `main.py` with everything in `js_nameMap.txt`.
