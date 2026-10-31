# 755. Pour Water

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pour-water](https://leetcode.com/problems/pour-water)
**Companies:** Airbnb, Oracle

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an elevation map represents as an integer array `heights` where `heights[i]` representing the height of the terrain at index `i`. The width at each index is `1`. You are also given two integers `volume` and `k`. `volume` units of water will fall at index `k`.

Water first drops at the index `k` and rests on top of the highest terrain or water at that index. Then, it flows according to the following rules:

- If the droplet would eventually fall by moving left, then move left.
- Otherwise, if the droplet would eventually fall by moving right, then move right.
- Otherwise, rise to its current position.

Here, **"eventually fall"** means that the droplet will eventually be at a lower level if it moves in that direction. Also, level means the height of the terrain plus any water in that column.

We can assume there is infinitely high terrain on the two sides out of bounds of the array. Also, there could not be partial water being spread out evenly on more than one grid block, and each unit of water has to be in exactly one block.

**Constraints:**
- `1 <= heights.length <= 100`
- `0 <= heights[i] <= 99`
- `0 <= volume <= 2000`
- `0 <= k < heights.length`

## Examples

**Example 1:**
```
Input: heights = [2,1,1,2,1,2,2], volume = 4, k = 3
Output: [2,2,2,3,2,2,2]
Explanation:
The first drop of water lands at index k = 3. When moving left or right, the water can only move to the same level or a lower level. (By level, we mean the total height of the terrain plus any water in that column.)
Since moving left will eventually make it fall, it moves left. (A droplet "made to fall" means go to a lower height than it was at previously.) Since moving left will not make it fall, it stays in place.
The next droplet falls at index k = 3. Since the new droplet moving left will eventually make it fall, it moves left. Notice that the droplet still preferred to move left, even though it could move right (and moving right makes it fall quicker.)
The third droplet falls at index k = 3. Since moving left would not eventually make it fall, it tries to move right. Since moving right would eventually make it fall, it moves right.
Finally, the fourth droplet falls at index k = 3. Since moving left would not eventually make it fall, it tries to move right. Since moving right would not eventually make it fall, it stays in place.
```

**Example 2:**
```
Input: heights = [1,2,3,4], volume = 2, k = 2
Output: [2,3,3,4]
Explanation: The last droplet settles at index 1, since moving further left would not cause it to eventually fall to a lower height.
```

**Example 3:**
```
Input: heights = [3,1,3], volume = 5, k = 1
Output: [4,4,4]
```

## Approach
**Algorithm:** Simulate each unit with a two-pointer scan (left then right) – O(V·n) worst case, but acceptable for typical constraints.
**Key Insight:** For each drop, find the leftmost position with a strictly lower height than the current position; if none, repeat the search to the right. Updating the height at the chosen index simulates water accumulation.

```text
FUNCTION pourWater(heights, V, k):
    n ← LENGTH(heights)
    REPEAT V TIMES:
        // try left side
        left ← k
        WHILE left > 0 AND heights[left] >= heights[left-1]:
            left ← left - 1
        IF heights[left] < heights[k]:
            heights[left] ← heights[left] + 1
            CONTINUE
        // try right side
        right ← k
        WHILE right < n-1 AND heights[right] >= heights[right+1]:
            right ← right + 1
        IF heights[right] < heights[k]:
            heights[right] ← heights[right] + 1
            CONTINUE
        // stay at k
        heights[k] ← heights[k] + 1
    RETURN heights
```

## Walkthrough
For `heights=[2,1,1,2,1,2,2]`, `V=4`, `k=3`:
1. Drop 1: left scan stops at index 1 (height 1 < 2) → heights[1]=2.
2. Drop 2: left scan now stops at index 0 (height 2 == 2, continue left to 0) → heights[0]=3.
3. Drop 3: left cannot go lower, right scan stops at index 4 (height 1 < 2) → heights[4]=2.
4. Drop 4: both sides equal, water stays at `k` → heights[3]=3.
Result `[2,2,2,3,2,2,2]`.

## Complexity Analysis
- **Time:** O(V·n) in the worst case, where `V` is the volume and `n` the number of columns.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you improve the algorithm to O(n + V log n) using a priority queue?
2. Can the solution be adapted for a 2-D terrain grid?
3. What changes are needed if water can flow over equal heights as well as lower ones?

## Key Takeaway
Simulating each unit of water by scanning left then right finds the nearest lower spot, and updating that spot models the accumulation process.
