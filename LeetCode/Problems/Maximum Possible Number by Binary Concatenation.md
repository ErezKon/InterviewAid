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

Given an array of 3 integers, concatenate their **binary representations** in some order. Return the **maximum resulting decimal value**.

**Constraints:**
- `nums.length = 3`
- `1 <= nums[i] <= 127`

---

## Examples

**Example 1:**
```
Input:  nums = [1, 2, 3]
Output: 30
Explanation: Binary: "11" + "10" + "1" = "11101" = 29? Try all: "11" + "1" + "10" = "11110" = 30 ✅
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
