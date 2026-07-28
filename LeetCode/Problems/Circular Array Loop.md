# 457. Circular Array Loop

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circular-array-loop](https://leetcode.com/problems/circular-array-loop)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Microsoft

---

## Problem Description
Given a circular array `nums` of integers, determine if there exists a loop of length > 1 where all movements are either all forward (positive numbers) or all backward (negative numbers). From any index `i`, the next index is `(i + nums[i]) mod n`. Return `true` if such a loop exists, otherwise `false`.

## Examples
**Example 1:**
```
Input: nums = [2,-1,1,2,2]
Output: true
Explanation: The loop 0 → 2 → 3 → 0 moves forward and has length 3.
```
**Example 2:**
```
Input: nums = [-1,2]
Output: false
Explanation: The only possible moves change direction, which is not allowed.
```

## Approach
**Two‑Pointers (Floyd Cycle Detection) + Direction Check** – For each unvisited index, use a slow and fast pointer to traverse the array. At each step ensure the next move has the same sign as the current element; otherwise break. If slow meets fast, a valid loop of length > 1 is found.

## Walkthrough
| Start Index | Slow Path | Fast Path | Reason for Break |
|-------------|-----------|-----------|------------------|
| 0 | 0 → 2 → 3 → 0 | 0 → 2 → 3 → 0 → 2 → 3 | Meets, loop found |
| 1 | 1 → 0 (different sign) | – | Break due to direction mismatch |

## Complexity Analysis
- **Time:** O(n) – each element is visited at most twice.
- **Space:** O(1) – only a few pointers are used.

## Follow‑Up Questions
- How would you modify the algorithm to return the actual loop indices?
- Can the solution be adapted for a streaming version of the array?
- What if the array size is extremely large and cannot fit in memory?

## Key Takeaway
Use Floyd’s cycle detection while enforcing a consistent movement direction; meeting of slow and fast pointers guarantees a valid circular loop of length > 1.
