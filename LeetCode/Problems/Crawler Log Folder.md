# 1598. Crawler Log Folder

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/crawler-log-folder](https://leetcode.com/problems/crawler-log-folder)
**Companies:** Amazon, Mercari, Meta

---

## Problem Description

Given folder operation logs (`"../"` = parent, `"./"` = stay, else = enter child), find the minimum operations to return to the main folder (depth 0).

---

## Approach

```
FUNCTION minOperations(logs):
    depth = 0
    FOR log IN logs:
        IF log == "../": depth = MAX(0, depth - 1)
        ELSE IF log != "./": depth += 1
    RETURN depth
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Track folder depth as a counter. `../` decrements (min 0), child folder increments, `./` is a no-op. Answer = final depth.**
