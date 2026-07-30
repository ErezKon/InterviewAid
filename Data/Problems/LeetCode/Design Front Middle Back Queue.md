# 1670. Design Front Middle Back Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-front-middle-back-queue](https://leetcode.com/problems/design-front-middle-back-queue)
**Companies:** Amazon, Citadel

---

## Problem Description

Design a queue supporting push/pop at front, middle, and back. All operations in O(1).

---

## Approach

```text
CLASS FrontMiddleBackQueue:
    // Two deques: first half and second half
    // Maintain: len(first) == len(second) or len(first) == len(second) - 1
    first = deque()
    second = deque()

    FUNCTION balance():
        IF len(first) > len(second):
            second.appendleft(first.pop())
        IF len(second) > len(first) + 1:
            first.append(second.popleft())

    FUNCTION pushFront(val): first.appendleft(val); balance()
    FUNCTION pushMiddle(val): first.append(val); balance()
    FUNCTION pushBack(val): second.append(val); balance()
    FUNCTION popFront():
        IF NOT first AND NOT second: RETURN -1
        IF first:
            val ← first.popleft()
        ELSE:
            val ← second.popleft()
        balance()
        RETURN val
    FUNCTION popMiddle():
        IF NOT first AND NOT second: RETURN -1
        IF len(first) == len(second):
            val ← first.pop()
        ELSE:
            val ← second.popleft()
        balance()
        RETURN val
    FUNCTION popBack():
        IF NOT second AND NOT first: RETURN -1
        IF second:
            val ← second.pop()
        ELSE:
            val ← first.pop()
        balance()
        RETURN val
```

---

## Examples

| Operation | Result |
|-----------|--------|
| `pushFront(1)` | — |
| `pushBack(2)`   | — |
| `pushMiddle(3)` | — |
| `popFront()`    | `1` |
| `popMiddle()`   | `3` |
| `popBack()`     | `2` |

---

## Walkthrough

1. **pushFront(1)** – `first` becomes `[1]`, `second` empty. Balance moves nothing.
2. **pushBack(2)** – `second` becomes `[2]`. Lengths equal, invariant holds.
3. **pushMiddle(3)** – `first.append(3)` → `first` `[1,3]`. Now `len(first)=2`, `len(second)=1`; `balance()` moves last of `first` (`3`) to front of `second`, resulting `first` `[1]`, `second` `[3,2]`.
4. **popFront()** – removes `1` from `first`. After removal `first` empty, `balance()` moves one element from `second` to `first` to keep invariant: `first` `[3]`, `second` `[2]`.
5. **popMiddle()** – lengths equal, so middle is end of `first`; removes `3`. Balance moves `2` to `first`.
6. **popBack()** – removes `2` from `second` (now empty). Queue is empty.

---

## Complexity Analysis

- **Time:** Each operation (`push*`, `pop*`) does O(1) deque operations plus at most one `balance` step, so O(1) amortized.
- **Space:** Stores all elements across two deques, O(n) where n is number of elements.

---

## Key Takeaway

> **Two deques split at the middle with a balance invariant. All push/pop operations are O(1) amortized. Rebalance after each operation to keep halves aligned.**
