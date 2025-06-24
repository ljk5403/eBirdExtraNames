import os  # 用于读写文件
import pandas as pd

referance = 'Multiling IOC 15.1_c.xlsx'
js_nameMap = 'js_nameMap.txt'

referanceDf = pd.read_excel(referance)

print("Found Columns: ")
print(referanceDf.columns)

targetColumn="English"
print("Target Column: ", targetColumn)


# Open a file in write mode
with open(js_nameMap, "w") as file:
    # Iterate over each row in the DataFrame
    for index, row in referanceDf.iterrows():
        # Fetch the elements in "IOC_xx.x" and "Chinese" columns
        ioc_value = row["IOC_15.1"]
        chinese_value = row[targetColumn]
        # Format the string as "A": "B",
        formatted_string = f'"{ioc_value}": "{chinese_value}",\n'
        # Write to the file
        file.write(formatted_string)
    print("JS namemap file for ",targetColumn," is generated:", js_nameMap)
