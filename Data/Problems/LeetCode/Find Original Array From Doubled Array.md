# 2007. Find Original Array From Doubled Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-original-array-from-doubled-array](https://leetcode.com/problems/find-original-array-from-doubled-array)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Verily

---

## Problem Description
An integer array `original` is transformed into a **doubled** array `changed` by appending **twice the value** of every element in `original`, and then randomly **shuffling** the resulting array.

Given an array `changed`, return `original` *if* `changed` *is a **doubled** array. If* `changed` *is not a **doubled** array, return an empty array. The elements in* `original` *may be returned in **any** order*.

**Constraints:**
- `1 <= changed.length <= 10^5`
- `0 <= changed[i] <= 10^5`

## Examples
```
Example 1:
  Input: changed = [1,3,4,2,6,8]
  Output: [1,3,4]
  Explanation: One possible original array could be [1,3,4]:
  - Twice the value of 1 is 1 * 2 = 2.
  - Twice the value of 3 is 3 * 2 = 6.
  - Twice the value of 4 is 4 * 2 = 8.
  Other original arrays could be [4,3,1] or [3,1,4].
```

```
Example 2:
  Input: changed = [6,3,0,1]
  Output: []
  Explanation: changed is not a doubled array.
```

```
Example 3:
  Input: changed = [1]
  Output: []
  Explanation: changed is not a doubled array.
```

## Approach
Sort the numbers by absolute value. Use a hash map to count occurrences. Iterate through the sorted keys:
- If the count of the current number exceeds the count of its double, the array is invalid.
- Otherwise, add the current number to the result as many times as its count, and decrement the count of its double accordingly.
The remaining numbers after processing form the original array.

## Walkthrough
For `[1,3,4,2,6,8]` (sorted by abs): `1,2,3,4,6,8`:
| num | count before | count[2*num] before | Action |
|-----|--------------|---------------------|--------|
| 1 | 1 | 1 | add `1` to result, decrement count[2] → 0 |
| 2 | 0 (skipped) |
| 3 | 1 | 1 | add `3`, decrement count[6] → 0 |
| 4 | 1 | 1 | add `4`, decrement count[8] → 0 |
Result `[1,3,4]`.

## Complexity Analysis
- **Time:** O(n log n) for sorting, where n is `len(changed)`.
- **Space:** O(n) for the frequency map and result array.

## Follow-Up Questions
- How would you handle the case where numbers can be negative?
- Can the algorithm be adapted to work in O(n) time using counting sort for bounded ranges?
- What if the array may contain zeros; how does that affect pairing?

## Key Takeaway
Sorting by absolute value and pairing each number with its double via a frequency map reliably reconstructs the original array.
