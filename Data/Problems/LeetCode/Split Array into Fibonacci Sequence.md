# 842. Split Array into Fibonacci Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-into-fibonacci-sequence](https://leetcode.com/problems/split-array-into-fibonacci-sequence)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach/Walkthrough below work on an integer array; the official input is a **digit string**. Correct idea: backtrack over the lengths of the first two numbers (no leading zeros, each `< 2^31`), then greedily check that the string continues with `f[i] + f[i+1]`; return the first full split found. O(n²·n).*

You are given a string of digits `num`, such as `"123456579"`. We can split it into a Fibonacci-like sequence `[123, 456, 579]`.

Formally, a **Fibonacci-like** sequence is a list `f` of non-negative integers such that:

- `0 <= f[i] < 2^31`, (that is, each integer fits in a **32-bit** signed integer type),
- `f.length >= 3`, and
- `f[i] + f[i + 1] == f[i + 2]` for all `0 <= i < f.length - 2`.

Note that when splitting the string into pieces, each piece must not have extra leading zeroes, except if the piece is the number `0` itself.

Return any Fibonacci-like sequence split from `num`, or return `[]` if it cannot be done.

**Constraints:**
- `1 <= num.length <= 200`
- `num` contains only digits.

## Examples

**Example 1:**
```
Input: num = "1101111"
Output: [11,0,11,11]
Explanation: The output [110, 1, 111] would also be accepted.
```

**Example 2:**
```
Input: num = "112358130"
Output: []
Explanation: The task is impossible.
```

**Example 3:**
```
Input: num = "0123"
Output: []
Explanation: Leading zeroes are not allowed, so "01", "2", "3" is not valid.
```

## Approach
Use backtracking to try every pair of starting numbers. After fixing the first two numbers, iteratively compute the expected next value and check if it appears later in the array. Continue until the end of the array is reached or a mismatch occurs.

```text
FUNCTION isFibonacciSplit(nums):
    SET n ← LENGTH(nums)
    IF n < 3: RETURN false
    // Try every ordered pair as the first two numbers
    FOR i ← 0 TO n - 3:
        FOR j ← i + 1 TO n - 2:
            SET seq ← [nums[i], nums[j]]
            SET idx ← j + 1
            WHILE idx < n:
                SET nextVal ← seq[-2] + seq[-1]
                // Find nextVal at or after idx
                SET found ← false
                FOR k ← idx TO n - 1:
                    IF nums[k] == nextVal:
                        APPEND nextVal TO seq
                        SET idx ← k + 1
                        SET found ← true
                        BREAK
                IF NOT found: BREAK
            IF LENGTH(seq) ≥ 3 AND idx == n:
                RETURN true
    RETURN false
```

## Walkthrough
For `nums = [1,2,3,5,8]`:
- Choose first pair `(1,2)`. Expected next `3` found at index 2 → sequence `[1,2,3]`.
- Next expected `5` found at index 3 → `[1,2,3,5]`.
- Next expected `8` found at index 4 → `[1,2,3,5,8]`. All numbers used, return `true`.

## Complexity Analysis
- **Time:** In the worst case we try O(n²) starting pairs and for each may scan the remaining array, leading to O(n³) time.
- **Space:** The sequence list stores at most n numbers → O(n) auxiliary space.

## Follow‑Up Questions
1. How can memoization reduce the repeated scanning for the next expected value?
2. Can the problem be solved in O(n) time using a sliding‑window approach when the array is already sorted?
3. What modifications are needed to allow reuse of elements (i.e., multiset rather than ordered list)?

## Key Takeaway
Backtracking over all possible first two numbers and greedily extending the Fibonacci condition lets us verify whether the array can be partitioned into a valid Fibonacci‑like sequence.
