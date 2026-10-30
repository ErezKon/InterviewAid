# 588. Design In-Memory File System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-in-memory-file-system](https://leetcode.com/problems/design-in-memory-file-system)
**Companies:** Amazon, Baidu, Circle, Citadel, Coinbase, Coupang, Doordash, Google, Meta, Microsoft, Netskope, Observeai, Oracle, Shopify, Snowflake, Tiktok, Uber

---

## Problem Description

Design a data structure that simulates an in-memory file system.

Implement the FileSystem class:

- `FileSystem()` Initializes the object of the system.
- `List<String> ls(String path)`
  - If `path` is a file path, returns a list that only contains this file's name.
  - If `path` is a directory path, returns the list of file and directory names **in this directory**.
  The answer should in **lexicographic order**.
- `void mkdir(String path)` Makes a new directory according to the given `path`. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
- `void addContentToFile(String filePath, String content)`
  - If `filePath` does not exist, creates that file containing given `content`.
  - If `filePath` already exists, appends the given `content` to original content.
- `String readContentFromFile(String filePath)` Returns the content in the file at `filePath`.

**Constraints:**
- `1 <= path.length, filePath.length <= 100`
- `path` and `filePath` are absolute paths which begin with `'/'` and do not end with `'/'` except that the path is just `"/"`.
- You can assume that all directory names and file names only contain lowercase letters, and the same names will not exist in the same directory.
- You can assume that all operations will be passed valid parameters, and users will not attempt to retrieve file content or list a directory or file that does not exist.
- You can assume that the parent directory for the file in `addContentToFile` will exist.
- `1 <= content.length <= 50`
- At most `300` calls will be made to `ls`, `mkdir`, `addContentToFile`, and `readContentFromFile`.

---

## Examples

```
Example 1:
  Input:
  ["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
  [[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
  Output:
  [null, [], null, null, ["a"], "hello"]
  Explanation:
  FileSystem fileSystem = new FileSystem();
  fileSystem.ls("/");                         // return []
  fileSystem.mkdir("/a/b/c");
  fileSystem.addContentToFile("/a/b/c/d", "hello");
  fileSystem.ls("/");                         // return ["a"]
  fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"
```

---

## Walkthrough

| Step | Operation | Internal State (Trie Nodes) |
|------|-----------|-----------------------------|
| 1 | `ls("/")` | Root has no children → returns [] |
| 2 | `mkdir("/a/b/c")` | Creates nodes `a` → `b` → `c` under root |
| 3 | `addContentToFile("/a/b/c/d", "hello")` | Creates file node `d` under `c`, sets `isFile=true`, `content="hello"` |
| 4 | `ls("/a/b/c")` | Node `c` has child `d` → returns ["d"] |
| 5 | `readContentFromFile("/a/b/c/d")` | Retrieves `content` of node `d` → "hello" |

The walkthrough shows how the `navigate` helper creates or traverses nodes and how each operation updates or queries the trie.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time (mkdir, addContent, readContent)** | O(L) where L is the length of the path |
| **Time (ls)** | O(K log K) where K is number of children (sorting) |
| **Space** | O(N) total nodes for all directories and files |

---

## Key Takeaway

> **Trie of directory nodes: each node has children map, content string, and isFile flag. `navigate()` helper creates intermediate directories. `ls` returns sorted children or file name.**