# 1425. Constrained Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/constrained-subsequence-sum](https://leetcode.com/problems/constrained-subsequence-sum)
**Companies:** Akuna Capital, Google

---

## 1. Problem Description

Given an array `nums` and integer `k`, find the maximum sum of a non-empty subsequence where consecutive chosen elements are at most `k` indices apart.

---

## 2. Key Insight

> DP: `dp[i]` = max sum of valid subsequence ending at `i`. Transition: `dp[i] = nums[i] + max(0, max(dp[j] for j in [i-k, i-1]))`. Use a **monotonic deque** to maintain the sliding window maximum of `dp` values.

---

## 3. Approach: DP + Monotonic Deque — O(n) ✅

```
FUNCTION constrainedSubsetSum(nums, k):
    n = len(nums)
    dp = list(nums)
    dq = deque()  // stores indices, dp[dq[0]] is the max in window
    
    FOR i FROM 0 TO n-1:
        IF dq AND dq[0] < i - k:
            dq.POPLEFT()
        IF dq:
            dp[i] = MAX(dp[i], nums[i] + dp[dq[0]])
        WHILE dq AND dp[dq[-1]] <= dp[i]:
            dq.POP()
        dq.APPEND(i)
    
    RETURN MAX(dp)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Sliding window maximum DP via monotonic deque: `dp[i] = nums[i] + max(0, max of dp[i-k..i-1])`. Each element enters and leaves the deque once → O(n) total.
