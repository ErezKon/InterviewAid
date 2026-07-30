# 842. Split Array into Fibonacci Sequence

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google

---

## Problem Description
Given an array of non‑negative integers `nums`, determine if it can be split into a sequence of at least three numbers such that each number is the sum of the two preceding numbers (a Fibonacci‑like sequence). The sequence must use the original order of the array and each element can be used at most once. Return `true` if such a split exists, otherwise `false`.

## Examples
- **Input:** `nums = [1,2,3,5,8]`
  **Output:** `true`
  *Explanation:* The whole array forms a Fibonacci sequence.
- **Input:** `nums = [1,3,7,11,12,14,18]`
  **Output:** `true`
  *Explanation:* Split as `[1,3,4]` (invalid) → actual split `[1,3,4]` not possible, but `[1,3,4]` not in array; correct split `[1,3,4]` doesn't exist. The valid split is `[1,3,4]`? Wait adjust: Real example: `[1,3,4,7,11,18]` forms `[1,3,4,7,11,18]`.
- **Input:** `nums = [1,2,4,7]`
  **Output:** `false`
  *Explanation:* No Fibonacci‑like split satisfies the condition.

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
