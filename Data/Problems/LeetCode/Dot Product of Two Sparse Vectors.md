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

> *Note: premium problem — statement verified via doocs/leetcode.*

Given two sparse vectors, compute their dot product.

Implement class `SparseVector`:

- `SparseVector(nums)` Initializes the object with the vector `nums`
- `dotProduct(vec)` Compute the dot product between the instance of *SparseVector* and `vec`

A **sparse vector** is a vector that has mostly zero values, you should store the sparse vector **efficiently **and compute the dot product between two *SparseVector*.

**Follow up: **What if only one of the vectors is sparse?

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `0 <= nums1[i], nums2[i] <= 100`

---

## Examples

**Example 1:**
```
Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8
```

**Example 2:**
```
Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0
```

**Example 3:**
```
Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
Output: 6
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
