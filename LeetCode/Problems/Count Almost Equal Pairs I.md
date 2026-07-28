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

## Examples

| Input | Output |
|-------|--------|
| `nums = [123, 321, 213]` | `3` |
| `nums = [10, 1, 100]` | `1` |

---

## Walkthrough

Consider `nums = [123, 321, 213]` (maxDigits = 3):
1. Variants of `123`: {123, 213, 321, 132, 231, 312}.
2. Variants of `321`: {321, 231, 123, 312, 132, 213}.
3. Since the variant sets overlap, every pair is "almost equal" → 3 pairs.

---

## Complexity Analysis

- **Time:** O(n² × d²) – checking each pair and generating up to d² variants per number.
- **Space:** O(d²) – storing variants for a single number.

---

## Follow-Up Questions

1. How would you improve the solution to O(n·d²) using a hash map of variants?
2. Can the approach be extended to allow up to two digit swaps?
3. What changes are needed if numbers have varying lengths without padding?

---

## Key Takeaway

> "Almost equal" via one swap: generate all O(d²) swap variants of each number and check for overlap. Pad numbers to equal digit length to handle leading zeros from swaps.
