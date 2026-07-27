# 137. Single Number II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/single-number-ii](https://leetcode.com/problems/single-number-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums` where every element appears exactly **three times** except for one element which appears exactly **once**, find that single one.

You must implement a solution with **O(n)** time and **O(1)** extra space.

### Examples

**Example 1:**
- **Input:** `nums = [2,2,3,2]`
- **Output:** `3`

**Example 2:**
- **Input:** `nums = [0,1,0,1,0,1,99]`
- **Output:** `99`

### Constraints

- `1 <= nums.length <= 3 × 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- Each element appears three times except one.

---

## Approach: Bit State Machine — O(n), O(1) ✅

Track each bit position's count mod 3 using two variables:
- `ones` — bits that have appeared 1 (mod 3) times
- `twos` — bits that have appeared 2 (mod 3) times
- When count reaches 3, both reset to 0

```
FUNCTION singleNumber(nums):
    ones = twos = 0
    FOR num IN nums:
        ones = (ones ^ num) & ~twos
        twos = (twos ^ num) & ~ones
    RETURN ones
```

### Walkthrough — `nums = [2,2,3,2]`

| num | ones (before→after) | twos (before→after) |
|-----|---------------------|---------------------|
| 2   | 0 → 2              | 0 → 0              |
| 2   | 2 → 0              | 0 → 2              |
| 3   | 0 → 3              | 2 → 2              |
| 2   | 3 → 3              | 2 → 0 (count=3→reset) |

Wait — let's trace bit by bit for `2 (10₂)`:
- After 1st `2`: ones=10, twos=00 (seen once)
- After 2nd `2`: ones=00, twos=10 (seen twice)
- After `3 (11₂)`: ones=11, twos=00 (3 seen once, bit0 of 2 still in twos)
- After 3rd `2`: ones=01, twos=00 (2's bits clear after 3 times)

Result: `ones = 3`

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-up

- **Alternative:** Count bits at each position across all numbers, take mod 3. More intuitive but uses O(32) space.
- See **Single Number** (LC 136) and **Single Number III** (LC 260).
