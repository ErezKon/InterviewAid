# 645. Set Mismatch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/set-mismatch](https://leetcode.com/problems/set-mismatch)
**Companies:** Amazon, Bloomberg, Criteo, Github, Google, Meta, Microsoft

---

## Problem Description

You have a set of integers `s`, which originally contains all the numbers from `1` to `n`. Unfortunately, due to some error, one of the numbers in `s` got duplicated to another number in the set, which results in **repetition of one** number and **loss of another** number.

You are given an integer array `nums` representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return *them in the form of an array*.

**Constraints:**

- `2 <= nums.length <= 10^4`
- `1 <= nums[i] <= 10^4`

---

## Examples

```
Example 1:
  Input: nums = [1,2,2,4]
  Output: [2,3]
```

```
Example 2:
  Input: nums = [1,1]
  Output: [1,2]
```

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
