# 3048. Earliest Second to Mark Indices I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/earliest-second-to-mark-indices-i](https://leetcode.com/problems/earliest-second-to-mark-indices-i)
**Companies:** Mathworks

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search + Greedy Check](#approach-binary-search--greedy-check)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `nums` (1-indexed) and `changeIndices` (1-indexed), at each second you can either decrement any `nums[i]` by 1, or if `nums[changeIndices[s]] == 0`, mark it. Return the earliest second when all indices can be marked, or `-1`.

**Constraints:**
- `1 <= n, m <= 2000`

---

## Examples

```
Input: nums = [2,2,0], changeIndices = [2,2,2,2,3,2,2,1]
Output: 8

Input: nums = [1,3], changeIndices = [1,1,1,2,1,1,1]
Output: 6
```

---

## Key Insight

> **Binary search on the answer.** For a given deadline `t`, check feasibility greedily: for each index, its **last occurrence** in `changeIndices[1..t]` is the latest moment to mark it. Reserve that second for marking. All other seconds are "free" for decrementing. Count if free seconds ≥ total decrements needed.

---

## Approach: Binary Search + Greedy Check

```
FUNCTION earliestSecondToMarkIndices(nums, changeIndices):
    FUNCTION canFinish(t):
        lastOccurrence = {} // index → last second it appears in changeIndices[1..t]
        FOR s ← 1 TO t:
            lastOccurrence[changeIndices[s]] = s

        IF any index not in lastOccurrence: RETURN false

        freeSeconds = 0
        FOR s ← 1 TO t:
            idx = changeIndices[s]
            IF s == lastOccurrence[idx]:
                // Must mark idx now — need nums[idx] free seconds before this
                freeSeconds -= nums[idx]
                IF freeSeconds < 0: RETURN false
            ELSE:
                freeSeconds += 1
        RETURN true

    lo = 1, hi = m, ans = -1
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF canFinish(mid): ans = mid; hi = mid - 1
        ELSE: lo = mid + 1
    RETURN ans
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(m × log m) | Binary search × O(m) feasibility check |
| **Space** | O(n) | Last occurrence map |

---

## Key Takeaway

> **Binary search on deadline + greedy feasibility: reserve the last occurrence of each index for marking, use remaining seconds for decrements. Classic "binary search on answer" pattern.**
