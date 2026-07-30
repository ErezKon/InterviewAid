# 1186. Maximum Subarray Sum with One Deletion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion)
**Companies:** Amazon, Google, Microsoft, Two Sigma

---

## Problem Description
Given an integer array `arr`, you may delete **at most one** element from the array. Return the maximum possible sum of a non‑empty subarray after this optional deletion.

## Examples
- **Input:** `arr = [1, -2, 0, 3]`  
  **Output:** `4`  
  **Explanation:** Delete `-2` and take subarray `[1,0,3]` sum = 4.
- **Input:** `arr = [1, -2, -2, 3]`  
  **Output:** `3`  
  **Explanation:** Best is subarray `[3]` without any deletion.

## Approach
Apply a two‑state Kadane DP: `noDel[i]` – max subarray sum ending at `i` with no deletion, `oneDel[i]` – max sum ending at `i` with one deletion already used. Transition:
- `noDel[i] = max(arr[i], noDel[i-1] + arr[i])`
- `oneDel[i] = max(noDel[i-1], oneDel[i-1] + arr[i])`
Track the global maximum over both states.

## Walkthrough
| i | arr[i] | noDel | oneDel | global max |
|---|--------|-------|--------|------------|
|0|1|1|-∞|1|
|1|-2|max(-2,1-2)=-1|max(1,-∞-2)=1|1|
|2|0|max(0,-1+0)=0|max(-1,1+0)=1|1|
|3|3|max(3,0+3)=3|max(0,1+3)=4|4|

## Complexity Analysis
- **Time:** O(n) – single pass DP.
- **Space:** O(1) – only previous values needed.

## Follow-Up Questions
1. How would the solution change if you could delete up to `k` elements?
2. Can you adapt the algorithm to return the actual subarray indices?
3. What if deletions are only allowed on negative numbers?

## Key Takeaway
Maintaining two parallel Kadane states—one with a deletion used and one without—captures the optimal subarray sum with at most one removal in linear time.
