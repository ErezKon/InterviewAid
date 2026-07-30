# 870. Advantage Shuffle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/advantage-shuffle](https://leetcode.com/problems/advantage-shuffle)
**Companies:** Amazon, Palo Alto Networks, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy (Task Scheduler) — O(n log n) ✅](#4-approach-greedy-task-scheduler--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two integer arrays `nums1` and `nums2` of equal length, return a **permutation** of `nums1` that **maximizes its advantage** over `nums2`. The advantage is the number of indices `i` where `nums1[i] > nums2[i]`.

**Constraints:**
- `1 ≤ nums1.length ≤ 10⁵`
- `nums1.length == nums2.length`
- `0 ≤ nums1[i], nums2[i] ≤ 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [2,7,11,15], nums2 = [1,10,4,11]
  Output: [2,11,7,15]
  Explanation: 2>1 ✓, 11>10 ✓, 7>4 ✓, 15>11 ✓ → advantage = 4

Example 2:
  Input:  nums1 = [12,24,8,32], nums2 = [13,25,32,11]
  Output: [24,32,8,12]
```

---

## 3. Key Insight

> This is the **"Tian Ji's Horse Racing"** strategy. For each opponent (nums2), use your **weakest card that still beats it**. If no card can beat it, sacrifice your weakest card. Process opponents from strongest to weakest.

---

## 4. Approach: Greedy (Task Scheduler) — O(n log n) ✅

```
FUNCTION advantageCount(nums1, nums2):
    sorted1 = sorted(nums1)
    // For each element in nums2 (sorted desc), assign largest available if possible
    indices = sorted(range(len(nums2)), key=lambda i: -nums2[i])
    lo, hi = 0, len(sorted1) - 1
    result = [0] * len(nums2)
    FOR i IN indices:
        IF sorted1[hi] > nums2[i]:
            result[i] = sorted1[hi]; hi -= 1
        ELSE:
            result[i] = sorted1[lo]; lo += 1
    RETURN result
```

**Strategy:** Sort `nums1`. Process `nums2` indices from largest to smallest. If our largest remaining can beat theirs, use it. Otherwise, sacrifice our smallest remaining.

---

## 5. Walkthrough

```
nums1 = [2,7,11,15], nums2 = [1,10,4,11]
sorted1 = [2,7,11,15]
Process nums2 by desc value: indices [3,1,2,0] → values [11,10,4,1]

i=3 (nums2=11): sorted1[hi]=15 > 11 → result[3]=15, hi=2
i=1 (nums2=10): sorted1[hi]=11 > 10 → result[1]=11, hi=1
i=2 (nums2=4):  sorted1[hi]=7 > 4  → result[2]=7, hi=0
i=0 (nums2=1):  sorted1[hi]=2 > 1  → result[0]=2, hi=-1

Result: [2,11,7,15] ✅ (all 4 beat their opponent)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(n) — for sorted arrays and result |

---

## 7. Follow-Up Questions

### 7.1 Why process from strongest opponent first?

If we process from weakest, we might waste strong cards on weak opponents. By handling the strongest opponents first, we ensure strong cards are only used when necessary and weak cards are sacrificed optimally.

### 7.2 Alternative: use a sorted multiset/TreeMap?

Yes. For each `nums2[i]`, find the smallest element in `nums1` that's strictly greater (upper_bound). If found, use it; otherwise, use the smallest element. Same O(n log n) complexity.

---

## 8. Key Takeaway

> Classic greedy "horse racing" problem: sort your cards, process opponents from strongest to weakest, and either beat them with your minimum winning card or sacrifice your weakest. Two-pointer on a sorted array makes this O(n log n).
