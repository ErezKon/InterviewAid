# 379. Design Phone Directory

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-phone-directory](https://leetcode.com/problems/design-phone-directory)
**Companies:** Google

---

## Problem Description

Design a phone directory over `[0, maxNumbers)`: `get()` returns any free number (-1 if none), `check(number)` tests availability, `release(number)` frees it.

---

## Approach

```
CLASS PhoneDirectory:
    CONSTRUCTOR(maxNumbers):
        available = deque(range(maxNumbers))
        availableSet = SET(range(maxNumbers))

    FUNCTION get():
        IF NOT available: RETURN -1
        num = available.POPLEFT()
        availableSet.REMOVE(num)
        RETURN num

    FUNCTION check(number):
        RETURN number IN availableSet

    FUNCTION release(number):
        IF number NOT IN availableSet:
            availableSet.ADD(number)
            available.APPEND(number)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) all operations |
| **Space** | O(maxNumbers) |

---

## Key Takeaway

> **Queue + set combo: queue gives O(1) allocation order, set gives O(1) availability checks and prevents double-release. Classic free-list design.**
