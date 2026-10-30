# 3927. Minimize Array Sum Using Divisible Replacements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-array-sum-using-divisible-replacements](https://leetcode.com/problems/minimize-array-sum-using-divisible-replacements)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

You can perform the following operation any number of times:

- Choose two indices `a` and `b` such that `nums[a] % nums[b] == 0`.
- Replace `nums[a]` with `nums[b]`.

Return the **minimum** possible sum of the array after performing any number of operations.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Key Insight

> Greedily divide each element by `k` as many times as possible — each division strictly reduces the value, and there is no benefit to postponing a division.

---

## Approach

```text
FUNCTION minimizeArraySum(nums, k):
    total ← 0
    FOR i ← 0 TO LEN(nums) - 1:
        WHILE nums[i] % k = 0 DO
            nums[i] ← nums[i] / k
        total ← total + nums[i]
    RETURN total
```

---

## 3. Examples

```
Example 1:
  Input: nums = [3,6,2]
  Output: 7
  Explanation:
  - Choose a = 1, b = 2, where nums[a] = 6 and nums[b] = 2. Since 6 % 2 == 0, replace nums[1] with nums[2].
  - The array becomes [3, 2, 2].
  - No further operation reduces the sum. Thus, the final sum is 3 + 2 + 2 = 7.
```

```
Example 2:
  Input: nums = [4,2,8,3]
  Output: 9
  Explanation:
  - Choose a = 0, b = 1, where nums[a] = 4 and nums[b] = 2. Since 4 % 2 == 0, replace nums[0] with nums[1].
  - Choose a = 2, b = 1, where nums[a] = 8 and nums[b] = 2. Since 8 % 2 == 0, replace nums[2] with nums[1].
  - The array becomes [2, 2, 2, 3].
  - No further operation reduces the sum. Thus, the final sum is 2 + 2 + 2 + 3 = 9.
```

```
Example 3:
  Input: nums = [7,5,9]
  Output: 21
  Explanation:
  - There is no pair (a, b) such that nums[a] % nums[b] == 0.
  - Hence, no operation can be performed. The sum remains 7 + 5 + 9 = 21.
```

---

## 4. Walkthrough

Take Example 1 (`nums = [8,4,6]`, `k = 2`).
1. Initialize `total = 0`.
2. Process `nums[0] = 8`:
   - 8 % 2 == 0 → 8/2 = 4
   - 4 % 2 == 0 → 4/2 = 2
   - 2 % 2 == 0 → 2/2 = 1
   - 1 % 2 != 0 → stop. Add 1 to `total` (total = 1).
3. Process `nums[1] = 4`:
   - 4 → 2 → 1 (two divisions). Add 1 (total = 2).
4. Process `nums[2] = 6`:
   - 6 → 3 (one division). Add 3 (total = 5).
5. All elements processed; return `total = 5`.

---

## 5. Complexity Analysis

- **Time:** Each element is divided at most `log_k(value)` times → O(n · log_k(max(nums))).
- **Space:** O(1) extra space.

---

## Key Takeaway

> Repeatedly dividing divisible elements is always optimal; a simple greedy loop yields the minimal possible sum.
