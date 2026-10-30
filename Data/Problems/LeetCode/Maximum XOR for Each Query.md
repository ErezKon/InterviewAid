# 1829. Maximum XOR for Each Query

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-xor-for-each-query](https://leetcode.com/problems/maximum-xor-for-each-query)
**Companies:** Bloomberg, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **sorted** array `nums` of `n` non-negative integers and an integer `maximumBit`. You want to perform the following query `n` **times**:

- Find a non-negative integer `k < 2^maximumBit` such that `nums[0] XOR nums[1] XOR ... XOR nums[nums.length-1] XOR k` is **maximized**. `k` is the answer to the `i^th` query.
- Remove the **last **element from the current array `nums`.

Return *an array* `answer`*, where *`answer[i]`* is the answer to the *`i^th`* query*.

**Constraints:**
- `nums.length == n`
- `1 <= n <= 10^5`
- `1 <= maximumBit <= 20`
- `0 <= nums[i] < 2^maximumBit`
- `nums` is sorted in **ascending** order.

---

## Examples

**Example 1:**
```
Input: nums = [0,1,1,3], maximumBit = 2
Output: [0,3,2,3]
Explanation: The queries are answered as follows:
1^st query: nums = [0,1,1,3], k = 0 since 0 XOR 1 XOR 1 XOR 3 XOR 0 = 3.
2^nd query: nums = [0,1,1], k = 3 since 0 XOR 1 XOR 1 XOR 3 = 3.
3^rd query: nums = [0,1], k = 2 since 0 XOR 1 XOR 2 = 3.
4^th query: nums = [0], k = 3 since 0 XOR 3 = 3.
```

**Example 2:**
```
Input: nums = [2,3,4,7], maximumBit = 3
Output: [5,2,6,5]
Explanation: The queries are answered as follows:
1^st query: nums = [2,3,4,7], k = 5 since 2 XOR 3 XOR 4 XOR 7 XOR 5 = 7.
2^nd query: nums = [2,3,4], k = 2 since 2 XOR 3 XOR 4 XOR 2 = 7.
3^rd query: nums = [2,3], k = 6 since 2 XOR 3 XOR 6 = 7.
4^th query: nums = [2], k = 5 since 2 XOR 5 = 7.
```

**Example 3:**
```
Input: nums = [0,1,2,2,5,7], maximumBit = 3
Output: [4,3,6,4,6,7]
```

---

## Key Insight

> To maximize `totalXOR XOR k`, we need `k` to flip all bits of `totalXOR` within the `maximumBit` range. So `k = totalXOR XOR mask` where `mask = 2^maximumBit - 1`. As we remove elements from the end, just XOR out the last element to update `totalXOR`.

---

## Approach

```
FUNCTION getMaximumXor(nums, maximumBit):
    mask ← (1 << maximumBit) - 1
    totalXOR ← 0
    FOR num IN nums DO
        totalXOR ← totalXOR XOR num

    result ← []
    FOR i ← LEN(nums) - 1 DOWN TO 0 DO
        result.APPEND(totalXOR XOR mask)
        totalXOR ← totalXOR XOR nums[i]    // Remove last element

    RETURN result
```

---

## Walkthrough

```
nums = [0, 1, 1, 3], maximumBit = 2, mask = 3 (binary 11)

totalXOR = 0^1^1^3 = 3 (binary 11)

Query 1: k = 3 XOR 3 = 0.  Remove nums[3]=3 → totalXOR = 3^3 = 0
Query 2: k = 0 XOR 3 = 3.  Remove nums[2]=1 → totalXOR = 0^1 = 1
Query 3: k = 1 XOR 3 = 2.  Remove nums[1]=1 → totalXOR = 1^1 = 0
Query 4: k = 0 XOR 3 = 3.  Remove nums[0]=0 → done

Result: [0, 3, 2, 3] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix XOR + bit flip | **O(n)** | **O(n)** for output |

---

## Follow-Up Questions

1. **Why XOR with the mask?** XOR with all-1s mask flips every bit, giving the complement within the allowed range — exactly the value that maximizes the total.
2. **Why process in reverse?** Each query removes the last element, so we process from right to left, XOR-ing out the removed element.
3. **What if maximumBit varies per query?** Compute a different mask per query.

---

## Key Takeaway

> **XOR complement within a bit mask** — to maximize `A XOR k`, set `k = A XOR mask` where mask has all allowed bits set. Combined with cumulative XOR, this gives an O(n) solution.

---
