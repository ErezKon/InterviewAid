# 81. Search in Rotated Sorted Array II

**Difficulty:** 🟡 Medium
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/search-in-rotated-sorted-array-ii](https://leetcode.com/problems/search-in-rotated-sorted-array-ii)
**Companies:** Accenture, Amazon, Bloomberg, Cisco, Google, Linkedin, Meta, Microsoft, Tcs, Uber, Walmart Labs

---

## 1. Problem Description

Like Search in Rotated Sorted Array (#33), but the array may contain **duplicates**. Return `true` if `target` is found.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [2,5,6,0,0,1,2]`, `target = 0` | `true` | The target `0` exists in the rotated array.
| `nums = [2,5,6,0,0,1,2]`, `target = 3` | `false` | The target `3` is not present.

---

## 3. Approach: Modified Binary Search — O(n) worst, O(log n) avg ✅

When `nums[lo] == nums[mid] == nums[hi]`, we can't determine which half is sorted. Shrink both ends.

```text
FUNCTION search(nums, target):
    lo ← 0
    hi ← LENGTH(nums) - 1

    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        IF nums[mid] == target:
            RETURN true
        // Duplicates make it ambiguous
        IF nums[lo] == nums[mid] AND nums[mid] == nums[hi]:
            lo ← lo + 1
            hi ← hi - 1
        ELSE IF nums[lo] ≤ nums[mid]:
            // Left half sorted
            IF nums[lo] ≤ target < nums[mid]:
                hi ← mid - 1
            ELSE:
                lo ← mid + 1
        ELSE:
            // Right half sorted
            IF nums[mid] < target ≤ nums[hi]:
                lo ← mid + 1
            ELSE:
                hi ← mid - 1
    RETURN false
```

---

## 4. Walkthrough

Consider `nums = [2,5,6,0,0,1,2]`, `target = 0`.

| Step | lo | hi | mid | nums[mid] | Action |
|------|----|----|-----|-----------|--------|
| 1 | 0 | 6 | 3 | 0 | `nums[mid] == target` → return `true` |

The algorithm finds the target in the first iteration.

---

## 5. Complexity Analysis

| Case | Time |
|------|------|
| Average | O(log n) |
| Worst (all duplicates) | O(n) |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the index of `target` instead of a boolean?
- Can you adapt this approach to handle a stream of numbers where the array size is unknown?
- What changes are needed if the array could be rotated multiple times (i.e., not a single rotation)?

---

## Key Takeaway

> Duplicates break the binary search invariant. The fix: when `lo == mid == hi`, shrink both ends by one. This degrades to O(n) only when many duplicates exist.
