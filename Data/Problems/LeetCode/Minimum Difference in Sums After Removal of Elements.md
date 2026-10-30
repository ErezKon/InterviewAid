# 2163. Minimum Difference in Sums After Removal of Elements

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements](https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Prefix Min-Sum + Suffix Max-Sum with Heaps — O(n log n)](#approach-prefix-min-sum--suffix-max-sum-with-heaps--on-log-n)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** integer array `nums` consisting of `3 * n` elements.

You are allowed to remove any **subsequence** of elements of size **exactly** `n` from `nums`. The remaining `2 * n` elements will be divided into two **equal** parts:

- The first `n` elements belonging to the first part and their sum is `sum_first`.
- The next `n` elements belonging to the second part and their sum is `sum_second`.

The **difference in sums** of the two parts is denoted as `sum_first - sum_second`.

- For example, if `sum_first = 3` and `sum_second = 2`, their difference is `1`.
- Similarly, if `sum_first = 2` and `sum_second = 3`, their difference is `-1`.

Return *the **minimum difference** possible between the sums of the two parts after the removal of *`n`* elements*.

**Constraints:**
- `nums.length == 3 * n`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [3,1,2]
Output: -1
Explanation: Here, nums has 3 elements, so n = 1.
Thus we have to remove 1 element from nums and divide the array into two equal parts.
- If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
- If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
- If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
The minimum difference between sums of the two parts is min(-1,1,2) = -1.
```

**Example 2:**
```
Input: nums = [7,9,5,8,1,3]
Output: 1
Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
It can be shown that it is not possible to obtain a difference smaller than 1.
```

---

## Key Insight

> For each possible split point `i`, we want the **minimum sum** of `n` elements from the prefix `[0..i]` (for the first half) and the **maximum sum** of `n` elements from the suffix `[i+1..3n-1]` (for the second half). Precompute both using heaps, then take the minimum difference.

---

## Approach: Prefix Min-Sum + Suffix Max-Sum with Heaps — O(n log n) ✅

```
FUNCTION minimumDifference(nums):
    n = len(nums) / 3

    // prefixMinSum[i] = min sum of n elements from nums[0..i]
    maxHeap = MaxHeap()
    prefixSum = 0
    prefixMinSum = [0] * (3*n)
    FOR i ← 0 TO 2*n - 1:
        maxHeap.PUSH(nums[i])
        prefixSum += nums[i]
        IF maxHeap.SIZE() > n:
            prefixSum -= maxHeap.POP()
        IF maxHeap.SIZE() == n:
            prefixMinSum[i] = prefixSum

    // suffixMaxSum[i] = max sum of n elements from nums[i..3n-1]
    minHeap = MinHeap()
    suffixSum = 0
    suffixMaxSum = [0] * (3*n)
    FOR i ← 3*n - 1 DOWN TO n:
        minHeap.PUSH(nums[i])
        suffixSum += nums[i]
        IF minHeap.SIZE() > n:
            suffixSum -= minHeap.POP()
        IF minHeap.SIZE() == n:
            suffixMaxSum[i] = suffixSum

    // Split at position i: first part [0..i], second part [i+1..3n-1]
    RETURN MIN(prefixMinSum[i] - suffixMaxSum[i+1] for i in range(n-1, 2*n))
```

---

## Walkthrough

```
nums = [7, 9, 5, 8, 1, 3], n = 2
```

**Prefix min-sum (pick 2 smallest from prefix):**
| i | Elements seen | Min sum of 2 | prefixMinSum[i] |
|---|-------------|-------------|-----------------|
| 1 | [7, 9] | 7+9=16 | 16 |
| 2 | [7, 9, 5] | 5+7=12 | 12 |
| 3 | [7, 9, 5, 8] | 5+7=12 | 12 |

**Suffix max-sum (pick 2 largest from suffix):**
| i | Elements seen | Max sum of 2 | suffixMaxSum[i] |
|---|-------------|-------------|-----------------|
| 4 | [1, 3] | 1+3=4 | 4 |
| 3 | [8, 1, 3] | 8+3=11 | 11 |
| 2 | [5, 8, 1, 3] | 8+5=13 | 13 |

**Split points:**
| i | prefixMinSum[i] | suffixMaxSum[i+1] | Difference |
|---|----------------|-------------------|------------|
| 1 | 16 | 13 | 3 |
| 2 | 12 | 11 | **1** |
| 3 | 12 | 4 | 8 |

**Result:** min(3, 1, 8) = **1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — heap operations for prefix and suffix |
| **Space** | O(n) — heaps and prefix/suffix arrays |

---

## Follow-Up Questions

1. **Why max-heap for prefix and min-heap for suffix?** Max-heap evicts the largest element to keep the smallest n → minimum sum. Min-heap evicts the smallest to keep the largest n → maximum sum.
2. **Why split between n-1 and 2n?** Each half needs at least n elements, so the split point must allow n elements on each side.
3. **Can we solve this with sorting alone?** No — the order matters since elements must maintain their relative positions.

---

## Key Takeaway

> For partition-based optimization (minimize left sum minus right sum), precompute **prefix min-sums** and **suffix max-sums** using heaps, then enumerate split points — this two-pass technique handles order-preserving selection elegantly.
