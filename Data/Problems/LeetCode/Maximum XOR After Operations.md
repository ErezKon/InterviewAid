# 2317. Maximum XOR After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-xor-after-operations](https://leetcode.com/problems/maximum-xor-after-operations)
**Companies:** Amazon, American Express

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

You are given a **0-indexed** integer array `nums`. In one operation, select **any** non-negative integer `x` and an index `i`, then **update** `nums[i]` to be equal to `nums[i] AND (nums[i] XOR x)`.

Note that `AND` is the bitwise AND operation and `XOR` is the bitwise XOR operation.

Return *the **maximum** possible bitwise XOR of all elements of *`nums`* after applying the operation **any number** of times*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^8`

---

## Examples

**Example 1:**
```
Input: nums = [3,2,4,6]
Output: 7
Explanation: Apply the operation with x = 4 and i = 3, num[3] = 6 AND (6 XOR 4) = 6 AND 2 = 2.
Now, nums = [3, 2, 4, 2] and the bitwise XOR of all the elements = 3 XOR 2 XOR 4 XOR 2 = 7.
It can be shown that 7 is the maximum possible bitwise XOR.
Note that other operations may be used to achieve a bitwise XOR of 7.
```

**Example 2:**
```
Input: nums = [1,2,3,9,2]
Output: 11
Explanation: Apply the operation zero times.
The bitwise XOR of all the elements = 1 XOR 2 XOR 3 XOR 9 XOR 2 = 11.
It can be shown that 11 is the maximum possible bitwise XOR.
```

---

## Key Insight

> The operation `nums[i] AND (nums[i] XOR x)` can **turn off any bit** in `nums[i]` (but never turn on a bit that wasn't there). So for each bit position, if **any** element has that bit set, we can arrange for exactly one element to keep it. The answer is simply the **bitwise OR** of all elements.

---

## Approach

```
FUNCTION maximumXOR(nums):
    result ← 0
    FOR num IN nums DO
        result ← result OR num
    RETURN result
```

**Why OR?** Each bit that appears in any element can be preserved in exactly one element (turn it off in all others). The XOR of a bit appearing exactly once is 1. So every bit present in the OR contributes to the final XOR.

---

## Walkthrough

```
nums = [3, 2, 4, 6]

Binary: 3=011, 2=010, 4=100, 6=110

OR: 011 | 010 | 100 | 110 = 111 = 7

Return 7 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitwise OR | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why can't we turn on new bits?** The AND operation can only clear bits, never set them. So we're limited to bits already present in the original elements.
2. **Why does keeping each bit in exactly one element maximize XOR?** XOR of a bit across multiple elements: odd count → 1, even count → 0. By clearing duplicates, we ensure each bit appears exactly once.
3. **What if the operation could also set bits?** Then the answer would be all 1s up to the highest bit position.

---

## Key Takeaway

> When an operation can only **clear bits**, the maximum XOR equals the **bitwise OR** of all elements — every bit that exists anywhere can contribute exactly once.

---
