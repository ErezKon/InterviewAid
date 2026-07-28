# 374. Guess Number Higher or Lower

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/guess-number-higher-or-lower](https://leetcode.com/problems/guess-number-higher-or-lower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Samsung, Tcs

---

## 1. Problem Description

Guess a number between 1 and `n`. Use a provided `guess(num)` API that returns -1 (lower), 1 (higher), or 0 (correct).

## 2. Approach

```
FUNCTION guessNumber(n):
    lo, hi = 1, n
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        result = guess(mid)
        IF result == 0: RETURN mid
        ELSE IF result == -1: hi = mid - 1
        ELSE: lo = mid + 1
```

---

## 3. Examples

| n | Output |
|---|--------|
| 10 | 6 |
| 1 | 1 |
| 2 | 1 |

**Explanation:** For `n = 10`, the algorithm guesses `5`, then `8`, then `6` and finds the target.

---

## 4. Walkthrough

Assume the hidden number is `6` and `n = 10`.

1. `lo = 1`, `hi = 10` → `mid = 5`. `guess(5)` returns `1` (higher).
2. Update `lo = 6`. `mid = (6 + 10) / 2 = 8`. `guess(8)` returns `-1` (lower).
3. Update `hi = 7`. `mid = (6 + 7) / 2 = 6`. `guess(6)` returns `0` → return `6`.

---

## 5. Complexity Analysis

- **Time:** `O(log n)` – binary search halves the range each iteration.
- **Space:** `O(1)` – only a few variables are used.

---

## 6. Follow-Up Questions

- How would you modify the solution if the API could also return "too close" indicating the guess is within a certain range of the target?
- Can you design a solution that works when the number range is unknown and you only have the API?

---

## Key Takeaway

> Standard binary search with an API call instead of array access.
