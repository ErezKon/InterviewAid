# 3795. Minimum Subarray Length With Distinct Sum At Least K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-subarray-length-with-distinct-sum-at-least-k](https://leetcode.com/problems/minimum-subarray-length-with-distinct-sum-at-least-k)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and integer `k`, find the **minimum** length subarray where the sum of **distinct** elements is at least `k`. Return `-1` if none exists.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i], k <= 10⁹`

---

## 2. Examples

| nums | k | Output | Explanation |
|------|---|--------|-------------|
| `[1,2,2,3,4]` | `7` | `3` | Subarray `[2,3,4]` has distinct sum `2+3+4=9 ≥ 7` and length `3`, which is minimal. |
| `[5,5,5]` | `10` | `-1` | All distinct sums are `5`, never reaching `10`. |
| `[1,2,3,4,5]` | `15` | `5` | Whole array distinct sum `1+2+3+4+5=15`. |

---

## 3. Approach

We use a **sliding window** with a frequency map. The window maintains the sum of distinct values (`distinctSum`). When a new element appears for the first time in the window, we add it to `distinctSum`. When we shrink the window from the left, we decrement its count and remove its contribution if its count drops to zero. While `distinctSum ≥ k`, we update the minimum length and try to shrink further.

```text
FUNCTION minSubarrayDistinctSum(nums, k):
    freq ← empty map
    distinctSum ← 0
    left ← 0
    minLen ← INF

    FOR right ← 0 TO LENGTH(nums) - 1:
        IF freq[nums[right]] IS NULL OR freq[nums[right]] = 0:
            distinctSum ← distinctSum + nums[right]
        freq[nums[right]] ← freq.get(nums[right], 0) + 1

        WHILE distinctSum ≥ k:
            minLen ← MIN(minLen, right - left + 1)
            freq[nums[left]] ← freq[nums[left]] - 1
            IF freq[nums[left]] = 0:
                distinctSum ← distinctSum - nums[left]
            left ← left + 1

    RETURN minLen IF minLen ≠ INF ELSE -1
```

---

## 4. Walkthrough

Take `nums = [1,2,2,3,4]`, `k = 7`.

| step | right | added | freq (partial) | distinctSum | left | window | minLen |
|------|-------|-------|----------------|-------------|------|--------|--------|
| init | - | - | {} | 0 | 0 | [] | INF |
| 1 | 0 | 1 (new) | {1:1} | 1 | 0 | [1] | INF |
| 2 | 1 | 2 (new) | {1:1,2:1} | 3 | 0 | [1,2] | INF |
| 3 | 2 | 2 (dup) | {1:1,2:2} | 3 | 0 | [1,2,2] | INF |
| 4 | 3 | 3 (new) | {1:1,2:2,3:1} | 6 | 0 | [1,2,2,3] | INF |
| 5 | 4 | 4 (new) | {1:1,2:2,3:1,4:1} | 10 | 0 | [1,2,2,3,4] | 5 (10≥7) |
| shrink | - | - | remove 1 → freq[1]=0 | distinctSum=9 | left=1 | [2,2,3,4] | 4 |
| shrink | - | - | remove 2 → freq[2]=1 (still present) | distinctSum=9 | left=2 | [2,3,4] | 3 |
| stop shrink | distinctSum still ≥7 but left cannot move without dropping below 7 |

Minimum length found is `3`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element enters and leaves the window once |
| **Space** | O(n) — frequency map for distinct values |

---

## 6. Follow-Up Questions

1. How would the algorithm change if the requirement were the sum of **all** elements (not distinct)?
2. Can we extend this to handle negative numbers while still using a sliding window?
3. What if we need the **maximum** length subarray with distinct sum ≥ k?

---

## 7. Key Takeaway

> **Sliding window with distinct‑value tracking** — maintain a frequency map and a running distinct sum, adding a value only on its first appearance and removing it when its count drops to zero. This yields an O(n) solution for the minimum‑length problem.
