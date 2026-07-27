# 3277. Maximum XOR Score Subarray Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-xor-score-subarray-queries](https://leetcode.com/problems/maximum-xor-score-subarray-queries)
**Companies:** Google

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

Given an array `nums` and queries `[l_i, r_i]`, for each query return the **maximum XOR score** of any subarray within `nums[l_i..r_i]`. The XOR score of a subarray is defined recursively: repeatedly XOR adjacent pairs until one value remains.

**Constraints:**
- `1 ≤ nums.length ≤ 2000`
- `0 ≤ nums[i] ≤ 2³¹ - 1`
- `1 ≤ queries.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  nums = [2, 8, 4, 32, 16, 1], queries = [[0,2],[1,4],[0,5]]
Output: [12, 60, 60]
```

---

## Key Insight

> The XOR score of subarray `[l, r]` follows a DP recurrence: `xorScore[l][r] = xorScore[l][r-1] XOR xorScore[l+1][r]`. This is similar to interval DP. We can precompute all XOR scores, then build another DP table for the maximum XOR score in any sub-interval.

---

## Approach

```
FUNCTION maxXorScoreQueries(nums, queries):
    n ← LEN(nums)
    
    // Step 1: Compute XOR score for every subarray [l, r]
    // xorScore[l][r] = XOR score of subarray nums[l..r]
    xorScore ← 2D ARRAY[n][n]
    FOR i ← 0 TO n - 1 DO
        xorScore[i][i] ← nums[i]
    FOR length ← 2 TO n DO
        FOR l ← 0 TO n - length DO
            r ← l + length - 1
            xorScore[l][r] ← xorScore[l][r-1] XOR xorScore[l+1][r]
    
    // Step 2: Compute max XOR score for any subarray within [l, r]
    // maxScore[l][r] = max xorScore of any sub-interval in [l..r]
    maxScore ← COPY(xorScore)
    FOR length ← 2 TO n DO
        FOR l ← 0 TO n - length DO
            r ← l + length - 1
            maxScore[l][r] ← MAX(maxScore[l][r], maxScore[l][r-1], maxScore[l+1][r])
    
    // Step 3: Answer queries
    result ← []
    FOR [l, r] IN queries DO
        result.APPEND(maxScore[l][r])
    
    RETURN result
```

---

## Walkthrough

```
nums = [2, 8, 4]

XOR scores:
  [0,0]=2  [1,1]=8  [2,2]=4
  [0,1] = xorScore[0,0] ^ xorScore[1,1] = 2^8 = 10
  [1,2] = xorScore[1,1] ^ xorScore[2,2] = 8^4 = 12
  [0,2] = xorScore[0,1] ^ xorScore[1,2] = 10^12 = 6

Max scores:
  [0,0]=2  [1,1]=8  [2,2]=4
  [0,1] = MAX(10, 2, 8) = 10
  [1,2] = MAX(12, 8, 4) = 12
  [0,2] = MAX(6, 10, 12) = 12

Query [0,2] → 12 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Interval DP + precomputation | **O(n² + q)** | **O(n²)** |

Where `q` = number of queries.

---

## Follow-Up Questions

1. **Why does the XOR score follow this recurrence?** The recursive XOR-of-adjacent-pairs process is equivalent to XOR of specific subsets determined by Pascal's triangle parity — and the interval DP captures this.
2. **Why two DP tables?** First table computes exact XOR scores, second propagates the maximum across all sub-intervals.
3. **Can we answer queries online?** With precomputation, each query is O(1) lookup.

---

## Key Takeaway

> **Two-layer interval DP** — first compute the XOR score for every subarray, then propagate maximums across sub-intervals. Precomputation in O(n²) enables O(1) query answering.

---
