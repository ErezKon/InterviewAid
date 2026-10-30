# 1598. Crawler Log Folder

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/crawler-log-folder](https://leetcode.com/problems/crawler-log-folder)
**Companies:** Amazon, Mercari, Meta

---

## Problem Description

The Leetcode file system keeps a log each time some user performs a *change folder* operation.

The operations are described below:

- `"../"` : Move to the parent folder of the current folder. (If you are already in the main folder, **remain in the same folder**).
- `"./"` : Remain in the same folder.
- `"x/"` : Move to the child folder named `x` (This folder is **guaranteed to always exist**).

You are given a list of strings `logs` where `logs[i]` is the operation performed by the user at the `i`-th step.

The file system starts in the main folder, then the operations in `logs` are performed.

Return *the minimum number of operations needed to go back to the main folder after the change folder operations.*

**Constraints:**
- `1 <= logs.length <= 10^3`
- `2 <= logs[i].length <= 10`
- `logs[i]` contains lowercase English letters, digits, `'.'`, and `'/'`.
- `logs[i]` follows the format described in the statement.
- Folder names consist of lowercase English letters and digits.

## Examples

```
Example 1:
  Input: logs = ["d1/","d2/","../","d21/","./"]
  Output: 2
  Explanation: Use this change folder operation "../" 2 times and go back to the main folder.
```

```
Example 2:
  Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
  Output: 3
```

```
Example 3:
  Input: logs = ["d1/","../","../","../"]
  Output: 0
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