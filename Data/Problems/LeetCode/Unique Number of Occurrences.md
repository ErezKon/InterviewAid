# 1207. Unique Number of Occurrences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-number-of-occurrences](https://leetcode.com/problems/unique-number-of-occurrences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array of integers `arr`, return `true` *if the number of occurrences of each value in the array is **unique** or* `false` *otherwise*.

**Constraints:**
- `1 <= arr.length <= 1000`
- `-1000 <= arr[i] <= 1000`

## Examples

**Example 1:**
```
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
```

**Example 2:**
```
Input: arr = [1,2]
Output: false
```

**Example 3:**
```
Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true
```

## Approach
Count the frequency of each element using a hash map, then verify that the collection of frequency values contains no duplicates by comparing its size to the size of a set built from those values.

```text
FUNCTION hasUniqueFrequencies(arr):
    SET freqMap ← EMPTY MAP
    FOR num IN arr:
        INCREMENT freqMap[num]
    SET freqValues ← VALUES(freqMap)
    SET uniqueFreq ← SET_OF(freqValues)
    RETURN SIZE(freqValues) == SIZE(uniqueFreq)
```

## Walkthrough
| Step | Element | Frequency Map after step |
|------|---------|--------------------------|
| 1 | 1 | `{1:1}` |
| 2 | 2 | `{1:1, 2:1}` |
| 3 | 2 | `{1:1, 2:2}` |
| 4 | 1 | `{1:2, 2:2}` |
| 5 | 1 | `{1:3, 2:2}` |
| 6 | 3 | `{1:3, 2:2, 3:1}` |
All frequencies `{3,2,1}` are unique → return `true`.

## Complexity Analysis
- **Time:** O(N) where N is the length of the array.
- **Space:** O(M) where M is the number of distinct elements (hash map + set).

## Follow-Up Questions
1. How would you solve this if the array is streamed and cannot be stored entirely?
2. Can you adapt the solution to return the duplicate frequencies instead of a boolean?
3. What changes are needed if the input size is extremely large and you must use limited memory?

## Key Takeaway
Count element frequencies and ensure the set of those frequencies has the same size as the list of frequencies.
