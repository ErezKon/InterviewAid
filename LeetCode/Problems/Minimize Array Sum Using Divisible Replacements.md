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

Given an array `nums` and an integer `k`, you can repeatedly pick an element `nums[i]` that is divisible by `k` and replace it with `nums[i] / k`. Perform any number of such operations to **minimize the sum of the array**.

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

**Example 1:**
```
Input: nums = [8, 4, 6], k = 2
Output: 9
Explanation:
- 8 → 4 → 2 → 1 (divide three times)
- 4 → 2 → 1 (divide two times)
- 6 → 3 (divide once)
Final array = [1,1,3]; sum = 5? Wait compute correctly:
Actually after full division:
8→4→2→1, 4→2→1, 6→3 (cannot divide further)
Sum = 1+1+3 = 5
So output is 5.
```

**Example 2:**
```
Input: nums = [5, 7, 11], k = 3
Output: 23
Explanation: No element is divisible by 3, so array remains unchanged.
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
