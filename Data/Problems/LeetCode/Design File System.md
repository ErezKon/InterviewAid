# 1166. Design File System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-file-system](https://leetcode.com/problems/design-file-system)
**Companies:** Airbnb, Amazon, Atlassian, Capital One, Coinbase, Doordash, Google, Meta, Microsoft, Oracle, Snowflake, Uber

---

## Problem Description

You are asked to design a file system that allows you to create new paths and associate them with different values.

The format of a path is one or more concatenated strings of the form: `/` followed by one or more lowercase English letters. For example, "`/leetcode"` and "`/leetcode/problems"` are valid paths while an empty string `""` and `"/"` are not.

Implement the `FileSystem` class:

- `bool createPath(string path, int value)` Creates a new `path` and associates a `value` to it if possible and returns `true`. Returns `false` if the path **already exists** or its parent path **doesn't exist**.
- `int get(string path)` Returns the value associated with `path` or returns `-1` if the path doesn't exist.

**Constraints:**

- `2 <= path.length <= 100`
- `1 <= value <= 10^9`
- Each `path` is **valid** and consists of lowercase English letters and `'/'`.
- At most `10^4` calls **in total** will be made to `createPath` and `get`.

---

## Approach: Hash Map — O(path length) ✅

```text
CLASS FileSystem:
    CONSTRUCTOR:
        paths = {"": -1}    // root

    FUNCTION createPath(path, value):
        parent = path[:path.rfind('/')]
        IF parent NOT IN paths: RETURN false
        IF path IN paths: RETURN false
        paths[path] = value
        RETURN true

    FUNCTION get(path):
        RETURN paths.get(path, -1)
```

---

## Examples

```
Example 1:
  Input:
  ["FileSystem","createPath","get"]
  [[],["/a",1],["/a"]]
  Output:
  [null,true,1]
  Explanation:
  FileSystem fileSystem = new FileSystem();

  fileSystem.createPath("/a", 1); // return true
  fileSystem.get("/a"); // return 1
```

```
Example 2:
  Input:
  ["FileSystem","createPath","createPath","get","createPath","get"]
  [[],["/leet",1],["/leet/code",2],["/leet/code"],["/c/d",1],["/c"]]
  Output:
  [null,true,true,2,false,-1]
  Explanation:
  FileSystem fileSystem = new FileSystem();

  fileSystem.createPath("/leet", 1); // return true
  fileSystem.createPath("/leet/code", 2); // return true
  fileSystem.get("/leet/code"); // return 2
  fileSystem.createPath("/c/d", 1); // return false because the parent path "/c" doesn't exist.
  fileSystem.get("/c"); // return -1 because this path doesn't exist.
```

---

## Walkthrough

1. **Initialize** – `paths` contains only the root `""`.
2. **createPath("/a",1)** – parent is `""` (exists), `/a` not present → store `paths["/a"] = 1`.
3. **createPath("/a/b",2)** – parent `"/a"` exists, `/a/b` new → store `paths["/a/b"] = 2`.
4. **createPath("/c/d",3)** – parent `"/c"` missing → return `false`.
5. **get("/a")** – lookup returns `1`.
6. **get("/a/b")** – lookup returns `2`.
7. **get("/c")** – not in map → return `-1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(path length) per operation |
| **Space** | O(total paths) |

---

## Key Takeaway

> **Flat hash map with full paths as keys. Validate parent by extracting prefix up to last `/`. Simpler than a trie for this use case since no listing operations are needed.**
