# 588. Design In-Memory File System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-in-memory-file-system](https://leetcode.com/problems/design-in-memory-file-system)
**Companies:** Amazon, Baidu, Circle, Citadel, Coinbase, Coupang, Doordash, Google, Meta, Microsoft, Netskope, Observeai, Oracle, Shopify, Snowflake, Tiktok, Uber

---

## Problem Description

Design an in-memory file system with `ls`, `mkdir`, `addContentToFile`, `readContentFromFile`.

---

## Approach: Trie of Directories ✅

```
CLASS FileNode:
    children = {}       // name → FileNode
    content = ""
    isFile = false

CLASS FileSystem:
    CONSTRUCTOR:
        root = new FileNode()

    FUNCTION navigate(path):
        node = root
        IF path == "/": RETURN node
        FOR part IN path.SPLIT("/")[1:]:
            IF part NOT IN node.children:
                node.children[part] = new FileNode()
            node = node.children[part]
        RETURN node

    FUNCTION ls(path):
        node = navigate(path)
        IF node.isFile:
            RETURN [last component of path]
        RETURN SORT(node.children.keys())

    FUNCTION mkdir(path):
        navigate(path)    // creates nodes as needed

    FUNCTION addContentToFile(filePath, content):
        node = navigate(filePath)
        node.isFile = true
        node.content += content

    FUNCTION readContentFromFile(filePath):
        RETURN navigate(filePath).content
```

---

## Key Takeaway

> **Trie of directory nodes: each node has children map, content string, and isFile flag. `navigate()` helper creates intermediate directories. `ls` returns sorted children or file name.**
