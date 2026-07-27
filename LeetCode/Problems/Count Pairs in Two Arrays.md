# 1885. Count Pairs in Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-pairs-in-two-arrays](https://leetcode.com/problems/count-pairs-in-two-arrays)
**Companies:** Shopee, Teradata

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two integer arrays `nums1` and `nums2` of equal length `n`, count the number of pairs `(i, j)` where `i < j` and `nums1[i] + nums1[j] > nums2[i] + nums2[j]`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `1 <= nums1[i], nums2[i] <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `nums1 = [2,1,2,1], nums2 = [1,2,1,2]`
- **Output:** `1`
- **Explanation:** Only pair (0,2): nums1[0]+nums1[2]=4 > nums2[0]+nums2[2]=2.

**Example 2:**
- **Input:** `nums1 = [1,10,6,2], nums2 = [1,4,1,5]`
- **Output:** `5`

---

## Key Insight

Rearrange the inequality:
```
nums1[i] + nums1[j] > nums2[i] + nums2[j]
⟹ (nums1[i] - nums2[i]) + (nums1[j] - nums2[j]) > 0
```

Define `diff[i] = nums1[i] - nums2[i]`. Now count pairs `(i, j)` where `diff[i] + diff[j] > 0`. Sort `diff` and use two pointers — the pair indices don't matter since we just need the count.

---

## Approach

```
FUNCTION countPairs(nums1, nums2):
    n = LENGTH(nums1)
    diff = [nums1[i] - nums2[i] FOR i ← 0 TO n-1]
    SORT(diff)

    left = 0; right = n - 1
    count = 0

    WHILE left < right DO
        IF diff[left] + diff[right] > 0 THEN
            count += right - left    // all pairs (left, left+1..right) work
            right -= 1
        ELSE
            left += 1

    RETURN count
```

---

## Walkthrough

**Input:** `nums1 = [1,10,6,2], nums2 = [1,4,1,5]`

```
diff = [0, 6, 5, -3]
sorted diff = [-3, 0, 5, 6]
```

| Step | left | right | diff[left]+diff[right] | Action | count |
|---|---|---|---|---|---|
| 1 | 0 | 3 | -3+6=3 > 0 | count += 3 (pairs: 0-3, 1-3, 2-3), right=2 | 3 |
| 2 | 0 | 2 | -3+5=2 > 0 | count += 2 (pairs: 0-2, 1-2), right=1 | 5 |
| 3 | 0 | 1 | -3+0=-3 ≤ 0 | left=1 | 5 |
| 4 | left ≥ right | stop | | | 5 |

**Result:** `5` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(n) — for the diff array |

---

## Follow-Up Questions

**Q1: Why can we sort and lose the original indices?**
The condition only cares about values at pairs of positions, not their specific indices. Since we count unordered pairs, sorting is fine.

**Q2: Why does the two-pointer technique work?**
After sorting, if `diff[left] + diff[right] > 0`, then all elements between `left+1` and `right` paired with `right` also satisfy the condition (they're all ≥ diff[left]). So we add `right - left` pairs and move `right` down. Otherwise, `diff[left]` is too negative, so we move `left` up.

**Q3: Could you use binary search instead of two pointers?**
Yes — for each index `i`, binary search for the smallest `j > i` where `diff[i] + diff[j] > 0`. Same O(n log n) time.

---

## Key Takeaway

> **When a pairwise inequality involves elements from two arrays, compute element-wise differences to reduce it to a single-array two-sum-like problem. Sort + two pointers then counts valid pairs in O(n log n).**
