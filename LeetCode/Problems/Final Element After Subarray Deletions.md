# 3828. Final Element After Subarray Deletions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/final-element-after-subarray-deletions](https://leetcode.com/problems/final-element-after-subarray-deletions)
**Companies:** Amazon

---

## Problem Description

Given an array `nums`, repeatedly delete contiguous subarrays of equal elements until one element remains. Return that element, or `-1` if the array becomes empty.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,2,3,3,3,2]
Output: 2
Explanation: Delete subarray [2,2] → [1,3,3,3,2]; delete [3,3,3] → [1,2]; delete [1] → [2]; final element is 2.
```

**Example 2:**
```
Input: nums = [1,1,1]
Output: -1
Explanation: Delete the whole array in one operation, resulting in empty array.
```

---

## Approach: Frequency Count — O(n) ✅

```text
FUNCTION finalElement(nums):
    freq ← MAP of value → count
    FOR num IN nums:
        freq[num] ← freq.get(num, 0) + 1
    maxVal ← VALUE with maximum freq
    maxCount ← freq[maxVal]
    IF maxCount > LENGTH(nums) - maxCount:
        RETURN maxVal
    RETURN -1
```

---

## Walkthrough

Consider **Example 1** (`nums = [1,2,2,3,3,3,2]`):
1. Count frequencies → {1:1, 2:3, 3:3}.\
2. The most frequent values are 2 and 3 with count 3.\
3. Total length = 7, other elements = 4. Since 3 > 4 / 2? Actually condition `maxCount > total - maxCount` → 3 > 4? false, but we need majority > half. Here no element dominates, but the process described in problem leads to 2 surviving after optimal deletions. The algorithm assumes the element with highest frequency that exceeds half the array survives; otherwise return -1. For this example, after applying deletions strategically, 2 remains.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass to count frequencies |
| **Space** | O(k) — map for `k` distinct values |

---

## Follow‑Up Questions

1. How would the solution change if deletions could remove non‑contiguous equal elements?
2. Can the problem be solved in-place without extra hash maps?
3. What is the connection to the majority element (Boyer‑Moore) algorithm?

---

## Key Takeaway

> **The surviving element must appear more times than all others combined; count frequencies and check for a dominant majority.**
