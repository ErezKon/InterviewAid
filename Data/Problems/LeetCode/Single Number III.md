# 260. Single Number III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/single-number-iii](https://leetcode.com/problems/single-number-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Siemens, Zomato

---

## Problem Description

Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

**Constraints:**
- `2 <= nums.length <= 3 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Each integer in `nums` will appear twice, only two integers will appear once.

**Examples:**

**Example 1:**
```
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.
```

**Example 2:**
```
Input: nums = [-1,0]
Output: [-1,0]
```

**Example 3:**
```
Input: nums = [0,1]
Output: [1,0]
```

---

## Approach: Bit Manipulation — O(n), O(1) ✅

1. XOR all numbers → result is `a ^ b` (the two unique numbers XORed together).
2. Find any bit where they differ (`diffBit = xor & -xor` gives the lowest set bit).
3. Partition all numbers by that bit and XOR each group separately.

```
FUNCTION singleNumber(nums):
    xor = 0
    FOR num IN nums: xor ^= num    // xor = a ^ b

    // Find any set bit (difference between a and b)
    diffBit = xor & (-xor)    // lowest set bit

    a = b = 0
    FOR num IN nums:
        IF num & diffBit: a ^= num
        ELSE: b ^= num

    RETURN [a, b]
```

### Walkthrough — `nums = [1,2,1,3,2,5]`

- XOR all: `1^2^1^3^2^5 = 3^5 = 6 (110₂)`
- `diffBit = 6 & -6 = 2 (010₂)`
- Partition by bit 1:
  - Bit set: `{2, 3, 2}` → XOR = `3`
  - Bit unset: `{1, 1, 5}` → XOR = `5`

Result: `[3, 5]`

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-up

- See **Single Number** (LC 136) for one unique element.
- See **Single Number II** (LC 137) for every element appearing three times except one.
