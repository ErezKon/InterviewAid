# 3147. Taking Maximum Energy From the Mystic Dungeon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon](https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan

---

## Problem Description
You are given an array `energy` where `energy[i]` represents the energy obtained from the i‑th room in a linear dungeon. Starting from any room, you may repeatedly jump forward exactly `k` rooms (i.e., from index `i` to `i + k`). The total energy collected is the sum of the visited rooms. Return the maximum possible total energy you can obtain.

## Examples
**Example 1:**
```
Input: energy = [1,2,3,4,5], k = 2
Output: 9
Explanation: Start at index 1 (value 2) → jump to index 3 (value 4) → total = 2+4 = 6.
Starting at index 0 gives 1+3+5 = 9, which is maximal.
```

**Example 2:**
```
Input: energy = [10, -5, 2, 7], k = 1
Output: 14
Explanation: Jumping every room yields sum 10 + (-5) + 2 + 7 = 14.
```

## Approach
Compute suffix sums with step `k` in reverse order: for each index `i` from `n‑k‑1` down to `0`, add the value at `i + k` to `energy[i]`. After this DP‑like pass, each `energy[i]` holds the total energy obtainable when starting from `i`. The answer is the maximum of these values.

```text
FUNCTION maximumEnergy(energy, k):
    n ← LENGTH(energy)
    FOR i ← n - k - 1 DOWNTO 0:
        energy[i] ← energy[i] + energy[i + k]
    RETURN MAXIMUM(energy)
```

## Walkthrough
| Index | Original value | After adding `energy[i+k]` | Cumulative sum |
|-------|----------------|---------------------------|----------------|
| 4 | 5 | 5 (no jump) | 5 |
| 3 | 4 | 4 + 5 = 9 | 9 |
| 2 | 3 | 3 + 9 = 12 | 12 |
| 1 | 2 | 2 + 12 = 14 | 14 |
| 0 | 1 | 1 + 14 = 15 | 15 (max) |

## Complexity Analysis
- Time: O(n) – a single reverse pass over the array.
- Space: O(1) – modifications are done in‑place.

## Follow‑Up Questions
1. How would the solution change if you could jump either `+k` or `-k` steps?
2. Can you extend the algorithm to handle multiple allowed jump lengths?
3. What if each jump incurs a cost that depends on the starting index?

## Key Takeaway
A reverse DP that accumulates values with a fixed stride efficiently computes the best starting position in linear time.
