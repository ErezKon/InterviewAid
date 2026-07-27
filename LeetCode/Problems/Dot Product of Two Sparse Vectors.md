# 1570. Dot Product of Two Sparse Vectors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/dot-product-of-two-sparse-vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors)
**Companies:** Amazon, Apple, Bloomberg, General Motors, Google, Linkedin, Meta, Microsoft, Nvidia, Pinterest, Tiktok

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Store Non-Zero Pairs + Two Pointers](#approach-store-non-zero-pairs--two-pointers)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Implement a `SparseVector` class that efficiently stores a sparse vector (most elements are zero) and supports computing the **dot product** with another sparse vector.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 100`
- `dotProduct` will be called multiple times

---

## Examples

```
Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: Only indices 0,3 matter for v1; indices 1,3 for v2.
  Common non-zero index: 3 → 2×4 = 8. Index 0: 1×0=0. Total = 8.

Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0  (no overlapping non-zero indices)
```

---

## Key Insight

> Don't store the full vector — store only `(index, value)` pairs for non-zero elements. The dot product only cares about indices where **both** vectors are non-zero. Use **two pointers** on the sorted pairs to find matches in O(L1 + L2) where L1, L2 are non-zero counts.

---

## Approach: Store Non-Zero Pairs + Two Pointers ✅

```
CLASS SparseVector:
    CONSTRUCTOR(nums):
        self.pairs = [(i, v) for i, v in enumerate(nums) if v != 0]

    FUNCTION dotProduct(other):
        result = 0
        i = j = 0
        WHILE i < len(self.pairs) AND j < len(other.pairs):
            IF self.pairs[i].idx == other.pairs[j].idx:
                result += self.pairs[i].val * other.pairs[j].val
                i += 1; j += 1
            ELSE IF self.pairs[i].idx < other.pairs[j].idx:
                i += 1
            ELSE:
                j += 1
        RETURN result
```

---

## Walkthrough

```
nums1 = [1,0,0,2,3] → pairs1 = [(0,1), (3,2), (4,3)]
nums2 = [0,3,0,4,0] → pairs2 = [(1,3), (3,4)]

Two-pointer:
  i=0,j=0: idx 0 vs 1 → 0 < 1 → i++
  i=1,j=0: idx 3 vs 1 → 3 > 1 → j++
  i=1,j=1: idx 3 vs 3 → MATCH → result += 2×4 = 8, i++, j++
  j=2 → out of bounds → STOP

Result: 8 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Constructor** | O(n) | Scan full array once |
| **dotProduct** | O(L1 + L2) | L1, L2 = non-zero counts in each vector |
| **Space** | O(L) | Only non-zero pairs stored per vector |

---

## Follow-Up Questions

**Q1: What if one vector is much sparser than the other?**
> Use **binary search** on the longer list for each element of the shorter. Time: O(L_short × log(L_long)) — better when L_short << L_long.

**Q2: What if you used a hash map instead?**
> Store non-zeros in a dict. dotProduct iterates the smaller map and looks up in the larger one. O(min(L1, L2)) average but uses more memory.

**Q3: What if the vector is extremely large (billions of elements)?**
> The sparse representation is essential. Two-pointer is cache-friendly and streams well. Hash map approach also works but with worse cache locality.

---

## Key Takeaway

> **Sparse data → store only non-zeros. Two-pointer merge on sorted index pairs gives optimal dot product computation. A Meta/LinkedIn interview classic.**
