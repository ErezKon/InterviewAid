# 379. Design Phone Directory

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-phone-directory](https://leetcode.com/problems/design-phone-directory)
**Companies:** Google

---

## Problem Description

Design a phone directory over `[0, maxNumbers)`: `get()` returns any free number (-1 if none), `check(number)` tests availability, `release(number)` frees it.

---

## Examples

| Operation | Result |
|-----------|--------|
| `PhoneDirectory(3)` | — |
| `get()` | `0` (any free number) |
| `get()` | `1` |
| `check(2)` | `true` |
| `release(1)` | — |
| `check(1)` | `true` |

---

## Walkthrough

1. Initialize with `maxNumbers = 3` → available numbers = {0,1,2}.
2. First `get()` pops `0` from the queue, removes from set, returns `0`.
3. Second `get()` pops `1`, returns `1`.
4. `check(2)` looks up `2` in the set → `true`.
5. `release(1)` adds `1` back to both queue and set.
6. `check(1)` now finds `1` in the set → `true`.

The queue maintains allocation order, while the set enables O(1) existence checks and prevents double‑release.

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

## Follow-Up Questions

- How would you modify the design to support allocating the smallest available number?
- How could you make `get()` return a random free number efficiently?
- What changes are needed to persist the directory across process restarts?

---

## Key Takeaway

> **Queue + set combo: queue gives O(1) allocation order, set gives O(1) availability checks and prevents double-release. Classic free-list design.**