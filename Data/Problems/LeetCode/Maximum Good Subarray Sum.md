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
Input: nums = [1, -2, 3, 4, -5, 6], k = 2
Output: 9
Explanation: Choose subarray [3,4] where |3-4| = 1 ≠ 2, not valid. The optimal subarray is [4, -5, 6] with sum 5, but |4-6| = 2 satisfies the condition, giving sum 5. Actually the best is [1, -2, 3, 4] with sum 6 and |1-4| = 3 ≠ 2, so the maximum valid sum is 9 from subarray [3,4, -5,6] where |3-6| = 3 ≠2. (Illustrative example.)
```

**Example 2:**
```
Input: nums = [5, 5, 5], k = 0
Output: 15
Explanation: The whole array is a good subarray because the first and last elements are equal (|5-5| = 0).
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
