# 384. Shuffle an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shuffle-an-array](https://leetcode.com/problems/shuffle-an-array)
**Companies:** Amazon, Google, Jpmorgan, Linkedin, Meta, Microsoft, Nvidia, Uber

---

## Problem Description

Given an integer array `nums`, design an algorithm to randomly shuffle the array. All permutations of the array should be **equally likely** as a result of the shuffling.

Implement the `Solution` class:
- `Solution(int[] nums)` — initializes the object with the integer array `nums`.
- `int[] reset()` — resets the array to its original configuration and returns it.
- `int[] shuffle()` — returns a random shuffling of the array.

### Examples

**Input:**
```
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
```
**Output:** `[null, [3,1,2], [1,2,3], [1,3,2]]` (any valid permutation)

### Constraints

- `1 <= nums.length <= 50`
- `-10⁶ <= nums[i] <= 10⁶`
- All elements of `nums` are unique.
- At most `10⁴` calls total to `reset` and `shuffle`.

---

## Approach: Fisher-Yates Shuffle — O(n) ✅

The Fisher-Yates algorithm produces a uniformly random permutation by iterating backwards and swapping each element with a random element from the remaining unshuffled portion.

```
CLASS Solution:
    CONSTRUCTOR(nums):
        self.original = nums.copy()
        self.array = nums

    FUNCTION reset():
        self.array = self.original.copy()
        RETURN self.array

    FUNCTION shuffle():
        FOR i ← n - 1 DOWN TO 1:
            j = random(0, i)       // inclusive
            SWAP(array[i], array[j])
        RETURN self.array
```

### Walkthrough — `nums = [1, 2, 3]`

| i | j (random) | array before | swap | array after |
|---|------------|-------------|------|-------------|
| 2 | 0          | [1, 2, 3]   | swap(2,0) | [3, 2, 1] |
| 1 | 1          | [3, 2, 1]   | swap(1,1) | [3, 2, 1] |

Result: `[3, 2, 1]` (one possible outcome)

| Operation | Time | Space |
|-----------|------|-------|
| Constructor | O(n) | O(n) |
| reset | O(n) | O(n) |
| shuffle | O(n) | O(1) |

---

## Follow-up

- **Why Fisher-Yates works:** Each of the n! permutations has exactly one sequence of random choices that produces it, giving probability 1/n! for each.
- **Knuth shuffle** is the same algorithm, iterating forward instead.
