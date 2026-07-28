# 2843. Count Symmetric Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-symmetric-integers](https://leetcode.com/problems/count-symmetric-integers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

A symmetric integer has an even number of digits, and the sum of the first half of its digits equals the sum of the second half. Count symmetric integers in `[low, high]`.

**Constraints:**
- `1 <= low <= high <= 10^4`

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `low = 1, high = 100` | `9` | Symmetric numbers are `11, 22, 33, 44, 55, 66, 77, 88, 99`. |
| `low = 1200, high = 1300` | `1` | Only `1221` is symmetric in this range. |
| `low = 10, high = 10` | `0` | `10` has odd length, so not symmetric.

---

## Approach

Iterate through the range, check each number’s digit length is even, split the digit string in half, and compare the sums of the two halves.

```text
FUNCTION countSymmetricIntegers(low, high):
    count ← 0
    FOR num ← low TO high DO
        s ← STRING(num)
        IF LENGTH(s) MOD 2 == 0 THEN
            mid ← LENGTH(s) / 2
            leftSum ← SUM( INT(d) FOR d IN s[0:mid] )
            rightSum ← SUM( INT(d) FOR d IN s[mid:] )
            IF leftSum == rightSum THEN
                count ← count + 1
    RETURN count
```

---

## Walkthrough

Take `low = 1200, high = 1300`:

1. `num = 1200` → `"1200"` length 4 (even). `mid = 2`. `leftSum = 1+2 = 3`, `rightSum = 0+0 = 0` → not counted.
2. `num = 1210` → `"1210"`, `leftSum = 1+2 = 3`, `rightSum = 1+0 = 1` → not counted.
3. `num = 1221` → `"1221"`, `leftSum = 1+2 = 3`, `rightSum = 2+1 = 3` → counted, `count = 1`.
4. Continue up to `1300`; no other number satisfies the condition.
5. Return `1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(high - low) — each number is examined once (range ≤ 10⁴) |
| **Space** | O(1) — only a few integer variables |

---

## Follow-Up Questions

* How would you solve this problem if `high` could be as large as `10⁹`? Consider generating symmetric numbers directly instead of brute‑force.
* Can you extend the solution to count numbers where the sum of the first half equals the sum of the second half **plus** a constant `k`?

---

## Key Takeaway

> **When the range is small, a simple brute‑force scan with digit‑sum comparison is sufficient. For larger ranges, generate symmetric numbers analytically.**