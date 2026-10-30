# 2505. Bitwise OR of All Subsequence Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums](https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums)
**Companies:** Zomato

---

## 1. Problem Description

Given an integer array `nums`, return *the value of the bitwise* **OR** *of the sum of all possible **subsequences** in the array*.

A **subsequence** is a sequence that can be derived from another sequence by removing zero or more elements without changing the order of the remaining elements.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`

---

## 2. Approach: Bitset DP — O(n × S) ✅

```text
FUNCTION subsequenceSumOR(nums):
    // possible sums tracked as a bitset where bit i indicates sum i achievable
    possible = BITSET with only bit 0 set
    FOR num IN nums:
        // shift left by num and OR to include sums that use current num
        possible = possible OR (possible << num)
    
    result = 0
    FOR i FROM 0 TO possible.MAX_INDEX():
        IF possible[i] == 1:
            result = result OR i
    RETURN result
```

---

## 3. Examples

```
Example 1:
  Input: nums = [2,1,0,3]
  Output: 7
  Explanation: All possible subsequence sums that we can have are: 0, 1, 2, 3, 4, 5, 6.
  And we have 0 OR 1 OR 2 OR 3 OR 4 OR 5 OR 6 = 7, so we return 7.

Example 2:
  Input: nums = [0,0,0]
  Output: 0
  Explanation: 0 is the only possible subsequence sum we can have, so we return 0.
```

---

## 4. Walkthrough

Take `nums = [1,2,3]`.

1. Start with `possible = {0}`.
2. Process `1`: shift `{0}` by 1 → `{1}`; union → `{0,1}`.
3. Process `2`: shift `{0,1}` by 2 → `{2,3}`; union → `{0,1,2,3}`.
4. Process `3`: shift `{0,1,2,3}` by 3 → `{3,4,5,6}`; union → `{0,1,2,3,4,5,6}`.
5. OR all achievable sums: `0|1|2|3|4|5|6 = 7`.

---

## 5. Complexity Analysis

- **Time:** O(n × maxSum / wordSize) – each number shifts the bitset.
- **Space:** O(maxSum) bits for the bitset.

---

## 6. Follow-Up Questions

1. Can you derive a closed‑form answer without DP using bit‑carry properties?
2. How would the solution change if numbers could be negative?
3. What if you needed the **count** of distinct subsequence sums instead of their OR?

---

## Key Takeaway

> Bitset DP efficiently captures all achievable subset sums; the final OR aggregates bits from every possible sum.
