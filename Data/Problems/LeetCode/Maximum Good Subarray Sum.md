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

You are given an array `nums` of length `n` and a **positive** integer `k`.

A subarray of `nums` is called **good** if the **absolute difference** between its first and last element is **exactly** `k`, in other words, the subarray `nums[i..j]` is good if `|nums[i] - nums[j]| == k`.

Return *the **maximum** sum of a **good** subarray of *`nums`. *If there are no good subarrays**, return *`0`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `1 <= k <= 10^9`

---

## Key Insight

> For each index j with value `nums[j]`, the valid start values are `nums[j] - k` or `nums[j] + k`. Track the minimum prefix sum for each value encountered so far. Subarray sum = `prefix[j+1] - minPrefix[target]`.

---

## Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION maximumSubarraySum(nums, k):
    n ← LENGTH(nums)
    prefix ← ARRAY(0 TO n) INITIALIZED TO 0
    FOR i ← 0 TO n-1:
        prefix[i+1] ← prefix[i] + nums[i]

    minPrefix ← EMPTY MAP
    result ← -INFINITY

    FOR i ← 0 TO n-1:
        FOR target IN [nums[i] - k, nums[i] + k]:
            IF target IN minPrefix:
                result ← MAX(result, prefix[i+1] - minPrefix[target])
        IF nums[i] NOT IN minPrefix OR prefix[i] < minPrefix[nums[i]]:
            minPrefix[nums[i]] ← prefix[i]

    RETURN result IF result != -INFINITY ELSE 0
```

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5,6], k = 1
Output: 11
Explanation: The absolute difference between the first and last element must be 1 for a good subarray. All the good subarrays are: [1,2], [2,3], [3,4], [4,5], and [5,6]. The maximum subarray sum is 11 for the subarray [5,6].
```

**Example 2:**
```
Input: nums = [-1,3,2,4,5], k = 3
Output: 11
Explanation: The absolute difference between the first and last element must be 3 for a good subarray. All the good subarrays are: [-1,3,2], and [2,4,5]. The maximum subarray sum is 11 for the subarray [2,4,5].
```

**Example 3:**
```
Input: nums = [-1,-2,-3,-4], k = 2
Output: -6
Explanation: The absolute difference between the first and last element must be 2 for a good subarray. All the good subarrays are: [-1,-2,-3], and [-2,-3,-4]. The maximum subarray sum is -6 for the subarray [-1,-2,-3].
```

---

## Walkthrough

Consider **Example 2** (`nums = [5,5,5], k = 0`).
1. Prefix sums: `[0,5,10,15]`.
2. Iterate indices:
   - i=0, value=5. Targets are `5-0=5` and `5+0=5`. No entry in `minPrefix` yet.
   - Store `minPrefix[5] = 0` (prefix before index 0).
   - i=1, value=5. Targets = 5. `minPrefix[5] = 0`, candidate sum = `prefix[2] - 0 = 10` → result=10.
   - Update `minPrefix[5]` remains 0 (prefix[1]=5 >0).
   - i=2, value=5. Targets =5. Candidate = `prefix[3] - 0 = 15` → result=15.
3. Final result = 15, matching the whole array.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum + hash | **O(n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if the subarray length must be at least `L`?
- Can we extend the approach to handle multiple allowed differences (e.g., `|nums[i]-nums[j]| ∈ {k1,k2}`)?
- What if we need to return the actual subarray indices instead of just the sum?

---

## Key Takeaway

> **"Subarray with endpoint value constraint" = prefix sum + hash map of min prefix per value.** Look up the partner value (±k) and maximize the sum.
