# 2549. Count Distinct Numbers on Board

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-distinct-numbers-on-board](https://leetcode.com/problems/count-distinct-numbers-on-board)
**Companies:** Oracle

---

## 1. Problem Description

Start with number `n` on a board. Each day, for every number `x` on the board, if any `1 <= i <= n` satisfies `x % i == 1`, add `i` to the board. After 10^9 days, how many distinct numbers are on the board?

---

## 2. Key Insight

> After the first step, `n % (n-1) == 1`, so `n-1` gets added. Then `(n-1) % (n-2) == 1`, so `n-2` gets added, and so on. Eventually all numbers from `2` to `n` appear. Special case: if `n == 1`, only `1` is on the board.

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION distinctNumbers(n):
    RETURN 1 IF n == 1 ELSE n - 1
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> The chain reaction adds all integers from 2 to n. After enough days, the board contains exactly `{2, 3, ..., n}`, which has `n - 1` elements.
