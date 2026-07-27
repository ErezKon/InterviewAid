# 259. 3Sum Smaller

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/3sum-smaller](https://leetcode.com/problems/3sum-smaller)
**Companies:** Google, Ibm, Meta, Microsoft, Oracle, Paypal, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Two Pointers — O(n²) ✅](#4-approach-sort--two-pointers--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of `n` integers `nums` and an integer `target`, find the number of index triplets `i, j, k` with `0 ≤ i < j < k < n` that satisfy `nums[i] + nums[j] + nums[k] < target`.

**Constraints:**
- `n == nums.length`
- `0 ≤ n ≤ 3500`
- `-100 ≤ nums[i] ≤ 100`
- `-100 ≤ target ≤ 100`

---

## 2. Examples

```
Example 1:
  Input:  nums = [-2, 0, 1, 3], target = 2
  Output: 2
  Explanation: [-2, 0, 1] sum=-1 < 2 ✓
               [-2, 0, 3] sum=1 < 2 ✓
               (all other triplets have sum ≥ 2)

Example 2:
  Input:  nums = [], target = 0
  Output: 0
```

---

## 3. Key Insight

> After sorting, if `nums[i] + nums[lo] + nums[hi] < target`, then **all** pairs `(lo, lo+1), (lo, lo+2), ..., (lo, hi)` also satisfy the condition (since `nums[lo+1..hi]` are all ≤ `nums[hi]`). So we can add `hi - lo` to the count at once instead of iterating.

---

## 4. Approach: Sort + Two Pointers — O(n²) ✅

```
FUNCTION threeSumSmaller(nums, target):
    SORT nums
    count = 0
    FOR i ← 0 TO n - 3:
        lo, hi = i + 1, n - 1
        WHILE lo < hi:
            IF nums[i] + nums[lo] + nums[hi] < target:
                count += hi - lo    // all pairs (lo, lo+1..hi) work
                lo += 1
            ELSE:
                hi -= 1
    RETURN count
```

---

## 5. Walkthrough

```
nums = [-2, 0, 1, 3], target = 2
sorted = [-2, 0, 1, 3]

i=0: nums[0]=-2
  lo=1, hi=3: -2+0+3 = 1 < 2 → count += 3-1 = 2, lo=2
  lo=2, hi=3: -2+1+3 = 2 ≥ 2 → hi=2, lo >= hi → done

i=1: nums[1]=0
  lo=2, hi=3: 0+1+3 = 4 ≥ 2 → hi=2, lo >= hi → done

Result: 2 ✅
  Triplets: [-2,0,1] and [-2,0,3]
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — sort + nested two-pointer scan |
| **Space** | O(1) extra |

---

## 7. Follow-Up Questions

### 7.1 Why can we add `hi - lo` at once?

Array is sorted. If `nums[i] + nums[lo] + nums[hi] < target`, then for any `k` where `lo < k ≤ hi`, `nums[k] ≤ nums[hi]`, so `nums[i] + nums[lo] + nums[k] < target` too. That's `hi - lo` valid pairs with `lo` fixed.

### 7.2 How does this relate to 3Sum?

| Variant | Goal | On match |
|---------|------|----------|
| 3Sum | Find all sums == 0 | Collect triplet, skip dups |
| 3Sum Closest | Minimize \|sum - target\| | Track best |
| **3Sum Smaller** | Count sums < target | Add `hi - lo` |

---

## 8. Key Takeaway

> The critical trick is the **batch counting**: when `sum < target`, all `hi - lo` pairs with the current `lo` are valid. This avoids an inner loop and keeps the solution at O(n²).
