# 2505. Bitwise OR of All Subsequence Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums](https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums)
**Companies:** Zomato

---

## 1. Problem Description

Given an array `nums` of non-negative integers, return the bitwise OR of the sums of all possible subsequences.

---

## 2. Key Insight

> Consider each bit position independently. If bit `b` is set in any element, then through subset sums, all bits from position `b` upward can potentially be set (due to carry propagation). The answer is simply: OR all elements together, then "fill in" all bits up to the highest set bit.

Actually, the result equals the bitwise OR of all prefix sums when considering binary addition with carries. A simpler observation: the OR of all subsequence sums equals `(total_sum)` with all lower bits filled? No — the key insight is:

> OR all elements. If any bit is set, all bits at that position and above (up to total sum) can be achieved. The answer = all bits that can be produced by any subset sum, which equals OR-ing the prefix sums of a sorted array considering carry.

Simplest correct approach: the answer is `(1 << (highest_bit(sum) + 1)) - 1` if sum > 0, else 0. Wait — that's not right either. The correct answer: **OR all the elements together gives a lower bound. Due to carries in addition, bits above can also be set.** The result is the OR of all possible subset sums.

A clean O(n × log(sum)) approach: use a bitset DP tracking achievable sums, then OR them all.

---

## 3. Approach: Bitset DP or Observation — O(n × S) ✅

```
FUNCTION subsequenceSumOR(nums):
    // Track all achievable subset sums via bitset
    possible = {0}  // set of achievable sums (use bitset for efficiency)
    prefix_or = 0
    FOR num IN nums:
        possible = possible | (possible << num)  // shift = add num
        prefix_or |= num
    
    result = 0
    FOR s IN possible:
        result |= s
    RETURN result
```

**Optimized insight:** The result = `(OR of all elements)` with all lower bits between set bits filled in due to carry propagation. Specifically: compute prefix OR running through sorted elements, accumulating carries.

| Time | Space |
|------|-------|
| O(n × max_sum / 64) with bitset | O(max_sum / 64) |

---

## Key Takeaway

> The OR of all subsequence sums captures both the direct bits from elements and carry-propagated bits from addition. Bitset DP efficiently tracks all achievable sums.
