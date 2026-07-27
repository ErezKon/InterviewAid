# 1630. Arithmetic Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/arithmetic-subarrays](https://leetcode.com/problems/arithmetic-subarrays)
**Companies:** Google

---

## 1. Problem Description

Given an array `nums` and queries `[l, r]`, for each query determine if the subarray `nums[l..r]` can be rearranged to form an arithmetic sequence.

---

## 2. Key Insight

> For each query, extract the subarray, sort it (or use min/max + set for O(n) check), and verify constant differences.

---

## 3. Approach: Sort Each Subarray — O(q × m log m) ✅

```
FUNCTION checkArithmeticSubarrays(nums, l, r):
    result = []
    FOR i FROM 0 TO len(l) - 1:
        sub = nums[l[i]..r[i]] (sorted copy)
        SORT sub
        diff = sub[1] - sub[0]
        isArith = ALL(sub[j] - sub[j-1] == diff for j in 1..len(sub)-1)
        result.ADD(isArith)
    RETURN result
```

**O(m) alternative per query:** find min, max, check `(max-min) % (m-1) == 0`, then verify all expected values exist via a set.

| Time | Space |
|------|-------|
| O(q × m log m) or O(q × m) | O(m) |

---

## Key Takeaway

> An arithmetic sequence check boils down to: sort and verify constant difference, or use min/max/set for linear time without sorting.
