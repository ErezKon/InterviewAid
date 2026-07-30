# 1460. Make Two Arrays Equal by Reversing Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

## 1. Problem Description

Check if `arr` can become equal to `target` by reversing any subarrays any number of times.

---

## 2. Approach: Sort Comparison — O(n log n) ✅

```text
FUNCTION canBeEqual(target, arr):
    RETURN sorted(target) == sorted(arr)
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Examples

| target | arr | Output |
|--------|-----|--------|
| [1,2,3,4] | [2,4,1,3] | true |
| [1,2,3] | [3,1,2] | true |
| [1,2,3] | [3,2,1] | true |

---

## 4. Walkthrough

**Example 1:** `target = [1,2,3,4]`, `arr = [2,4,1,3]`

| Step | Operation | arr state |
|------|-----------|----------|
| 1 | Sort both arrays | [1,2,3,4] vs [1,2,3,4] |
| 2 | Compare | equal → return true |

The sorting step implicitly captures any sequence of subarray reversals because reversals can generate any permutation.

---

## 5. Complexity Analysis

- **Time:** Sorting each array costs `O(n log n)`.
- **Space:** Additional space for the sorted copies is `O(n)`.

---

## 6. Follow-Up Questions

1. How would you handle the case where only *one* subarray reversal is allowed?
2. What if the arrays contain duplicate elements and you need to count the minimum number of reversals?
3. Extend to multi‑dimensional arrays where you can reverse sub‑matrices.

---

## 7. Key Takeaway

> Any permutation is reachable via subarray reversals (bubble sort argument). So just check if both arrays are permutations of each other.
