# 3265. Count Almost Equal Pairs I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-almost-equal-pairs-i](https://leetcode.com/problems/count-almost-equal-pairs-i)
**Companies:** Info Edge

---

## 1. Problem Description

Given an array `nums`, count pairs `(i, j)` where `i < j` and `nums[i]` becomes equal to `nums[j]` after swapping at most one pair of digits in either number.

---

## 2. Key Insight

> For each number, generate all possible values obtainable by swapping at most one pair of digits (including no swap). Two numbers are "almost equal" if their sets of reachable values overlap.

---

## 3. Approach: Generate Swap Variants — O(n × d²) ✅

```
FUNCTION countAlmostEqualPairs(nums):
    count = 0
    n = len(nums)
    
    FUNCTION getVariants(num):
        s = str(num).zfill(maxDigits)  // pad to equal length
        variants = {int(s)}
        FOR i FROM 0 TO len(s)-1:
            FOR j FROM i+1 TO len(s)-1:
                swapped = swap s[i] and s[j]
                variants.ADD(int(swapped))
        RETURN variants
    
    FOR i FROM 0 TO n-1:
        FOR j FROM i+1 TO n-1:
            v1 = getVariants(nums[i])
            IF nums[j] IN v1 OR nums[i] IN getVariants(nums[j]):
                count += 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n² × d²) where d = max digits | O(d²) |

---

## Key Takeaway

> "Almost equal" via one swap: generate all O(d²) swap variants of each number and check for overlap. Pad numbers to equal digit length to handle leading zeros from swaps.
