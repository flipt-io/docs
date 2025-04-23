import argparse
import os
import re

def replace_links_in_file(filepath: str, from_path: str, to_path: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'(!?\[.*?\])\((%s(?:/[^)]*)?)\)' % re.escape(from_path.rstrip('/')))
    replaced = pattern.sub(lambda m: f'{m.group(1)}({to_path.rstrip("/")}{m.group(2)[len(from_path.rstrip("/")):]})', content)

    if content != replaced:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(replaced)
        print(f"Updated: {filepath}")

def walk_and_process(root_dir: str, from_path: str, to_path: str):
    for dirpath, _, filenames in os.walk(root_dir):
        for fname in filenames:
            if fname.endswith('.md'):
                replace_links_in_file(os.path.join(dirpath, fname), from_path, to_path)

def main():
    parser = argparse.ArgumentParser(description="Replace markdown links that start at a root path.")
    parser.add_argument('--from', dest='from_path', required=True, help="Root-relative path to replace (e.g., /v1)")
    parser.add_argument('--to', dest='to_path', required=True, help="Replacement path (e.g., /v2)")
    parser.add_argument('--dir', dest='directory', default='.', help="Directory to process recursively (default: current)")
    args = parser.parse_args()

    walk_and_process(args.directory, args.from_path, args.to_path)

if __name__ == '__main__':
    main()


# python linkreplace.py --from /v1 --to /v2 --dir ./docs