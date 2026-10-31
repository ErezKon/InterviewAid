# 2206. Divide Array Into Equal Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divide-array-into-equal-pairs](https://leetcode.com/problems/divide-array-into-equal-pairs)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given an integer array `nums` consisting of `2 * n` integers.

You need to divide `nums` into `n` pairs such that:

- Each element belongs to **exactly one** pair.
- The elements present in a pair are **equal**.

Return `true` *if nums can be divided into* `n` *pairs, otherwise return* `false`.

**Constraints:**
- `nums.length == 2 * n`
- `1 <= n <= 500`
- `1 <= nums[i] <= 500`

---

## Examples

```
Example 1:
  Input: nums = [3,2,3,2,2,2]
  Output: true
  Explanation:
  There are 6 elements in nums, so they should be divided into 6 / 2 = 3 pairs.
  If nums is divided into the pairs (2, 2), (3, 3), and (2, 2), it will satisfy all the conditions.
```

```
Example 2:
  Input: nums = [1,2,3,4]
  Output: false
  Explanation:
  There is no way to divide nums into 4 / 2 = 2 pairs such that the pairs satisfy every condition.
```

---

## Approach: Frequency Check ✅

```text
FUNCTION divideArray(nums):
    // Count occurrences of each number
    SET freqMap ← COUNTER(nums)
    // Every count must be even
    FOR each count IN freqMap.values():
        IF count MOD 2 != 0:
            RETURN false
    RETURN true
```

The insight is that a pair of equal numbers requires each distinct value to appear an even number of times.

---

## Walkthrough

Consider the input `[3,3,2,2]`:

1. Build frequency map → `{3:2, 2:2}`.
2. Iterate counts: `2` is even for `3`, `2` is even for `2`.
3. All counts satisfy the even condition → return `true`.

If the input were `[1,2,3,4]`:

1. Frequency map → `{1:1, 2:1, 3:1, 4:1}`.
2. First count `1` is odd → immediately return `false`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass to count frequencies. |
| **Space** | O(n) | Frequency map stores up to n distinct values. |

---

## Follow-Up Questions

- How would you modify the solution if the array length were odd?
- Can you solve the problem in-place without extra space?
- What if pairs must consist of numbers whose sum equals a target value?

---

## Key Takeaway

> **Pairing requires even frequency for every value — a simple Counter check solves the problem in linear time.**