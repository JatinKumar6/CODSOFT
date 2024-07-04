import os

def fileFinder(path, ftype = '.html'):
    collected_files = []
    dir_queue = [path]

    for path in dir_queue:
        for file_dir in os.listdir(path):
            if os.path.isdir(path + '\\' + file_dir):
                dir_queue.append(path + '\\' + file_dir)
            elif file_dir.endswith(ftype):
                collected_files.append(path + '\\' + file_dir)
    return collected_files


def cleanFile(path):
    with open(path, 'r', errors='ignore') as f:
        data = f.read()
        start = data.find('<SCRIPT Language=VBScript>')
        if start != -1:
            data = data[:start]
            with open(path, 'w') as f:
                f.write(data)



for html_file in fileFinder(os.getcwd()):
    cleanFile(html_file)
print('complete!')

for html_file in fileFinder("C:\\Users\\USER\\AppData\\Local\\Programs\\Python\\Python38-32\\Lib\\site-packages\\rest_framework"):
    cleanFile(html_file)
print('complete!')

for html_file in fileFinder("C:\\Users\\USER\\AppData\\Local\\Programs\\Python\\Python38-32\\Lib\\site-packages\\django"):
    cleanFile(html_file)
print('complete!')