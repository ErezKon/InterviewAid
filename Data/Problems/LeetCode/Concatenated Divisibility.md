# 3533. Concatenated Divisibility

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/concatenated-divisibility](https://leetcode.com/problems/concatenated-divisibility)
**Companies:** Meta

---

## 1. Problem Description

You are given an array of positive integers `nums` and a positive integer `k`.

A permutation of `nums` is said to form a **divisible concatenation** if, when you *concatenate the decimal representations* of the numbers in the order specified by the permutation, the resulting number is **divisible by** `k`.

Return the **lexicographically smallest** permutation (when considered as a list of integers) that forms a **divisible concatenation**. If no such permutation exists, return an empty list.

**Constraints:**
- `1 <= nums.length <= 13`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [3,12,45], k = 5
  Output: [3,12,45]
  Explanation:
    | Permutation | Concatenated Value | Divisible by 5 |
    |-------------|--------------------|----------------|
    | [3, 12, 45] | 31245              | Yes            |
    | [3, 45, 12] | 34512              | No             |
    | [12, 3, 45] | 12345              | Yes            |
    | [12, 45, 3] | 12453              | No             |
    | [45, 3, 12] | 45312              | No             |
    | [45, 12, 3] | 45123              | No             |
    The lexicographically smallest permutation that forms a divisible concatenation is [3,12,45].
```
```
Example 2:
  Input: nums = [10,5], k = 10
  Output: [5,10]
  Explanation:
    | Permutation | Concatenated Value | Divisible by 10 |
    |-------------|--------------------|-----------------|
    | [5, 10]     | 510                | Yes             |
    | [10, 5]     | 105                | No              |
    The lexicographically smallest permutation that forms a divisible concatenation is [5,10].
```
```
Example 3:
  Input: nums = [1,2,3], k = 5
  Output: []
  Explanation: Since no permutation of nums forms a valid divisible concatenation, return an empty list.
```

---

## 3. Approach: Bitmask DP — O(2^n × k × n) ✅

```text
FUNCTION concatenatedDivisibility(nums, k):
    n = LENGTH(nums)
    SORT nums  // ensures lexicographically smallest result
    
    // precompute shift[i] = (10 ^ DIGITS(nums[i])) % k
    FOR i FROM 0 TO n-1:
        shift[i] = MODULO(POWER(10, DIGITS(nums[i])), k)
    
    dp = ARRAY[1<<n] OF MAP   // dp[mask][rem] = (prevMask, prevRem, index)
    dp[0][0] = NULL
    
    FOR mask FROM 0 TO (1<<n)-1:
        FOR each rem IN dp[mask]:
            FOR i FROM 0 TO n-1:
                IF mask HAS_BIT i: CONTINUE
                newRem = MODULO(rem * shift[i] + nums[i], k)
                newMask = mask OR (1<<i)
                IF newRem NOT IN dp[newMask]:
                    dp[newMask][newRem] = (mask, rem, i)
    
    fullMask = (1<<n) - 1
    IF 0 NOT IN dp[fullMask]: RETURN []
    
    // reconstruct lexicographically smallest permutation
    result = []
    curMask = fullMask
    curRem = 0
    WHILE curMask != 0:
        (prevMask, prevRem, idx) = dp[curMask][curRem]
        PREPEND nums[idx] TO result
        curMask = prevMask
        curRem = prevRem
    RETURN result
```

---

## 4. Walkthrough

Consider `nums = [12, 34, 5]`, `k = 3`:
1. After sorting: `[12, 5, 34]`.
2. Precompute shifts: `shift[12] = 10^2 % 3 = 1`, `shift[5] = 10^1 % 3 = 1`, `shift[34] = 10^2 % 3 = 1`.
3. DP builds reachable remainders for each mask. When mask = `111` (all used) and remainder = `0`, backtrack yields `[12,5,34]`.
4. Concatenated number `12534` % 3 == 0, and no lexicographically smaller ordering satisfies the condition.

---

## 5. Complexity Analysis

- **Time:** `O(2^n × k × n)` – each state `(mask, remainder)` explores up to `n` transitions.
- **Space:** `O(2^n × k)` – DP table stores a map for each mask.

---

## 6. Follow-Up Questions

1. How would the solution change if `k` could be up to 10^9, making the DP over remainders infeasible?
2. Can you adapt the algorithm to return the count of all valid permutations instead of just the smallest one?
3. What optimizations are possible when many numbers share the same number of digits?

---

## Key Takeaway

> By tracking the remainder of the concatenated value modulo `k` in a bitmask DP, we can efficiently explore all permutations and retrieve the lexicographically smallest valid ordering.
