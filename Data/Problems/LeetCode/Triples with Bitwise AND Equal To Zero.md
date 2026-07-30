# 982. Triples with Bitwise AND Equal To Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero](https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero)
**Companies:** Flipkart, Microsoft, Philips

---

## Problem Description
Given an integer array `nums`, count the number of ordered triples `(i, j, k)` such that `i`, `j`, and `k` are indices of the array (indices may repeat) and the bitwise AND of the three selected numbers is zero: `nums[i] & nums[j] & nums[k] == 0`.

## Examples
**Example 1:**
```
Input: nums = [2,1,3]
Output: 12
Explanation: All 27 possible triples are considered; 12 of them have AND equal to 0.
```

**Example 2:**
```
Input: nums = [0,0]
Output: 8
Explanation: Every triple yields 0 because each element is 0.
```

## Approach
Use frequency of each possible bitmask (0‑1023 for 10‑bit numbers). For each pair of masks `a` and `b`, compute `a & b` and accumulate its count. Then for each mask `c`, add the number of pairs whose AND with `c` is zero.

**Pseudocode**
```text
FUNCTION countTriplets(nums):
    // count frequency of each value (assume 10‑bit numbers)
    SET freq[0..1023] ← 0
    FOR v IN nums:
        SET freq[v] ← freq[v] + 1

    // pre‑compute pair AND frequencies
    SET pairAnd[0..1023] ← 0
    FOR a FROM 0 TO 1023:
        IF freq[a] = 0: CONTINUE
        FOR b FROM 0 TO 1023:
            IF freq[b] = 0: CONTINUE
            SET andVal ← a AND b
            SET pairAnd[andVal] ← pairAnd[andVal] + freq[a] * freq[b]

    // count triples
    SET result ← 0
    FOR c FROM 0 TO 1023:
        IF freq[c] = 0: CONTINUE
        FOR val FROM 0 TO 1023:
            IF (val AND c) = 0:
                SET result ← result + pairAnd[val] * freq[c]
    RETURN result
```

## Walkthrough
For `nums = [2,1,3]` (binary 010,001,011):
1. Frequencies: 1 each.
2. Pair AND table yields counts for masks 0,1,2,3.
3. Summing over `c` where `c & val = 0` gives total 12.

## Complexity Analysis
- Time: O(M²) where M = 2¹⁰ = 1024 (constant), plus O(M) for final sum → effectively O(1) for typical constraints.
- Space: O(M) for frequency and pairAnd arrays.

## Follow‑Up Questions
1. How would the algorithm change if numbers could have up to 20 bits?
2. Can you adapt the solution to count unordered triples?
3. What if the array length is extremely large and cannot fit in memory?

## Key Takeaway
By aggregating pairwise AND results into a frequency table, the triple‑count reduces to a series of constant‑size look‑ups, turning an O(n³) problem into near‑linear time.
