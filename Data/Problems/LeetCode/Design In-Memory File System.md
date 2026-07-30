# 588. Design In-Memory File System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-in-memory-file-system](https://leetcode.com/problems/design-in-memory-file-system)
**Companies:** Amazon, Baidu, Circle, Citadel, Coinbase, Coupang, Doordash, Google, Meta, Microsoft, Netskope, Observeai, Oracle, Shopify, Snowflake, Tiktok, Uber

---

## Problem Description

Design an in-memory file system with `ls`, `mkdir`, `addContentToFile`, `readContentFromFile`.

---

## Examples

**Example 1:**
```
FileSystem fs = new FileSystem();
fs.ls("/");                         // returns []
fs.mkdir("/a/b/c");
fs.addContentToFile("/a/b/c/d", "hello");
fs.ls("/a/b/c");                    // returns ["d"]
fs.readContentFromFile("/a/b/c/d"); // returns "hello"
```

**Explanation:** The file system creates nested directories, adds a file with content, lists directory contents, and reads file content.

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