# 3265. Count Almost Equal Pairs I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-almost-equal-pairs-i](https://leetcode.com/problems/count-almost-equal-pairs-i)
**Companies:** Info Edge

---

## 1. Problem Description

You are given an array `nums` consisting of positive integers.

We call two integers `x` and `y` in this problem **almost equal** if both integers can become equal after performing the following operation **at most once**:

- Choose **either** `x` or `y` and swap any two digits within the chosen number.

Return the number of indices `i` and `j` in `nums` where `i < j` such that `nums[i]` and `nums[j]` are **almost equal**.

**Note** that it is allowed for an integer to have leading zeros after performing an operation.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 10^6`

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

```
Example 1:
  Input: nums = [3,12,30,17,21]
  Output: 2
  Explanation: The almost equal pairs of elements are:
  - 3 and 30. By swapping 3 and 0 in 30, you get 3.
  - 12 and 21. By swapping 1 and 2 in 12, you get 21.
```

```
Example 2:
  Input: nums = [1,1,1,1,1]
  Output: 10
  Explanation: Every two elements in the array are almost equal.
```

```
Example 3:
  Input: nums = [123,231]
  Output: 0
  Explanation: We cannot swap any two digits of 123 or 231 to reach the other.
```

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
