# 1051. Height Checker

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/height-checker](https://leetcode.com/problems/height-checker)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft, Salesforce

---

## 1. Problem Description

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in **non-decreasing order** by height. Let this ordering be represented by the integer array `expected` where `expected[i]` is the expected height of the `i`th student in line.

You are given an integer array `heights` representing the **current order** that the students are standing in. Each `heights[i]` is the height of the `i`th student in line (**0-indexed**).

Return *the **number of indices** where* `heights[i] != expected[i]`.

**Constraints:**
- `1 <= heights.length <= 100`
- `1 <= heights[i] <= 100`

## 2. Approach: Sort + Compare — O(n log n) ✅

```text
FUNCTION heightChecker(heights):
    expected ← SORTED(heights)
    mismatches ← 0
    FOR i ← 0 TO LENGTH(heights) - 1:
        IF heights[i] ≠ expected[i]:
            mismatches ← mismatches + 1
    RETURN mismatches
```

## Examples

```
Example 1:
  Input: heights = [1,1,4,2,1,3]
  Output: 3
  Explanation:
  heights:  [1,1,4,2,1,3]
  expected: [1,1,1,2,3,4]
  Indices 2, 4, and 5 do not match.
```
```
Example 2:
  Input: heights = [5,1,2,3,4]
  Output: 5
  Explanation:
  heights:  [5,1,2,3,4]
  expected: [1,2,3,4,5]
  All indices do not match.
```
```
Example 3:
  Input: heights = [1,2,3,4,5]
  Output: 0
  Explanation:
  heights:  [1,2,3,4,5]
  expected: [1,2,3,4,5]
  All indices match.
```

## Walkthrough

Take `heights = [1,1,4,2,1,3]`:
1. Sort → `[1,1,1,2,3,4]`
2. Compare index 0: 1 vs 1 → match
3. Index 1: 1 vs 1 → match
4. Index 2: 4 vs 1 → mismatch (count=1)
5. Index 3: 2 vs 2 → match
6. Index 4: 1 vs 3 → mismatch (count=2)
7. Index 5: 3 vs 4 → mismatch (count=3)
Result = 3.

## Complexity Analysis

- **Time:** O(n log n) – sorting dominates.
- **Space:** O(n) for the sorted copy (or O(1) if sorting in-place).

## Follow-Up Questions

- Can you solve it in O(n) time using counting sort given height limits?
- How would you handle a stream of heights where you need to report mismatches online?
- What if heights can be negative or very large?

## Key Takeaway

> Sort the heights to get the correct order, then count positions where the original array differs.
