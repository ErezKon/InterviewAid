# 2488. Count Subarrays With Median K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-subarrays-with-median-k](https://leetcode.com/problems/count-subarrays-with-median-k)

**Companies:** Amazon, Google, Salesforce

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

You are given an array `nums` of size `n` consisting of **distinct **integers from `1` to `n` and a positive integer `k`.

Return *the number of non-empty subarrays in *`nums`* that have a **median** equal to *`k`.

**Note**:

- The median of an array is the **middle **element after sorting the array in **ascending **order. If the array is of even length, the median is the **left **middle element.

- For example, the median of `[2,3,1,4]` is `2`, and the median of `[8,4,3,5,1]` is `4`.

- A subarray is a contiguous part of an array.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^5`
- `1 <= nums[i], k <= n`
- The integers in `nums` are distinct.

---

## Examples

**Example 1:**
```
Input: nums = [3,2,1,4,5], k = 4
Output: 3
Explanation: The subarrays that have a median equal to 4 are: [4], [4,5] and [1,4,5].
```

**Example 2:**
```
Input: nums = [2,3,1], k = 3
Output: 1
Explanation: [3] is the only subarray that has a median equal to 3.
```

---

## Key Insight

Convert the problem to a **balance** problem. For any subarray containing `k`:
- Elements > k contribute +1
- Elements < k contribute -1

The median is `k` when the balance is **0** (odd-length subarray) or **1** (even-length subarray, where k is the lower-middle).

Split at k's position: compute right-side balance frequencies, then scan left and match.

---

## Approach

```
FUNCTION countSubarrays(nums, k):
    idx = nums.index(k)
    count = Counter({0: 1}); balance = 0; result = 0
    // Right of k
    FOR i ← idx + 1 TO n - 1:
        balance += 1 IF nums[i] > k ELSE -1
        count[balance] += 1
    // Left of k (including k)
    balance = 0
    FOR i ← idx DOWN TO 0:
        IF i < idx: balance += 1 IF nums[i] > k ELSE -1
        result += count[-balance] + count[-balance + 1]
    RETURN result
```

---

## Walkthrough

**Input:** `nums = [3,2,1,4,5], k = 4`, idx = 3

**Right side (from idx+1):**
```
i=4: nums[4]=5 > 4 → balance=+1 → count={0:1, 1:1}
```

**Left side (from idx down):**
```
i=3 (k itself): balance=0
  result += count[0] + count[1] = 1 + 1 = 2  ([4], [4,5])
i=2: nums[2]=1 < 4 → balance=-1
  result += count[1] + count[2] = 1 + 0 = 1  ([1,4,5])
i=1: nums[1]=2 < 4 → balance=-2
  result += count[2] + count[3] = 0  
i=0: nums[0]=3 < 4 → balance=-3
  result += count[3] + count[4] = 0

Total: 3 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — two passes from k's index |
| **Space** | O(n) — balance frequency map |

---

## Follow-Up Questions

**Q1: Why check both `count[-balance]` and `count[-balance + 1]`?**
- `-balance + 0 = 0` total balance → odd-length subarray with k as exact middle.
- `-balance + 1 = 1` total balance → even-length subarray with k as lower median.

**Q2: Why does this work only with distinct elements?**
Distinct elements ensure k appears exactly once and the balance uniquely determines the median position. With duplicates, the median definition becomes ambiguous.

**Q3: Why split at k's position?**
Every valid subarray must contain k. Splitting lets us independently compute left and right balance contributions, then combine via frequency matching.

---

## Key Takeaway

> **Median-equals-k problems with distinct elements: convert to a balance problem (+1 for > k, -1 for < k). The median is k when total balance is 0 or 1. Split at k's position and use a frequency map for O(n) counting.**
