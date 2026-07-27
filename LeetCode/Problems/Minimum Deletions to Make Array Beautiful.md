# 2216. Minimum Deletions to Make Array Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful](https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Scan — O(n)](#approach-greedy-scan--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

An array is **beautiful** if:
1. Its length is even.
2. For every pair at even index `i`, `nums[i] != nums[i+1]`.

Given an array `nums`, return the **minimum number of deletions** to make it beautiful.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: nums = [1,1,2,3,5]
Output: 1
Explanation: Delete nums[0] → [1,2,3,5]. Pairs: (1,2) and (3,5) — all different. Length 4 (even).
```

**Example 2:**
```
Input: nums = [1,1,2,2,3,3]
Output: 2
Explanation: Delete nums[0] and nums[2] → [1,2,3,3] then another del... 
Actually: [1,1,2,2,3,3] → delete first 1 → [1,2,2,3,3] → delete first 2 → [1,2,3,3] → pairs (1,2),(3,3) bad.
Better approach: greedily skip equal pairs.
```

---

## Key Insight

> Scan left to right, building pairs. When the current pair has equal elements, skip (delete) the current element. After scanning, if the result has odd length, drop the last element.

---

## Approach: Greedy Scan — O(n) ✅

```
FUNCTION minDeletion(nums):
    deletions ← 0
    i ← 0
    n ← len(nums)

    WHILE i < n - 1:
        IF nums[i] == nums[i + 1 - (deletions % 2 != 0 ? 1 : 0)]:
            // Simpler: track effective position
        ...

    // Cleaner approach:
    result ← []
    FOR num IN nums:
        IF len(result) % 2 == 1 AND result[-1] == num:
            deletions ← deletions + 1    // skip this element
        ELSE:
            result.APPEND(num)

    // Make length even
    IF len(result) % 2 == 1:
        deletions ← deletions + 1

    RETURN deletions
```

---

## Walkthrough

```
nums = [1, 1, 2, 3, 5]
```

| Step | num | result (len) | Action | deletions |
|------|-----|-------------|--------|-----------|
| 1 | 1 | [] (0, even) | Append 1 | 0 |
| 2 | 1 | [1] (1, odd) | 1==1, skip | 1 |
| 3 | 2 | [1] (1, odd) | 1≠2, append | 1 |
| 4 | 3 | [1,2] (2, even) | Append 3 | 1 |
| 5 | 5 | [1,2,3] (3, odd) | 3≠5, append | 1 |

Final: result=[1,2,3,5], length 4 (even) → **1** deletion ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — can track without building result array |

---

## Follow-Up Questions

1. **Why greedy works?** Deleting early when a pair violation occurs is never worse than delaying — the violation must be resolved, and skipping now doesn't prevent future valid pairs.
2. **Can we do this in-place?** Yes — just track the effective length instead of building a result array.
3. **What if the condition were nums[i] < nums[i+1] for pairs?** Then you'd need a more careful greedy or DP approach.

---

## Key Takeaway

> For pair-based array constraints, **greedily skip elements that violate the current pair** and handle the even-length requirement at the end.
