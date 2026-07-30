# 560. Subarray Sum Equals K

**Difficulty:** 🟡 Medium
**Acceptance:** 44.1%
**LeetCode:** [https://leetcode.com/problems/subarray-sum-equals-k](https://leetcode.com/problems/subarray-sum-equals-k)
**Companies:** Accenture, Adobe, Agoda, Amazon, Amd, Apple, Bitgo, Bloomberg, Bolt, Bytedance, Capgemini, Capital One, Cisco, Cognizant, Deloitte, Flipkart, Goldman Sachs, Google, Grab, Ibm, Infosys, Jpmorgan, Kpmg, Linkedin, Meta, Microsoft, Mindtree, Nvidia, Oracle, Palo Alto Networks, Paypal, Qualcomm, Quora, Ripple, Scale Ai, Servicenow, Sprinklr, Swiggy, Tcs, Tiktok, Uber, Visa, Walmart Labs, Yahoo, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: Prefix Sum + Hash Map — O(n) ✅](#4-approach-2-prefix-sum--hash-map--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of integers `nums` and an integer `k`, return the total number of **subarrays** whose sum equals to `k`.

A subarray is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 2 × 10⁴`
- `-1000 <= nums[i] <= 1000`
- `-10⁷ <= k <= 10⁷`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,1,1], k = 2
  Output: 2
  Reason: [1,1] at index 0-1 and [1,1] at index 1-2

Example 2:
  Input:  nums = [1,2,3], k = 3
  Output: 2
  Reason: [1,2] and [3]
```

---

## 3. Approach 1: Brute Force — O(n²)

Check every subarray by computing its sum.

```
FUNCTION subarraySum(nums, k):
    count = 0
    FOR i ← 0 TO n - 1:
        sum = 0
        FOR j ← i TO n - 1:
            sum += nums[j]
            IF sum == k:
                count += 1
    RETURN count
```

---

## 4. Approach 2: Prefix Sum + Hash Map — O(n) ✅

### Key Insight

If `prefixSum[j] - prefixSum[i] == k`, then the subarray `nums[i+1..j]` sums to `k`.

So for each index `j`, we need to count how many previous prefix sums equal `prefixSum[j] - k`.

A hash map storing `{prefix_sum → count of occurrences}` gives O(1) lookups.

### Pseudocode

```
FUNCTION subarraySum(nums, k):
    count = 0
    prefixSum = 0
    map = {0: 1}          // empty prefix has sum 0

    FOR num IN nums:
        prefixSum += num

        // How many previous prefixes give us a subarray summing to k?
        IF (prefixSum - k) IN map:
            count += map[prefixSum - k]

        // Record current prefix sum
        map[prefixSum] = map.GET(prefixSum, 0) + 1

    RETURN count
```

### Why Initialize with {0: 1}?

If the subarray starting from index 0 sums to k (i.e., `prefixSum == k`), then `prefixSum - k == 0`. We need `0` in the map to count this case.

---

## 5. Walkthrough

```
nums = [1, 2, 3], k = 3
map = {0: 1}, prefixSum = 0, count = 0

num=1: prefixSum=1, check 1-3=-2 → not in map, map={0:1, 1:1}
num=2: prefixSum=3, check 3-3=0  → in map (count 1) → count=1, map={0:1, 1:1, 3:1}
num=3: prefixSum=6, check 6-3=3  → in map (count 1) → count=2, map={0:1, 1:1, 3:1, 6:1}

Result: 2 ✅  (subarrays [1,2] and [3])
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **Prefix Sum + Map** | **O(n)** | **O(n)** |

---

## 7. Follow-Up Questions

### 7.1 Why can't we use a sliding window?

The sliding window technique requires **all positive numbers** (or a monotonic property) to know when to shrink. Since `nums` can contain **negative numbers**, shrinking the window doesn't guarantee the sum decreases.

### 7.2 Subarray Sum Divisible by K (LeetCode #974)?

Instead of checking `prefixSum - k`, check `prefixSum % k`. Two prefix sums with the same remainder mod k define a subarray divisible by k.

### 7.3 Continuous Subarray Sum (LeetCode #523)?

Check if there's a subarray of length ≥ 2 whose sum is a multiple of k. Use prefix sums mod k — if the same remainder appears at indices more than 1 apart, return true.

### 7.4 Maximum Size Subarray Sum Equals k (LeetCode #325)?

Store the **first occurrence** of each prefix sum. For each `j`, if `prefixSum - k` was first seen at index `i`, then the subarray length is `j - i`. Track the maximum.

---

## Key Takeaway

> The **prefix sum + hash map** pattern is essential for subarray sum problems. It converts "find subarrays with sum = k" into "find pairs of prefix sums differing by k" — a Two Sum-like problem on prefix sums.
