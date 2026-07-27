# 2524. Maximum Frequency Score of a Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-score-of-a-subarray](https://leetcode.com/problems/maximum-frequency-score-of-a-subarray)
**Companies:** Paypal

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window + Hash Map — O(n)](#approach-sliding-window--hash-map--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, find the subarray of length `k` with the maximum **frequency score** (sum of `value^frequency` for each distinct value in the subarray).

---

## Key Insight

> Use a fixed-size sliding window of length k. Maintain a frequency map and the current score. When sliding, update the score by adjusting the power terms: remove the old contribution and add the new one using modular exponentiation.

---

## Approach: Sliding Window + Hash Map — O(n) ✅

```
FUNCTION maxFrequencyScore(nums, k):
    MOD = 10^9 + 7
    count = Counter(nums[:k])
    score = SUM(pow(val, freq, MOD) for val, freq in count.items()) % MOD
    result = score

    FOR i ← k TO n - 1:
        // Remove nums[i-k], add nums[i]
        out = nums[i - k]; inp = nums[i]
        // Update score: subtract old power, add new power
        score -= pow(out, count[out], MOD)
        count[out] -= 1
        IF count[out] > 0: score += pow(out, count[out], MOD)

        score -= pow(inp, count[inp], MOD) if count[inp] > 0 else 0
        count[inp] += 1
        score += pow(inp, count[inp], MOD)

        score %= MOD
        result = MAX(result, score)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n · log k)** (modpow) | O(k) |

---

## Key Takeaway

> **Sliding window with incremental score updates using modular exponentiation.** Adjust v^f terms when elements enter/leave the window.
