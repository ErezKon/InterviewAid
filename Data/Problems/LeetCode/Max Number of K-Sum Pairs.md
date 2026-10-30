# 1679. Max Number of K-Sum Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-number-of-k-sum-pairs](https://leetcode.com/problems/max-number-of-k-sum-pairs)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Hash Map Counting — O(n)](#approach-hash-map-counting--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

In one operation, you can pick two numbers from the array whose sum equals `k` and remove them from the array.

Return *the maximum number of operations you can perform on the array*.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`
- `1 ≤ k ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.
```

**Example 2:**
```
Input:  nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.
```

---

## Key Insight

> This is the classic **Two Sum** extended to counting all valid pairs. Use a frequency map: for each number, check if its complement `k - num` is available. Handle the special case where `num == complement` (pair with itself) by dividing count by 2.

---

## Approach: Hash Map Counting — O(n) ✅

```
FUNCTION maxOperations(nums, k):
    count = Counter(nums)
    ops = 0
    FOR num IN count:
        complement = k - num
        IF complement == num:
            ops += count[num] // 2
        ELSE IF complement IN count:
            pairs = MIN(count[num], count[complement])
            ops += pairs
            count[complement] -= pairs
    RETURN ops
```

---

## Walkthrough

```
nums = [3, 1, 3, 4, 3], k = 6
count = {3: 3, 1: 1, 4: 1}
```

| num | complement | Action | ops |
|-----|-----------|--------|-----|
| 3   | 3 (same)  | 3 // 2 = 1 pair | 1 |
| 1   | 5         | 5 not in count, skip | 1 |
| 4   | 2         | 2 not in count, skip | 1 |

**Result:** 1 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash Map | **O(n)** | O(n) |
| Sort + Two Pointers | O(n log n) | O(1) |

---

## Follow-Up Questions

**Q1: Can you solve it with sorting + two pointers?**
Yes. Sort the array, use left/right pointers. If sum < k, move left right; if sum > k, move right left; if equal, count and move both. O(n log n) time, O(1) space.

**Q2: What if elements can be used in multiple operations?**
Then this becomes an optimization / matching problem. With single-use constraint, the greedy/counting approach is optimal.

**Q3: What if you need to return the pairs themselves?**
Store pairs as you find them. Use a frequency map and decrement counts after each pairing.

---

## Key Takeaway

> **Counting complement pairs with a hash map is the O(n) generalization of Two Sum.** Handle the self-complement case (`num == k - num`) separately by integer-dividing the count by 2.
