# 2007. Find Original Array From Doubled Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-original-array-from-doubled-array](https://leetcode.com/problems/find-original-array-from-doubled-array)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Verily

---

## Problem Description
Given an even‑length integer array `changed`, where `changed` is formed by taking an original array `original`, appending each element doubled, and then shuffling, recover and return the `original` array. If no such original array exists, return an empty array.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,3,4,2,6,8]` | `[1,3,4]` | Pairs: `1‑2`, `3‑6`, `4‑8`. |
| `[6,3,0,1]` | `[]` | Length odd → impossible. |
| `[2,4,4,8,1,2]` | `[1,2,4]` | Pairs after sorting: `1‑2`, `2‑4`, `4‑8`. |

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
