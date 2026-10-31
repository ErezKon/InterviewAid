# 2974. Minimum Number Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-game](https://leetcode.com/problems/minimum-number-game)
**Companies:** Bloomberg, Bt Group, Google, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `nums` of **even** length and there is also an empty array `arr`. Alice and Bob decided to play a game where in every round Alice and Bob will do one move. The rules of the game are as follows:

- Every round, first Alice will remove the **minimum** element from `nums`, and then Bob does the same.
- Now, first Bob will append the removed element in the array `arr`, and then Alice does the same.
- The game continues until `nums` becomes empty.

Return *the resulting array *`arr`.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `nums.length % 2 == 0`

## Examples

**Example 1:**
```
Input: nums = [5,4,2,3]
Output: [3,2,5,4]
Explanation: In round one, first Alice removes 2 and then Bob removes 3. Then in arr firstly Bob appends 3 and then Alice appends 2. So arr = [3,2].
At the begining of round two, nums = [5,4]. Now, first Alice removes 4 and then Bob removes 5. Then both append in arr which becomes [3,2,5,4].
```

**Example 2:**
```
Input: nums = [2,5]
Output: [5,2]
Explanation: In round one, first Alice removes 2 and then Bob removes 5. Then in arr firstly Bob appends and then Alice appends. So arr = [5,2].
```

## Approach

**Algorithm:** Greedy sorting with pairwise swapping

1. Sort `nums` in non-decreasing order.
2. Iterate over the sorted array with step size 2.
3. For each pair `(i, i+1)`, place the larger element first and the smaller second in the result.

```text
FUNCTION numberGame(nums):
    SORT nums ASCENDING
    result ← ARRAY(LEN(nums))
    FOR i ← 0 TO LEN(nums)-1 STEP 2 DO
        result[i] ← nums[i+1]
        result[i+1] ← nums[i]
    END FOR
    RETURN result
```

## Walkthrough

| Index `i` | Sorted `nums[i]` | Sorted `nums[i+1]` | Result positions |
|-----------|------------------|-------------------|-----------------|
| 0 | 1 | 2 | result[0]=2, result[1]=1 |
| 2 | 3 | 4 | result[2]=4, result[3]=3 |
| 4 | 5 | 6 | result[4]=6, result[5]=5 |

The final `result` satisfies the required ordering.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n log n)** – sorting dominates |
| Space  | **O(n)** – result array (in-place possible) |

## Follow-Up Questions

1. How would the solution change if the array length could be odd?
2. Can we achieve the same ordering without an explicit sort, e.g., using a selection algorithm?
3. What if we needed to maximize the sum of the first elements of each pair instead?

## Key Takeaway

Sorting the numbers and then swapping each adjacent pair yields the lexicographically smallest arrangement where each larger element precedes the smaller one in its pair.
