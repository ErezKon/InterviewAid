# 1338. Reduce Array Size to The Half

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reduce-array-size-to-the-half](https://leetcode.com/problems/reduce-array-size-to-the-half)
**Companies:** Akuna Capital, Meta

---

## Problem Description
Given an integer array `arr`, you may remove any number of elements. Return the minimum number of distinct values you need to remove so that the remaining array size is at most half of the original length.

## Examples
**Example 1:**
```
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: Remove the values 3 and 5 (four elements total). Remaining array size = 6, which is half of 10.
```
**Example 2:**
```
Input: arr = [7,7,7,7,7,7]
Output: 1
Explanation: Removing the single distinct value 7 leaves an empty array.
```

## Approach
Count the frequency of each value, sort frequencies in descending order, and greedily remove the most frequent values until the remaining element count is ≤ n/2.

## Pseudocode
```text
FUNCTION minSetSize(arr):
    SET n ← LENGTH(arr)
    // Count frequencies
    CREATE map freq
    FOR x IN arr:
        INCREMENT freq[x]
    // Sort frequencies descending
    SET counts ← LIST of freq.values()
    SORT counts DESCENDING
    SET removed ← 0
    SET distinctRemoved ← 0
    WHILE removed < n / 2:
        SET removed ← removed + counts[distinctRemoved]
        SET distinctRemoved ← distinctRemoved + 1
    RETURN distinctRemoved
```

## Walkthrough
For `arr = [3,3,3,3,5,5,5,2,2,7]`:
- Frequencies: 3→4, 5→3, 2→2, 7→1.
- Sorted counts: [4,3,2,1].
- Remove 4 (removed=4, distinct=1) → still need >5, continue.
- Remove 3 (removed=7, distinct=2) → now removed ≥5 (half of 10), stop. Return 2.

## Complexity Analysis
- **Time:** O(n log n) due to sorting the frequency list.
- **Space:** O(m) where m is the number of distinct values.

## Follow‑Up Questions
1. How would the algorithm change if you could only remove at most *k* distinct values?
2. Can you solve the problem in O(n) time using a bucket sort on frequencies?
3. What if the array is streamed and you must decide removals online?

## Key Takeaway
Greedy removal of the most frequent values minimizes the number of distinct elements needed to shrink the array to half its size.
