import os  # 用于读写文件
import pandas as pd

referance = 'Multiling IOC 14.1_b.xlsx'
js_nameMap = 'js_nameMap.txt'

referanceDf = pd.read_excel(referance)


# Open a file in write mode
with open(js_nameMap, "w") as file:
    # Iterate over each row in the DataFrame
    for index, row in referanceDf.iterrows():
        # Fetch the elements in "IOC_14.1" and "Chinese" columns
        ioc_value = row["IOC_14.1"]
        chinese_value = row["Chinese"]
        
        # Format the string as "A": "B",
        formatted_string = f'"{ioc_value}": "{chinese_value}",\n'
        
        # Write to the file
        file.write(formatted_string)
