# 2243. Calculate Digit Sum of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-digit-sum-of-a-string](https://leetcode.com/problems/calculate-digit-sum-of-a-string)
**Companies:** Uber

---

## 1. Problem Description

You are given a string `s` consisting of digits and an integer `k`.

A **round** can be completed if the length of `s` is greater than `k`. In one round, do the following:

- **Divide** `s` into **consecutive groups** of size `k` such that the first `k` characters are in the first group, the next `k` characters are in the second group, and so on. **Note** that the size of the last group can be smaller than `k`.
- **Replace** each group of `s` with a string representing the sum of all its digits. For example, `"346"` is replaced with `"13"` because `3 + 4 + 6 = 13`.
- **Merge** consecutive groups together to form a new string. If the length of the string is greater than `k`, repeat from step `1`.

Return `s` *after all rounds have been completed*.

**Constraints:**
- `1 <= s.length <= 100`
- `2 <= k <= 100`
- `s` consists of digits only.

---

## Examples

**Example 1:**
```
Input: s = "11111222223", k = 3
Output: "135"
Explanation: - For the first round, we divide s into groups of size 3: "111", "112", "222", and "23".
  Then we calculate the digit sum of each group: 1 + 1 + 1 = 3, 1 + 1 + 2 = 4, 2 + 2 + 2 = 6, and 2 + 3 = 5.
  So, s becomes "3" + "4" + "6" + "5" = "3465" after the first round.
- For the second round, we divide s into "346" and "5".
  Then we calculate the digit sum of each group: 3 + 4 + 6 = 13, 5 = 5.
  So, s becomes "13" + "5" = "135" after second round.
Now, s.length <= k, so we return "135" as the answer.
```

**Example 2:**
```
Input: s = "00000000", k = 3
Output: "000"
Explanation: We divide s into "000", "000", and "00".
Then we calculate the digit sum of each group: 0 + 0 + 0 = 0, 0 + 0 + 0 = 0, and 0 + 0 = 0.
s becomes "0" + "0" + "0" = "000", whose length is equal to k, so we return "000".
```

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
