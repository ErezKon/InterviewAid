# 2818. Apply Operations to Maximize Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-maximize-score](https://leetcode.com/problems/apply-operations-to-maximize-score)
**Companies:** Google, Meta

---

## 1. Problem Description

You are given an array `nums` of `n` positive integers and an integer `k`.

Initially, you start with a score of `1`. You have to maximize your score by applying the following operation at most `k` times:

- Choose any **non-empty** subarray `nums[l, ..., r]` that you haven't chosen previously.
- Choose an element `x` of `nums[l, ..., r]` with the highest **prime score**. If multiple such elements exist, choose the one with the smallest index.
- Multiply your score by `x`.

Here, `nums[l, ..., r]` denotes the subarray of `nums` starting at index `l` and ending at the index `r`, both ends being inclusive.

The **prime score** of an integer `x` is equal to the number of distinct prime factors of `x`. For example, the prime score of `300` is `3` since `300 = 2 * 2 * 3 * 5 * 5`.

Return *the **maximum possible score** after applying at most* `k` *operations*.

Since the answer may be large, return it modulo `10⁹ + 7`.

**Constraints:**
- `1 ≤ nums.length == n ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁵`
- `1 ≤ k ≤ min(n * (n + 1) / 2, 10⁹)`

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

```
Example 1:
  Input: nums = [8,3,9,3,8], k = 2
  Output: 81
  Explanation: To get a score of 81, we can apply the following operations:
  - Choose subarray nums[2, ..., 2]. nums[2] is the only element in this subarray. Hence, we multiply the score by nums[2]. The score becomes 1 * 9 = 9.
  - Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 1, but nums[2] has the smaller index. Hence, we multiply the score by nums[2]. The score becomes 9 * 9 = 81.
  It can be proven that 81 is the highest score one can obtain.

Example 2:
  Input: nums = [19,12,14,6,10,18], k = 3
  Output: 4788
  Explanation: To get a score of 4788, we can apply the following operations:
  - Choose subarray nums[0, ..., 0]. nums[0] is the only element in this subarray. Hence, we multiply the score by nums[0]. The score becomes 1 * 19 = 19.
  - Choose subarray nums[5, ..., 5]. nums[5] is the only element in this subarray. Hence, we multiply the score by nums[5]. The score becomes 19 * 18 = 342.
  - Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 2, but nums[2] has the smaller index. Hence, we multipy the score by nums[2]. The score becomes 342 * 14 = 4788.
  It can be proven that 4788 is the highest score one can obtain.
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
