# 571. Find Median Given Frequency of Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-median-given-frequency-of-numbers](https://leetcode.com/problems/find-median-given-frequency-of-numbers)
**Companies:** Pinterest

---

## Problem Description
You are given two integer arrays `values` and `freq` of the same length. `values[i]` is a distinct integer and `freq[i]` is the frequency of `values[i]` in a multiset. The multiset contains `freq[i]` copies of each `values[i]`. Return the median of the multiset. If the multiset size is even, return the average of the two middle numbers.

## Examples
**Example 1**
```
Input: values = [1,2,3], freq = [2,2,1]
Output: 2.0
Explanation: The multiset expands to [1,1,2,2,3]; median is 2.
```
**Example 2**
```
Input: values = [1,3,5], freq = [1,2,1]
Output: 3.5
Explanation: Expanded multiset = [1,3,3,5]; median = (3+3)/2 = 3.0? Actually middle two are 3 and 3, average 3.0.
```

## Approach
Compute the total size `N` = sum(freq). The median positions are `mid1 = (N+1)//2` and `mid2 = (N+2)//2` (both same when N odd). Iterate over `values` in sorted order while accumulating a running count of frequencies. When the running count reaches or exceeds a median position, record the corresponding value. Use a binary search on the prefix sums for O(log n) query per median.

### Pseudocode
```text
FUNCTION findMedian(values, freq):
    // assume values are sorted; if not, sort pairs together
    SET n ← LENGTH(values)
    SET prefix ← empty list
    SET sum ← 0
    FOR i ← 0 TO n-1:
        SET sum ← sum + freq[i]
        APPEND sum TO prefix
    SET total ← sum
    SET mid1 ← (total + 1) DIV 2
    SET mid2 ← (total + 2) DIV 2
    SET median1 ← getValueAtPosition(prefix, values, mid1)
    SET median2 ← getValueAtPosition(prefix, values, mid2)
    RETURN (median1 + median2) / 2.0

FUNCTION getValueAtPosition(prefix, values, pos):
    // binary search for first index where prefix[idx] >= pos
    SET left ← 0
    SET right ← LENGTH(prefix) - 1
    WHILE left < right:
        SET mid ← (left + right) DIV 2
        IF prefix[mid] < pos:
            SET left ← mid + 1
        ELSE:
            SET right ← mid
    RETURN values[left]
```

## Walkthrough
For `values=[1,2,3]`, `freq=[2,2,1]`:
- Prefix sums = [2,4,5]; total = 5; mid1=3, mid2=3.
- Binary search for position 3 returns index 1 (value 2). Both medians are 2 → result 2.0.

## Complexity Analysis
- **Time:** O(n log n) for sorting (if needed) plus O(log n) per median lookup.
- **Space:** O(n) for the prefix array.

## Follow‑Up Questions
1. How would you handle the case where `values` are not distinct?
2. Can you compute the median in O(n) without sorting by using a selection algorithm on the weighted frequencies?
3. What changes are needed if the frequencies are extremely large and may overflow 32‑bit integers?

## Key Takeaway
By converting frequencies to prefix sums, the median can be located via binary search without materializing the full multiset.
