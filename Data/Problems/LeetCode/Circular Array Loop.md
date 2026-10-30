# 457. Circular Array Loop

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circular-array-loop](https://leetcode.com/problems/circular-array-loop)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Microsoft

---

## Problem Description
You are playing a game involving a **circular** array of non-zero integers `nums`. Each `nums[i]` denotes the number of indices forward/backward you must move if you are located at index `i`:

- If `nums[i]` is positive, move `nums[i]` steps **forward**, and
- If `nums[i]` is negative, move `nums[i]` steps **backward**.

Since the array is **circular**, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.

A **cycle** in the array consists of a sequence of indices `seq` of length `k` where:

- Following the movement rules above results in the repeating index sequence `seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...`
- Every `nums[seq[j]]` is either **all positive** or **all negative**.
- `k > 1`

Return `true` *if there is a **cycle** in* `nums`*, or* `false` *otherwise*.

**Constraints:**
- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`
- `nums[i] != 0`

**Follow up:** Could you solve it in `O(n)` time complexity and `O(1)` extra space complexity?

## Examples
```
Example 1:
  Input: nums = [2,-1,1,2,2]
  Output: true
  Explanation: We can see the cycle 0 --> 2 --> 3 --> 0 --> ..., and all of its nodes jump forward (in the same direction).
```

```
Example 2:
  Input: nums = [-1,-2,-3,-4,-5,6]
  Output: false
  Explanation: The only cycle is of size 1 (index 5 jumps to itself), so we return false.
```

```
Example 3:
  Input: nums = [1,-1,5,1,4]
  Output: true
  Explanation: The cycle 0 --> 1 --> 0 --> ... has size > 1, but it has a node jumping forward and a node jumping backward, so it is not a cycle.
  We can see the cycle 3 --> 4 --> 3 --> ..., and all of its nodes jump forward (in the same direction).
```

## Approach
**Two‑Pointers (Floyd Cycle Detection) + Direction Check** – For each unvisited index, use a slow and fast pointer to traverse the array. At each step ensure the next move has the same sign as the current element; otherwise break. If slow meets fast, a valid loop of length > 1 is found.

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
Use Floyd’s cycle detection while enforcing a consistent movement direction; meeting of slow and fast pointers guarantees a valid circular loop of length > 1.
