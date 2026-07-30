# 2845. Count of Interesting Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-of-interesting-subarrays](https://leetcode.com/problems/count-of-interesting-subarrays)
**Companies:** Bloomberg, Google, Meta, Microsoft

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

Given an array `nums`, an integer `modulo`, and an integer `k`, a subarray `nums[l..r]` is **interesting** if:
- Let `cnt` = the number of indices `i` in `[l, r]` where `nums[i] % modulo == k`.
- The subarray is interesting if `cnt % modulo == k`.

Return the count of interesting subarrays.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= modulo <= 10^9`
- `0 <= k < modulo`

---

## Examples

**Example 1:**
- **Input:** `nums = [3,2,4], modulo = 2, k = 1`
- **Output:** `3`
- **Explanation:** Interesting subarrays: [3], [3,2], [3,2,4]. In each, the count of elements where `num % 2 == 1` is odd (i.e., `cnt % 2 == 1`).

**Example 2:**
- **Input:** `nums = [3,1,9,6], modulo = 3, k = 0`
- **Output:** `2`
- **Explanation:** Subarrays where the count of elements divisible by 3 is itself divisible by 3.

---

## Key Insight

Transform the problem into a **prefix sum mod** problem:
1. Define `prefix[i]` = count of indices `j ≤ i` where `nums[j] % modulo == k`.
2. A subarray `[l, r]` is interesting if `(prefix[r] - prefix[l-1]) % modulo == k`.
3. Rearranging: `prefix[r] % modulo - prefix[l-1] % modulo ≡ k (mod modulo)`, so we need `prefix[l-1] % modulo == (prefix[r] - k) % modulo`.

This is the classic **"count pairs with target difference mod m"** pattern using a hash map.

---

## Approach

```
FUNCTION countInterestingSubarrays(nums, modulo, k):
    prefix = 0; count = Counter({0: 1}); result = 0
    FOR num IN nums:
        prefix += (1 IF num % modulo == k ELSE 0)
        result += count[(prefix - k) % modulo]
        count[prefix % modulo] += 1
    RETURN result
```

**Step-by-step:**
1. Maintain a running prefix count of "interesting" elements.
2. For each position, look up how many previous prefix values have the required remainder.
3. Update the hash map with the current prefix mod.

---

## Walkthrough

**Input:** `nums = [3,2,4], modulo = 2, k = 1`

Mark elements where `num % 2 == 1`: `[1, 0, 0]` (only index 0).

| Step | num | prefix | (prefix-k)%mod | count map | matches | result |
|---|---|---|---|---|---|---|
| init | — | 0 | — | {0: 1} | — | 0 |
| 1 | 3 | 1 | (1-1)%2 = 0 | {0: 1} | 1 | 1 |
| | | | | {0: 1, 1: 1} | | |
| 2 | 2 | 1 | (1-1)%2 = 0 | {0: 1, 1: 1} | 1 | 2 |
| | | | | {0: 1, 1: 2} | | |
| 3 | 4 | 1 | (1-1)%2 = 0 | {0: 1, 1: 2} | 1 | 3 |

**Result:** `3` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass with hash map lookups |
| **Space** | O(min(n, modulo)) — hash map stores at most `modulo` distinct remainders |

---

## Follow-Up Questions

**Q1: How is this related to the "subarray sum equals k" pattern?**
It's the same prefix-sum + hash-map technique (LeetCode #560), but here we work modulo `modulo` instead of exact sums.

**Q2: What if `modulo = 1`?**
Then `k` must be 0, and every subarray is interesting (since any count % 1 = 0). Answer = `n*(n+1)/2`.

**Q3: Can you handle this with a sliding window instead?**
No — the "interesting" property isn't monotonic, so sliding window doesn't apply. Prefix sum + hash map is the right tool.

---

## Key Takeaway

> **When counting subarrays whose aggregate satisfies a modular condition, transform to prefix sums mod m and use a hash map to count matching prefix pairs — a direct generalization of the "subarray sum equals k" pattern.**
