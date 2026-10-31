# 1346. Check If N and Its Double Exist

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-n-and-its-double-exist](https://leetcode.com/problems/check-if-n-and-its-double-exist)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an array `arr` of integers, check if there exist two indices `i` and `j` such that :

- `i != j`
- `0 <= i, j < arr.length`
- `arr[i] == 2 * arr[j]`

**Constraints:**
- `2 <= arr.length <= 500`
- `-10^3 <= arr[i] <= 10^3`

## Examples
```
Example 1:
  Input: arr = [10,2,5,3]
  Output: true
  Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
```

```
Example 2:
  Input: arr = [3,1,7,11]
  Output: false
  Explanation: There is no i and j that satisfy the conditions.
```

## Approach
**Algorithm:** Hash Set Scan
- Iterate through the array while storing seen numbers in a hash set.
- For each number `x`, check if `2*x` or `x/2` (when `x` is even) already exists in the set.
- If a match is found, return `true`; otherwise continue.

```text
FUNCTION checkIfExist(arr):
    SET seen ← {}
    FOR num IN arr:
        IF (2 * num) IN seen:
            RETURN true
        IF (num MOD 2 = 0) AND (num / 2) IN seen:
            RETURN true
        ADD num TO seen
    RETURN false
```

## Walkthrough
Consider `[10,2,5,3]`:
| Step | num | seen before | Condition met? | Action |
|------|-----|-------------|----------------|--------|
| 1 | 10 | {} | No | Add 10
| 2 | 2 | {10} | No (4 not in set, 1 not in set) | Add 2
| 3 | 5 | {10,2} | `2*5=10` is in set → return `true`

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(n) – hash set storing up to n elements.

## Follow-Up Questions
1. How would you modify the solution to return the actual pair of indices?
2. Can the problem be solved without extra space?
3. What changes are needed if the array is sorted?

## Key Takeaway
Using a hash set to record previously seen values enables constant-time look-ups for the required double or half relationship, yielding a linear-time solution.
