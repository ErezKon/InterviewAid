# 384. Shuffle an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shuffle-an-array](https://leetcode.com/problems/shuffle-an-array)
**Companies:** Amazon, Google, Jpmorgan, Linkedin, Meta, Microsoft, Nvidia, Uber

---

## Problem Description

Given an integer array `nums`, design an algorithm to randomly shuffle the array. All permutations of the array should be **equally likely** as a result of the shuffling.

Implement the `Solution` class:

- `Solution(int[] nums)` Initializes the object with the integer array `nums`.
- `int[] reset()` Resets the array to its original configuration and returns it.
- `int[] shuffle()` Returns a random shuffling of the array.

**Constraints:**
- `1 <= nums.length <= 50`
- `-10^6 <= nums[i] <= 10^6`
- All the elements of `nums` are **unique**.
- At most `10^4` calls **in total** will be made to `reset` and `shuffle`.

**Examples:**

**Example 1:**
```
Input
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output:
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
Explanation:
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely to be returned.
                       // Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]
```

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
