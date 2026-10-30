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

You are given an array `nums` of `n` integers, and a 2D integer array `queries` of size `q`, where `queries[i] = [l_i, r_i]`.

For each query, you must find the **maximum XOR score** of any subarray of `nums[l_i..r_i]`.

The **XOR score** of an array `a` is found by repeatedly applying the following operations on `a` so that only one element remains, that is the **score**:

- Simultaneously replace `a[i]` with `a[i] XOR a[i + 1]` for all indices `i` except the last one.
- Remove the last element of `a`.

Return an array `answer` of size `q` where `answer[i]` is the answer to query `i`.

**Constraints:**
- `1 <= n == nums.length <= 2000`
- `0 <= nums[i] <= 2^31 - 1`
- `1 <= q == queries.length <= 10^5`
- `queries[i].length == 2 `
- `queries[i] = [l_i, r_i]`
- `0 <= l_i <= r_i <= n - 1`

---

## Examples

**Example 1:**
```
Input: nums = [2,8,4,32,16,1], queries = [[0,2],[1,4],[0,5]]
Output: [12,60,60]
Explanation: In the first query, nums[0..2] has 6 subarrays [2], [8], [4], [2, 8], [8, 4], and [2, 8, 4] each with a respective XOR score of 2, 8, 4, 10, 12, and 6. The answer for the query is 12, the largest of all XOR scores.
In the second query, the subarray of nums[1..4] with the largest XOR score is nums[1..4] with a score of 60.
In the third query, the subarray of nums[0..5] with the largest XOR score is nums[1..4] with a score of 60.
```

**Example 2:**
```
Input: nums = [0,7,3,2,8,5,1], queries = [[0,3],[1,5],[2,4],[2,6],[5,6]]
Output: [7,14,11,14,5]
Explanation:
  Index
  nums[l_i..r_i]
  Maximum XOR Score Subarray
  Maximum Subarray XOR Score
  0
  [0, 7, 3, 2]
  [7]
  7
  1
  [7, 3, 2, 8, 5]
  [7, 3, 2, 8]
  14
  2
  [3, 2, 8]
  [3, 2, 8]
  11
  3
  [3, 2, 8, 5, 1]
  [2, 8, 5, 1]
  14
  4
  [5, 1]
  [5]
  5
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
