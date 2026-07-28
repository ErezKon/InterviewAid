# 1598. Crawler Log Folder

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/crawler-log-folder](https://leetcode.com/problems/crawler-log-folder)
**Companies:** Amazon, Mercari, Meta

---

## Problem Description

Given folder operation logs ("../" = parent, "./" = stay, else = enter child), find the minimum operations to return to the main folder (depth 0).

## Examples

```text
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: After processing the logs, the depth is 2.

Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3
```

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

## Walkthrough

Consider the first example step by step:

| Step | Log   | Depth |
|------|-------|-------|
| 1    | d1/   | 1 |
| 2    | d2/   | 2 |
| 3    | ../   | 1 |
| 4    | d21/  | 2 |
| 5    | ./    | 2 |

The final depth is 2, which is the answer.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Track folder depth as a counter. `../` decrements (min 0), child folder increments, `./` is a no-op. Answer = final depth.**