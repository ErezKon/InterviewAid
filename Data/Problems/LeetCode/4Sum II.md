# 454. 4Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/4sum-ii](https://leetcode.com/problems/4sum-ii)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Map Split — O(n²) ✅](#4-approach-hash-map-split--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given four integer arrays `nums1`, `nums2`, `nums3`, `nums4` all of length `n`, return the number of tuples `(i, j, k, l)` such that `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`.

**Constraints:**
- `n == nums1.length == nums2.length == nums3.length == nums4.length`
- `1 ≤ n ≤ 200`
- `-2²⁸ ≤ nums[i] ≤ 2²⁸`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
  Output: 2
  Explanation: (0,0,0,1) → 1+(-2)+(-1)+2 = 0
               (1,1,0,0) → 2+(-1)+(-1)+0 = 0
```

---

## 3. Key Insight

> Split the four arrays into two groups of two. Precompute all `a + b` sums in a hash map. Then for each `c + d`, check if `-(c + d)` exists in the map. This reduces O(n⁴) to O(n²).

Visual:
```
Group 1: nums1 × nums2  →  all (a+b) sums → hash map
Group 2: nums3 × nums4  →  for each (c+d), lookup -(c+d)
```

---

## 4. Approach: Hash Map Split — O(n²) ✅

```
FUNCTION fourSumCount(nums1, nums2, nums3, nums4):
    ab = Counter(a + b for a in nums1 for b in nums2)
    RETURN SUM(ab[-(c + d)] for c in nums3 for d in nums4)
```

---

## 5. Walkthrough

```
nums1=[1,2], nums2=[-2,-1], nums3=[-1,2], nums4=[0,2]

Step 1 — Build ab map:
  1+(-2)=-1, 1+(-1)=0, 2+(-2)=0, 2+(-1)=1
  ab = {-1: 1, 0: 2, 1: 1}

Step 2 — Check cd pairs:
  c=-1, d=0: -(−1+0) = 1  → ab[1] = 1
  c=-1, d=2: -(−1+2) = -1 → ab[-1] = 1
  c=2,  d=0: -(2+0) = -2  → ab[-2] = 0
  c=2,  d=2: -(2+2) = -4  → ab[-4] = 0

Result: 1 + 1 + 0 + 0 = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — two O(n²) passes |
| **Space** | O(n²) — for the hash map of a+b sums |

---

## 7. Follow-Up Questions

### 7.1 Why split into two groups of two?

Splitting into 2+2 gives O(n²) time. Splitting 1+3 would give O(n³). Splitting 3+1 also O(n³). The 2+2 split is the sweet spot.

### 7.2 How does this differ from regular 4Sum (#18)?

4Sum (#18) finds all unique quadruplets from a **single** array. 4Sum II counts tuples from **four separate** arrays — no duplicate handling needed, and the hash map approach works directly.

### 7.3 Can we generalize to kSum II?

Yes. Split k arrays into two halves, enumerate all sums for each half (O(n^(k/2))), then use a hash map lookup. This is the **meet-in-the-middle** technique.

---

## 8. Key Takeaway

> **Meet in the middle**: split the problem into two halves, enumerate one half into a hash map, then probe with the other half. Reduces O(n⁴) to O(n²). This is a general technique applicable whenever the search space can be divided.
