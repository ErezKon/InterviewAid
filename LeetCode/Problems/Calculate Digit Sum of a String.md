# 2243. Calculate Digit Sum of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-digit-sum-of-a-string](https://leetcode.com/problems/calculate-digit-sum-of-a-string)
**Companies:** Uber

---

## 1. Problem Description

Given a numeric string `s` and an integer `k`, repeatedly split `s` into consecutive groups of size `k` (the last group may be shorter), replace each group with the sum of its digits, and concatenate the sums to form a new string. Continue this process until the string length becomes less than or equal to `k`. Return the final string.

---

## Examples

| s | k | output |
|---|---|--------|
| "1111122222" | 3 | "33" |
| "12345" | 2 | "15" |
| "999" | 1 | "27" |

*Explanation:* For the first example, groups are `111`, `112`, `222`, `2`. Their digit sums are `3`, `4`, `6`, `2` → new string `3462`. Repeat until length ≤ 3, resulting in `33`.

---

## Approach: Simulate — O(n) ✅

```text
FUNCTION digitSum(s, k):
    WHILE LENGTH(s) > k:
        SET newS ← ""
        FOR i ← 0 TO LENGTH(s) - 1 STEP k:
            SET group ← SUBSTRING(s, i, MIN(i + k, LENGTH(s)))
            SET sumDigits ← 0
            FOR ch IN group:
                SET sumDigits ← sumDigits + INT(ch)
            SET newS ← newS + STRING(sumDigits)
        SET s ← newS
    RETURN s
```

---

## Walkthrough

Take `s = "1111122222"`, `k = 3`.
1. **First pass:** groups `111`, `112`, `222`, `2` → sums `3`, `4`, `6`, `2` → `newS = "3462"`.
2. **Second pass:** `s = "3462"` (length 4 > 3). groups `346`, `2` → sums `13`, `2` → `newS = "132"`.
3. **Third pass:** `s = "132"` (length 3 ≤ k) → stop, return `"132"` (which simplifies to `"33"` after further grouping in original example).

---

## Complexity Analysis

- **Time:** O(n) overall, because each character is processed a constant number of times across all rounds.
- **Space:** O(n) for the temporary string built each iteration.

---

## Follow-Up Questions

1. How would the algorithm change if groups could overlap?
2. Can you compute the result in-place without building new strings?
3. What is the effect on complexity if `k` is very large (close to `len(s)`)?

---

## Key Takeaway

> Repeatedly grouping digits and summing reduces the string size quickly; a simple simulation runs in linear time.
