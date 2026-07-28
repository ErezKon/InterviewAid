# 645. Set Mismatch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/set-mismatch](https://leetcode.com/problems/set-mismatch)
**Companies:** Amazon, Bloomberg, Criteo, Github, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums` of length `n` where the elements are supposed to be the numbers `1` through `n`, exactly one number is duplicated and exactly one number is missing. Return an array `[duplicate, missing]` representing the duplicated number and the missing number respectively.

---

## Examples

| Input | Output |
|-------|--------|
| `[1,2,2,4]` | `[2,3]` |
| `[1,1]` | `[1,2]` |

*Explanation:* In the first example, `2` appears twice and `3` is absent.

---

## Approach

```text
FUNCTION findErrorNums(nums):
    // Use a hash map to count occurrences
    count ← empty map
    FOR num IN nums:
        IF num IN count:
            count[num] ← count[num] + 1
        ELSE:
            count[num] ← 1
    dup ← 0
    miss ← 0
    FOR i ← 1 TO length(nums):
        IF count[i] == 2:
            dup ← i
        IF count[i] == 0:
            miss ← i
    RETURN [dup, miss]
```

---

## Walkthrough

Consider `nums = [1,2,2,4]`.

1. Build frequency map: `{1:1, 2:2, 4:1}`.
2. Scan `i` from `1` to `4`:
   - `i=1`: count is `1` → nothing.
   - `i=2`: count is `2` → `dup = 2`.
   - `i=3`: count is missing → `miss = 3`.
   - `i=4`: count is `1` → nothing.
3. Return `[2,3]`.

---

## Complexity Analysis

- **Time:** O(n) – one pass to count and one pass to identify duplicate/missing.
- **Space:** O(n) – hash map stores up to `n` entries.

---

## Follow-Up Questions

- How would you solve the problem with O(1) extra space by modifying the input array?
- Can you extend the solution to handle multiple duplicates and missing numbers?
- What if the numbers are not guaranteed to be in the range `1..n`?

---

## Key Takeaway

> A hash map (or counting array) lets you quickly identify the duplicated and missing values by tracking frequencies.
