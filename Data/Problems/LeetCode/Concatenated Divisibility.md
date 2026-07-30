# 3533. Concatenated Divisibility

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/concatenated-divisibility](https://leetcode.com/problems/concatenated-divisibility)
**Companies:** Meta

---

## 1. Problem Description

Given an array `nums` and an integer `k`, arrange the numbers in some order, concatenate them to form a single large integer, and require that this integer be divisible by `k`. Return the lexicographically smallest such permutation, or an empty array if none exists.

---

## 2. Examples

| nums | k | Output | Explanation |
|------|---|--------|-------------|
| [12, 34, 5] | 3 | [12,5,34] | Concatenation `12534` % 3 == 0 and this ordering is lexicographically smallest. |
| [1,2,3] | 7 | [] | No permutation yields a number divisible by 7.

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
