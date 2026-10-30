# 3309. Maximum Possible Number by Binary Concatenation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-possible-number-by-binary-concatenation](https://leetcode.com/problems/maximum-possible-number-by-binary-concatenation)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array of integers `nums` of size 3.

Return the **maximum** possible number whose *binary representation* can be formed by **concatenating** the *binary representation* of **all** elements in `nums` in some order.

**Note** that the binary representation of any number *does not* contain leading zeros.

**Constraints:**
- `nums.length == 3`
- `1 <= nums[i] <= 127`

---

## Examples

```
Example 1:
  Input: nums = [1,2,3]
  Output: 30
  Explanation: Concatenate the numbers in the order [3, 1, 2] to get the result "11110", which is the binary representation of 30.
```

```
Example 2:
  Input: nums = [2,8,16]
  Output: 1296
  Explanation: Concatenate the numbers in the order [2, 8, 16] to get the result "10100010000", which is the binary representation of 1296.
```

---

## Key Insight

> Only 3! = 6 permutations. Try all and pick the maximum.

---

## Approach

```
FUNCTION maxGoodNumber(nums)
    best ← 0
    FOR each permutation (a, b, c) of nums DO
        binary ← concat(bin(a), bin(b), bin(c))
        best ← MAX(best, parseInt(binary, 2))
    RETURN best
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(1)** — 6 permutations × constant work |
| Space  | **O(1)** — constant |

---

## Key Takeaway

> **Brute-force all permutations** — with only 3 elements, enumerate all 6 orderings and pick the max. No optimization needed.
