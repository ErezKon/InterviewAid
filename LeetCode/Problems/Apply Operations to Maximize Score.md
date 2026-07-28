# 2818. Apply Operations to Maximize Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-maximize-score](https://leetcode.com/problems/apply-operations-to-maximize-score)
**Companies:** Google, Meta

---

## 1. Problem Description

Given an array `nums` and integer `k`, select `k` subarrays (can overlap). For each subarray, pick one element to contribute to a product score (the element with the highest "prime score" in that subarray). Maximize the final product modulo 10^9+7.

---

## 2. Key Insight

> Each element's "prime score" = number of distinct prime factors. For each element, determine how many subarrays it dominates (has the highest prime score). Use a monotonic stack to find left/right boundaries. Then greedily pick the largest elements with the most subarray choices.

---

## 3. Approach: Sieve + Monotonic Stack + Greedy — O(n log n) ✅

```text
FUNCTION maximumScore(nums, k):
    MOD ← 10^9 + 7
    n ← LENGTH(nums)
    // 1. Compute prime score for each number
    primeScore ← ARRAY of size n
    FOR i FROM 0 TO n-1:
        primeScore[i] ← COUNT_DISTINCT_PRIME_FACTORS(nums[i])
    // 2. Monotonic stack to find dominance range
    left ← ARRAY of size n, initialized to -1
    right ← ARRAY of size n, initialized to n
    stack ← EMPTY
    FOR i FROM 0 TO n-1:
        WHILE stack NOT EMPTY AND primeScore[stack.TOP] < primeScore[i]:
            POP(stack)
        IF stack NOT EMPTY:
            left[i] ← stack.TOP
        PUSH(stack, i)
    CLEAR(stack)
    FOR i FROM n-1 DOWNTO 0:
        WHILE stack NOT EMPTY AND primeScore[stack.TOP] <= primeScore[i]:
            POP(stack)
        IF stack NOT EMPTY:
            right[i] ← stack.TOP
        PUSH(stack, i)
    // 3. Count subarrays where each index dominates
    count ← ARRAY of size n
    FOR i FROM 0 TO n-1:
        count[i] ← (i - left[i]) * (right[i] - i)
    // 4. Greedy selection of largest values
    order ← INDICES SORTED BY nums DESCENDING
    result ← 1
    remaining ← k
    FOR idx IN order:
        take ← MIN(count[idx], remaining)
        result ← (result * POWER_MOD(nums[idx], take, MOD)) MOD MOD
        remaining ← remaining - take
        IF remaining = 0: BREAK
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n + max_val) | O(n + max_val) |

---

## Examples

**Example 1:**
```
Input: nums = [2,3,5,7], k = 3
Output: 210
Explanation: Prime scores are [1,1,1,1]. Each element dominates 1 subarray. Choose the three largest numbers 7,5,3. Product = 7*5*3 = 105, modulo 1e9+7 remains 105.
```

**Example 2:**
```
Input: nums = [12,15,10], k = 4
Output: 1800
Explanation: Prime scores are [2,2,2]. Each element dominates 2 subarrays. Greedy picks 15 twice and 12 twice: 15^2 * 12^2 = 1800.
```

---

## Walkthrough

| Step | i | left[i] | right[i] | primeScore[i] | count[i] |
|------|---|---------|----------|---------------|----------|
| 0    | 0 | -1      | 4        | 1             | (0-(-1))*(4-0)=4 |
| 1    | 1 | 0       | 4        | 1             | (1-0)*(4-1)=3 |
| 2    | 2 | 1       | 4        | 1             | (2-1)*(4-2)=2 |
| 3    | 3 | 2       | 4        | 1             | (3-2)*(4-3)=1 |

Greedy picks index 3 (value 7) once, index 2 (value 5) once, index 1 (value 3) once → product 105.

---

## Complexity Analysis

- **Time:** O(n log n) for sieve and sorting, plus O(n) for stack processing.
- **Space:** O(n) for auxiliary arrays and stack.

---

## Follow-Up Questions

1. How would the solution change if subarrays could not overlap?
2. Can the algorithm be adapted to maximize a sum instead of a product?
3. What if the "prime score" definition were replaced by another monotonic metric?

---

## Key Takeaway

> Combine sieve for prime scores, monotonic stack for dominance ranges, and greedy assignment. Classic "contribution counting" pattern on subarrays.
