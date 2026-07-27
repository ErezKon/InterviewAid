# 3026. Maximum Good Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-good-subarray-sum](https://leetcode.com/problems/maximum-good-subarray-sum)
**Companies:** Amazon, Atlassian, Coupang, Google, Groww, Zepto

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Prefix Sum + Hash Map — O(n)](#approach-prefix-sum--hash-map--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find a subarray `nums[i..j]` with maximum sum such that `|nums[i] - nums[j]| == k`.

---

## Key Insight

> For each index j with value `nums[j]`, the valid start values are `nums[j] - k` or `nums[j] + k`. Track the minimum prefix sum for each value encountered so far. Subarray sum = `prefix[j+1] - minPrefix[target]`.

---

## Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION maximumSubarraySum(nums, k):
    prefix = [0] * (n + 1)
    FOR i: prefix[i+1] = prefix[i] + nums[i]

    minPrefix = {}
    result = -infinity

    FOR i ← 0 TO n - 1:
        FOR target IN [nums[i] - k, nums[i] + k]:
            IF target IN minPrefix:
                result = MAX(result, prefix[i+1] - minPrefix[target])

        IF nums[i] NOT IN minPrefix OR prefix[i] < minPrefix[nums[i]]:
            minPrefix[nums[i]] = prefix[i]

    RETURN result IF result != -infinity ELSE 0
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum + hash | **O(n)** | O(n) |

---

## Key Takeaway

> **"Subarray with endpoint value constraint" = prefix sum + hash map of min prefix per value.** Look up the partner value (±k) and maximize the sum.
