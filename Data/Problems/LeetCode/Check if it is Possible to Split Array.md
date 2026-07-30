# 2811. Check if it is Possible to Split Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-possible-to-split-array](https://leetcode.com/problems/check-if-it-is-possible-to-split-array)
**Companies:** Moneylion

---

## 1. Problem Description

Given an array `nums` and integer `m`, you can split the array by removing a subarray of length ≥ 2 whose sum ≥ `m` (or the full array has length ≤ 2). Determine if you can split it down to single elements.

---

## 2. Key Insight

> If `n ≤ 2`, always true. Otherwise, we need at least one pair of adjacent elements with sum ≥ `m`. That pair can always be the last to split, and everything else can be peeled off one element at a time.

---

## 3. Approach: Check Adjacent Pairs — O(n) ✅

```text
FUNCTION canSplitArray(nums, m):
    IF len(nums) <= 2: RETURN true
    FOR i FROM 0 TO len(nums) - 2:
        IF nums[i] + nums[i+1] >= m:
            RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,2,3,4], m = 5
Output: true
Explanation: The adjacent pair (2,3) sums to 5, so we can split using that pair and eventually isolate all elements.
```

**Example 2:**
```
Input: nums = [1,1,1,1], m = 3
Output: false
Explanation: No adjacent pair reaches sum 3, thus we cannot split the array down to single elements.
```

---

## 5. Walkthrough

Consider `nums = [1,2,3,4]`, `m = 5`.
| Step | Action | Remaining Array |
|------|--------|-----------------|
| 1 | Check adjacent pairs: (1,2)=3, (2,3)=5 → found ≥5 | `[1,2,3,4]` |
| 2 | Use pair (2,3) as final split. Peel off left element 1 → `[2,3,4]` |
| 3 | Peel off right element 4 → `[2,3]` |
| 4 | Split `[2,3]` (sum=5) into `[2]` and `[3]` → all singletons achieved.

---

## 6. Complexity Analysis

- **Time Complexity:** O(n) – one pass to check adjacent sums.
- **Space Complexity:** O(1) – only constant extra variables.

---

## 7. Follow-Up Questions

- How would the solution change if the subarray length requirement were ≥ k instead of 2?
- Can we extend the approach to handle circular arrays where the end connects to the start?
- What if we need to return the minimum number of splits required?

---

## Key Takeaway

> The splitting problem reduces to: does any adjacent pair sum to ≥ `m`? If so, we can always isolate elements by peeling from the ends, keeping that valid pair until last.
