# 967. Numbers With Same Consecutive Differences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/numbers-with-same-consecutive-differences](https://leetcode.com/problems/numbers-with-same-consecutive-differences)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Tekion

---

## Problem Description
Given two integers `n` (number of digits) and `k` (absolute difference), return all `n`‑digit positive integers such that the absolute difference between every two consecutive digits is exactly `k`. Leading zeros are not allowed.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3, k = 7` | `[181,292,707,818,929]` | Each number’s consecutive digits differ by 7. |
| `n = 2, k = 0` | `[11,22,33,44,55,66,77,88,99]` | Difference 0 means repeated same digit. |
| `n = 1, k = 5` | `[0,1,2,3,4,5,6,7,8,9]` | Single‑digit numbers are all valid.

## Approach
**Breadth‑First Construction**
Start from all one‑digit numbers `1‑9` (or `0` when `n==1`). For each step, append a digit that is `k` away from the last digit.
1. Use a list `curr` for numbers of current length.
2. For each number, compute `lastDigit = num % 10`.
3. If `lastDigit + k ≤ 9`, create `num*10 + lastDigit + k`.
4. If `k != 0` and `lastDigit - k ≥ 0`, create `num*10 + lastDigit - k`.
5. Replace `curr` with the newly generated list and repeat until length `n`.

```text
FUNCTION numsSameConsecDiff(n, k):
    IF n == 1:
        RETURN LIST(0 TO 9)
    curr ← LIST(1 TO 9)  // start with non‑zero leading digit
    FOR step FROM 1 TO n-1:
        next ← []
        FOR num IN curr:
            lastDigit ← num MOD 10
            IF lastDigit + k ≤ 9:
                APPEND(num * 10 + lastDigit + k) TO next
            IF k ≠ 0 AND lastDigit - k ≥ 0:
                APPEND(num * 10 + lastDigit - k) TO next
        curr ← next
    RETURN curr
```

## Walkthrough
For `n = 3, k = 7`:
| Step | Current List | New Numbers Added |
|------|--------------|-------------------|
| Init | `[1,2,3,4,5,6,7,8,9]` | – |
| 1st iteration | `[1,2,3,4,5,6,7,8,9]` | From `1` → `18`; `2` → `29`; `3` → `30` (invalid) … resulting `[18,29,70,81,92]` |
| 2nd iteration | `[18,29,70,81,92]` | Extend each: `18` → `181`; `29` → `292`; `70` → `707`; `81` → `818`; `92` → `929` |
Result = `[181,292,707,818,929]`.

## Complexity Analysis
- Time: `O(9 * 2^{n-1})` in worst case, but bounded by at most `9 * 2^{n-1}` generated numbers.
- Space: `O(9 * 2^{n-1})` for storing current level numbers.

## Follow‑Up Questions
1. How would you modify the algorithm to return numbers in sorted order without an extra sort step?
2. Can you adapt the solution to count the numbers instead of listing them, using DP?
3. What changes are needed if leading zeros are allowed for `n > 1`?

## Key Takeaway
Iteratively building numbers level by level ensures the consecutive‑difference constraint is maintained, yielding a simple BFS‑style construction.
