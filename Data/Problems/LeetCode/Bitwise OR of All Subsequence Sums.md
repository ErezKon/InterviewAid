# 2505. Bitwise OR of All Subsequence Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums](https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums)
**Companies:** Zomato

---

## 1. Problem Description

Given an array `nums` of non‑negative integers, return the bitwise OR of the sums of **all** possible subsequences (including the empty subsequence whose sum is 0).

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

| Input | Output |
|-------|--------|
| `[1,2,3]` | `7` |
| `[5,1,2]` | `7` |
| `[0,0]` | `0` |

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
