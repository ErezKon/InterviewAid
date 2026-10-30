# 3173. Bitwise OR of Adjacent Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-adjacent-elements](https://leetcode.com/problems/bitwise-or-of-adjacent-elements)
**Companies:** Adobe

---

## 1. Problem Description

Given an array `nums` of length `n`, return an array `answer` of length `n - 1` such that `answer[i] = nums[i] | nums[i + 1]` where `|` is the bitwise `OR` operation.

**Constraints:**
- `2 ≤ nums.length ≤ 100`
- `0 ≤ nums[i] ≤ 100`

---

## 2. Approach: Linear Scan — O(n) ✅

```text
FUNCTION orArray(nums):
    result = []
    FOR i FROM 0 TO len(nums) - 1 STEP 2:
        result.ADD(nums[i] | nums[i+1])
    RETURN result
```

---

## 3. Examples

```
Example 1:
  Input: nums = [1,3,7,15]
  Output: [3,7,15]

Example 2:
  Input: nums = [8,4,2]
  Output: [12,6]

Example 3:
  Input: nums = [5,4,9,11]
  Output: [5,13,11]
```

---

## 4. Walkthrough

Take `nums = [1,2,3,4]`.

1. Initialize empty `result`.
2. `i = 0`: compute `1 | 2 = 3`, append → `result = [3]`.
3. `i = 2`: compute `3 | 4 = 7`, append → `result = [3,7]`.
4. Loop ends, return `[3,7]`.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass over the array.
- **Space:** O(n/2) for the output array (ignoring output storage).

---

## 6. Follow-Up Questions

1. How would you modify the solution to handle odd‑length arrays by leaving the last element unchanged?
2. Can you compute the result in‑place without extra space?
3. What if the operation were bitwise AND instead of OR?

---

## Key Takeaway

> Simple pairwise reduction: iterate with step 2 and OR adjacent pairs.
