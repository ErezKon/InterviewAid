# 229. Majority Element II

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/majority-element-ii](https://leetcode.com/problems/majority-element-ii)
**Companies:** Amazon, Atlassian, Bloomberg, Darwinbox, Google, Intel, Meta, Microsoft, Tcs, Zenefits

---

## 1. Problem Description

Given an integer array, find all elements appearing more than ⌊n/3⌋ times. Must run in O(n) time and O(1) space.

---

## 2. Approach: Extended Boyer-Moore Voting — O(n) ✅

At most 2 elements can appear > n/3 times.

```
FUNCTION majorityElement(nums):
    cand1 = cand2 = null
    count1 = count2 = 0

    // Phase 1: Find candidates
    FOR num IN nums:
        IF num == cand1: count1 += 1
        ELSE IF num == cand2: count2 += 1
        ELSE IF count1 == 0: cand1 = num; count1 = 1
        ELSE IF count2 == 0: cand2 = num; count2 = 1
        ELSE: count1 -= 1; count2 -= 1

    // Phase 2: Verify candidates
    result = []
    FOR cand IN [cand1, cand2]:
        IF COUNT(cand in nums) > len(nums) / 3:
            result.ADD(cand)

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Extended Boyer-Moore: track k-1 candidates for > n/k threshold. Always verify in a second pass since the algorithm only guarantees candidates, not certainty.
