# 3147. Taking Maximum Energy From the Mystic Dungeon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon](https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan

---

## Problem Description
In a mystic dungeon, `n` magicians are standing in a line. Each magician has an attribute that gives you energy. Some magicians can give you negative energy, which means taking energy from you.

You have been cursed in such a way that after absorbing energy from magician `i`, you will be instantly transported to magician `(i + k)`. This process will be repeated until you reach the magician where `(i + k)` does not exist.

In other words, you will choose a starting point and then teleport with `k` jumps until you reach the end of the magicians' sequence, **absorbing all the energy** during the journey.

You are given an array `energy` and an integer `k`. Return the **maximum** possible energy you can gain.

**Note** that when you reach a magician, you *must* take energy from them, whether it is negative or positive energy.

**Constraints:**
- `1 <= energy.length <= 10^5`
- `-1000 <= energy[i] <= 1000`
- `1 <= k <= energy.length - 1`

## Examples
```
Example 1:
  Input: energy = [5,2,-10,-5,1], k = 3
  Output: 3
  Explanation: We can gain a total energy of 3 by starting from magician 1 absorbing 2 + 1 = 3.
```
```
Example 2:
  Input: energy = [-2,-3,-1], k = 2
  Output: -1
  Explanation: We can gain a total energy of -1 by starting from magician 2.
```

## Approach
Compute suffix sums with step `k` in reverse order: for each index `i` from `n-k-1` down to `0`, add the value at `i + k` to `energy[i]`. After this DP-like pass, each `energy[i]` holds the total energy obtainable when starting from `i`. The answer is the maximum of these values.

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
- Space: O(1) – modifications are done in-place.

## Follow-Up Questions
1. How would the solution change if you could jump either `+k` or `-k` steps?
2. Can you extend the algorithm to handle multiple allowed jump lengths?
3. What if each jump incurs a cost that depends on the starting index?

## Key Takeaway
A reverse DP that accumulates values with a fixed stride efficiently computes the best starting position in linear time.
